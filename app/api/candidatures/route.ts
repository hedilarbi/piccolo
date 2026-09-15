import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { parseCandidatureInput, type CandidatureDocument } from "@/lib/candidatures";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const parsed = parseCandidatureInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }

  const collection = (await getDb()).collection<CandidatureDocument>("candidatures");
  
  const document = {
    _id: new ObjectId(),
    ...parsed.data,
    createdAt: new Date(),
  };

  await collection.insertOne(document);
  return NextResponse.json({ success: true }, { status: 201 });
}
