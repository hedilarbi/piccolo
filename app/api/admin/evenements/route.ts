import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { type EventDocument, parseEventInput, serializeEvent } from "@/lib/events";
import { getDb } from "@/lib/mongodb";
import { cleanupImages, requestPayload, saveImage } from "@/lib/image-storage";

export async function GET() {
  const auth = await requireAdmin(); if ("response" in auth) return auth.response;
  const events = await (await getDb()).collection<EventDocument>("events").find().sort({ startsAt: -1 }).toArray();
  return NextResponse.json({ events: events.map(serializeEvent) });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(true); if ("response" in auth) return auth.response;
  let payload; try { payload = await requestPayload(request); } catch { return NextResponse.json({ message: "Requête invalide." }, { status: 400 }); }
  const body = payload.body;
  const parsed = parseEventInput(body); if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 });
  const collection = (await getDb()).collection<EventDocument>("events");
  if (await collection.findOne({ slug: parsed.data.slug })) return NextResponse.json({ message: "Ce slug est déjà utilisé." }, { status: 409 });
  let heroImage: string | null = null; let contentImage: string | null = null;
  try { heroImage = await saveImage(payload.form?.get("heroImageFile") ?? null, "events"); contentImage = await saveImage(payload.form?.get("contentImageFile") ?? null, "events"); } catch (error) { await cleanupImages([heroImage, contentImage], "events"); return NextResponse.json({ message: (error as Error).message }, { status: 400 }); }
  const now = new Date(); const userId = new ObjectId(auth.session.id);
  let result; try { result = await collection.insertOne({ _id: new ObjectId(), ...parsed.data, heroImage: heroImage || parsed.data.heroImage, contentImage: contentImage || parsed.data.contentImage, createdBy: userId, updatedBy: userId, createdAt: now, updatedAt: now }); } catch (error) { await cleanupImages([heroImage, contentImage], "events"); throw error; }
  const event = await collection.findOne({ _id: result.insertedId });
  return NextResponse.json({ event: event && serializeEvent(event) }, { status: 201 });
}
