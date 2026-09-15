import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const metadata: Metadata = { title: "Réservations" };

export default async function ReservationsPage() {
  const db = await getDb();
  
  // Get all unique eventIds from reservations
  const uniqueEventIds = await db.collection("reservations").distinct("eventId");
  
  // Fetch those events
  const objectIds = uniqueEventIds.map((id: string) => new ObjectId(id));
  const events = await db.collection("events").find({ _id: { $in: objectIds } }).sort({ startsAt: -1 }).toArray();

  return (
    <div>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#EF2F29]">Espace administration</p>
          <h1 className="font-display text-[clamp(38px,5vw,64px)] leading-none">Événements avec réservations</h1>
          <p className="mt-4 text-sm text-[#77716B]">{events.length} événement{events.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto border border-black/[.09] bg-[#FBFAF7]">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-black/[.08] text-[10px] uppercase tracking-[.18em] text-[#837D77]">
              <th className="px-6 py-4">Événement</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id.toString()} className="border-b border-black/[.06] even:bg-black/[.02] hover:bg-black/[.04] transition-colors">
                <td className="px-6 py-5">
                  <p className="font-display text-xl">{event.title}</p>
                </td>
                <td className="px-4 py-5 text-sm">
                  {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.startsAt))}
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/reservations/${event._id.toString()}`} className="bg-[#EF2F29] text-white px-4 py-2 text-[11px] font-medium uppercase tracking-[.16em] transition hover:bg-[#050505]">
                      Voir les réservations
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {!events.length ? <tr><td colSpan={3} className="py-20 text-center font-display text-2xl text-[#625D58]">Aucune réservation</td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
