import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { type EventDocument, parseEventInput, serializeEvent } from "@/lib/events";
import { getDb } from "@/lib/mongodb";
import { cleanupImages, requestPayload, saveImage } from "@/lib/image-storage";

type Context = { params: Promise<{ id: string }> };
async function eventId(context: Context) { const { id } = await context.params; return ObjectId.isValid(id) ? new ObjectId(id) : null; }

export async function GET(_request: Request, context: Context) {
  const auth = await requireAdmin(); if ("response" in auth) return auth.response;
  const _id = await eventId(context); if (!_id) return NextResponse.json({ message: "Identifiant invalide." }, { status: 400 });
  const event = await (await getDb()).collection<EventDocument>("events").findOne({ _id });
  return event ? NextResponse.json({ event: serializeEvent(event) }) : NextResponse.json({ message: "Événement introuvable." }, { status: 404 });
}

export async function PUT(request: Request, context: Context) {
  const auth = await requireAdmin(true); if ("response" in auth) return auth.response;
  const _id = await eventId(context); if (!_id) return NextResponse.json({ message: "Identifiant invalide." }, { status: 400 });
  let payload; try { payload = await requestPayload(request); } catch { return NextResponse.json({ message: "Requête invalide." }, { status: 400 }); }
  const body = payload.body;
  const parsed = parseEventInput(body); if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 });
  const collection = (await getDb()).collection<EventDocument>("events");
  if (await collection.findOne({ slug: parsed.data.slug, _id: { $ne: _id } })) return NextResponse.json({ message: "Ce slug est déjà utilisé." }, { status: 409 });
  const previous = await collection.findOne({ _id }); if (!previous) return NextResponse.json({ message: "Événement introuvable." }, { status: 404 });
  let heroImage: string | null = null; let contentImage: string | null = null;
  try { heroImage = await saveImage(payload.form?.get("heroImageFile") ?? null, "events"); contentImage = await saveImage(payload.form?.get("contentImageFile") ?? null, "events"); } catch (error) { await cleanupImages([heroImage, contentImage], "events"); return NextResponse.json({ message: (error as Error).message }, { status: 400 }); }
  let result; try { result = await collection.findOneAndUpdate({ _id }, { $set: { ...parsed.data, heroImage: heroImage || previous.heroImage, contentImage: contentImage || previous.contentImage, updatedBy: new ObjectId(auth.session.id), updatedAt: new Date() } }, { returnDocument: "after" }); } catch (error) { await cleanupImages([heroImage, contentImage], "events"); throw error; }
  if (result) await cleanupImages([heroImage ? previous.heroImage : null, contentImage ? previous.contentImage : null], "events");
  return result ? NextResponse.json({ event: serializeEvent(result) }) : NextResponse.json({ message: "Événement introuvable." }, { status: 404 });
}

export async function DELETE(_request: Request, context: Context) {
  const auth = await requireAdmin(true); if ("response" in auth) return auth.response;
  const _id = await eventId(context); if (!_id) return NextResponse.json({ message: "Identifiant invalide." }, { status: 400 });
  const collection = (await getDb()).collection<EventDocument>("events"); const event = await collection.findOneAndDelete({ _id });
  if (!event) return NextResponse.json({ message: "Événement introuvable." }, { status: 404 });
  await cleanupImages([event.heroImage, event.contentImage], "events"); return NextResponse.json({ success: true });
}
