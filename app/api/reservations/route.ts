import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.eventId || !data.firstName || !data.lastName || !data.email || !data.phone || (data.seatsStudent === undefined && data.seatsFull === undefined)) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    const db = await getDb();
    
    // Verify the event exists
    const event = await db.collection("events").findOne({ _id: new ObjectId(data.eventId) });
    if (!event) {
      return NextResponse.json({ error: "Événement introuvable." }, { status: 404 });
    }

    const reservation = {
      eventId: data.eventId,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      seatsStudent: Number(data.seatsStudent) || 0,
      seatsFull: Number(data.seatsFull) || 0,
      totalAmount: Number(data.totalAmount) || 0,
      createdAt: new Date(),
    };

    const result = await db.collection("reservations").insertOne(reservation);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("Erreur lors de la réservation :", err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
