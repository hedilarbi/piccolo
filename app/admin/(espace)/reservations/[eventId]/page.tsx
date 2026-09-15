import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const metadata: Metadata = { title: "Détails des réservations" };

type Props = { params: Promise<{ eventId: string }> };

export default async function ReservationsDetailPage({ params }: Props) {
  const eventId = (await params).eventId;
  const db = await getDb();
  
  const event = await db.collection("events").findOne({ _id: new ObjectId(eventId) });
  if (!event) notFound();

  const reservations = await db.collection("reservations").find({ eventId }).sort({ createdAt: -1 }).toArray();

  const totalSeats = reservations.reduce((acc, curr) => acc + (curr.seatsStudent || 0) + (curr.seatsFull || 0) + (curr.seats || 0), 0);
  const totalRevenue = reservations.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div>
      <div className="mb-9">
        <Link href="/admin/reservations" className="mb-4 inline-flex text-[11px] uppercase tracking-[.18em] text-[#8C8781] hover:text-[#EF2F29]">
          ← Retour aux événements
        </Link>
        <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#EF2F29]">Réservations pour</p>
        <h1 className="font-display text-[clamp(38px,5vw,64px)] leading-none">{event.title}</h1>
        <p className="mt-4 text-sm text-[#77716B]">
          {reservations.length} réservation{reservations.length !== 1 ? "s" : ""} — {totalSeats} place{totalSeats !== 1 ? "s" : ""} au total — Revenu : <strong className="text-accent">{totalRevenue} DT</strong>
        </p>
      </div>
      
      <div className="overflow-x-auto border border-black/[.09] bg-[#FBFAF7]">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-black/[.08] text-[10px] uppercase tracking-[.18em] text-[#837D77]">
              <th className="px-6 py-4">Nom complet</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Téléphone</th>
              <th className="px-4 py-4 text-right">Places (Étu/Comp)</th>
              <th className="px-4 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-right">Date de réservation</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res._id.toString()} className="border-b border-black/[.06] even:bg-black/[.02] hover:bg-black/[.04] transition-colors">
                <td className="px-6 py-5">
                  <p className="font-display text-xl">{res.firstName} {res.lastName}</p>
                </td>
                <td className="px-4 py-5 text-sm text-[#625D58]">{res.email}</td>
                <td className="px-4 py-5 text-sm text-[#625D58]">{res.phone}</td>
                <td className="px-4 py-5 text-right font-mono text-lg text-[#625D58]">
                  {res.seats ? res.seats : `${res.seatsStudent || 0} / ${res.seatsFull || 0}`}
                </td>
                <td className="px-4 py-5 text-right font-mono text-lg text-accent">
                  {res.totalAmount || 0} DT
                </td>
                <td className="px-6 py-5 text-right text-sm text-[#96908A]">
                  {new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(res.createdAt))}
                </td>
              </tr>
            ))}
            {!reservations.length ? <tr><td colSpan={6} className="py-20 text-center font-display text-2xl text-[#625D58]">Aucune réservation</td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
