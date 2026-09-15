import type { Metadata } from "next";
import { EventsManager } from "@/components/admin/events-manager";
import { type EventDocument, serializeEvent } from "@/lib/events";
import { getDb } from "@/lib/mongodb";

export const metadata: Metadata = { title: "Événements" };

export default async function EventsPage() {
  const events = await (await getDb()).collection<EventDocument>("events").find().sort({ startsAt: -1 }).toArray();
  return <EventsManager initialEvents={events.map(serializeEvent)} />;
}
