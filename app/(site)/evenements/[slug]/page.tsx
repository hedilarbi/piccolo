import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/site/event-detail";
import { getDb } from "@/lib/mongodb";
import type { EventDocument } from "@/lib/events";
type Props = { params: Promise<{ slug: string }> };
async function getEvent(slug: string) { return (await getDb()).collection<EventDocument>("events").findOne({ slug, status: "published" }); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = await getEvent((await params).slug); return item ? { title: item.title, description: item.description } : {}; }
export default async function Page({ params }: Props) { const item = await getEvent((await params).slug); if (!item) notFound(); const serialized = { ...item, _id: item._id.toString(), createdBy: item.createdBy.toString(), updatedBy: item.updatedBy.toString(), startsAt: item.startsAt.toISOString(), endsAt: item.endsAt.toISOString(), createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() }; return <EventDetail event={serialized} />; }
