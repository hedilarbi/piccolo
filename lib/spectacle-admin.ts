import { ObjectId } from "mongodb";
import { slugify } from "@/lib/events";

export type SpectacleDocument = {
  _id: ObjectId; title: string; slug: string; status: "draft" | "published"; season: string; audienceLabel: string;
  description: string; applicationDeadline: Date; image: string; creationLabel: string; director: string; partnerCount: string;
  facts: { label: string; value: string }[]; plateaux: { time: string; title: string; description: string }[];
  provides: string[]; venueProvides: string[]; tourDates: { window: string; zone: string; status: string }[];
  technique: { label: string; value: string }[]; slots: string[]; firstParts: string[]; faq: { question: string; answer: string }[];
  createdBy: ObjectId; updatedBy: ObjectId; createdAt: Date; updatedAt: Date;
};
const text = (value: unknown, max = 6000) => typeof value === "string" ? value.trim().slice(0, max) : "";
const lines = (value: unknown) => text(value).split("\n").map(x => x.trim()).filter(Boolean);
const pairs = (value: unknown) => lines(value).map(row => { const [label = "", itemValue = ""] = row.split("|").map(x => x.trim()); return { label, value: itemValue }; }).filter(x => x.label && x.value);
export function parseSpectacleInput(value: unknown) {
  if (!value || typeof value !== "object") return { error: "Données invalides." } as const; const body = value as Record<string, unknown>;
  const title = text(body.title, 160); const deadline = new Date(text(body.applicationDeadline));
  if (!title || !text(body.season, 80) || !text(body.description) || Number.isNaN(deadline.getTime())) return { error: "Titre, saison, présentation et clôture des candidatures sont requis." } as const;
  const rows = (input: unknown, count: number) => lines(input).map(row => row.split("|").map(x => x.trim())).filter(x => x.length >= count);
  return { data: { title, slug: slugify(text(body.slug, 180) || title), status: body.status === "published" ? "published" as const : "draft" as const, season: text(body.season, 80), audienceLabel: text(body.audienceLabel, 120) || "Offre aux professionnels", description: text(body.description), applicationDeadline: deadline, image: text(body.image, 1000), creationLabel: text(body.creationLabel, 100), director: text(body.director, 160), partnerCount: text(body.partnerCount, 100), facts: pairs(body.facts), plateaux: rows(body.plateaux, 3).map(([time, itemTitle, description]) => ({ time, title: itemTitle, description })), provides: lines(body.provides), venueProvides: lines(body.venueProvides), tourDates: rows(body.tourDates, 3).map(([window, zone, status]) => ({ window, zone, status })), technique: pairs(body.technique), slots: lines(body.slots), firstParts: lines(body.firstParts), faq: rows(body.faq, 2).map(([question, answer]) => ({ question, answer })) }} as const;
}
export function serializeSpectacle(item: SpectacleDocument) { return { ...item, _id: item._id.toString(), createdBy: item.createdBy.toString(), updatedBy: item.updatedBy.toString(), applicationDeadline: item.applicationDeadline.toISOString() }; }
