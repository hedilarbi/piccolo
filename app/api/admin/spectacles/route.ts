import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { getDb } from "@/lib/mongodb";
import { parseSpectacleInput, serializeSpectacle, type SpectacleDocument } from "@/lib/spectacle-admin";

import { cleanupImages, requestPayload, saveImage } from "@/lib/image-storage";

export async function GET() { const auth = await requireAdmin(); if ("response" in auth) return auth.response; const items = await (await getDb()).collection<SpectacleDocument>("spectacles").find().sort({ createdAt: -1 }).toArray(); return NextResponse.json({ spectacles: items.map(serializeSpectacle) }); }
export async function POST(request: Request) { const auth = await requireAdmin(true); if ("response" in auth) return auth.response; let payload; try { payload = await requestPayload(request); } catch { return NextResponse.json({ message: "Requête invalide." }, { status: 400 }); } const body = payload.body; const parsed = parseSpectacleInput(body); if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 }); const collection = (await getDb()).collection<SpectacleDocument>("spectacles"); if (await collection.findOne({ slug: parsed.data.slug })) return NextResponse.json({ message: "Ce slug est déjà utilisé." }, { status: 409 }); let image: string | null = null; try { image = await saveImage(payload.form?.get("imageFile") ?? null, "spectacles"); } catch (error) { return NextResponse.json({ message: (error as Error).message }, { status: 400 }); } const now = new Date(); const userId = new ObjectId(auth.session.id); const document = { _id: new ObjectId(), ...parsed.data, image: image || parsed.data.image, createdBy: userId, updatedBy: userId, createdAt: now, updatedAt: now }; await collection.insertOne(document); return NextResponse.json({ spectacle: serializeSpectacle(document) }, { status: 201 }); }
