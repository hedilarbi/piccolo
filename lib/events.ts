import { ObjectId } from "mongodb";

export type EventStatus = "draft" | "published";
export type EventProgramItem = { time: string; title: string; performer: string; note: string };
export type EventTariff = { label: string; price: string; description: string };
export type EventDocument = {
  _id: ObjectId;
  title: string; slug: string; status: EventStatus; category: string; audience: string;
  ticketingOpen: boolean; startsAt: Date; endsAt: Date; venue: string; priceStudent: string; priceFull: string;
  heroImage: string; contentImage: string; introTitle: string; description: string; secondaryDescription: string;
  editionLabel: string; program: EventProgramItem[];
  practicalInfo: { label: string; value: string }[]; faq: { question: string; answer: string }[];
  createdBy: ObjectId; updatedBy: ObjectId; createdAt: Date; updatedAt: Date;
};

export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const text = (value: unknown, max = 5000) => typeof value === "string" ? value.trim().slice(0, max) : "";
const date = (value: unknown) => { const parsed = new Date(typeof value === "string" ? value : ""); return Number.isNaN(parsed.getTime()) ? null : parsed; };
const lines = (value: unknown) => text(value).split("\n").map(line => line.trim()).filter(Boolean);

export function parseEventInput(value: unknown) {
  if (!value || typeof value !== "object") return { error: "Données invalides." } as const;
  const body = value as Record<string, unknown>;
  const title = text(body.title, 160); const startsAt = date(body.startsAt); const endsAt = date(body.endsAt);
  if (!title || !startsAt || !endsAt) return { error: "Le titre, la date de début et la date de fin sont requis." } as const;
  if (endsAt <= startsAt) return { error: "La fin de l’événement doit être postérieure au début." } as const;
  const program = lines(body.program).map(line => { const [time = "", itemTitle = "", performer = "", note = ""] = line.split("|").map(part => part.trim()); return { time, title: itemTitle, performer, note }; }).filter(item => item.time && item.title);
  return { data: {
    title, slug: slugify(text(body.slug, 180) || title), status: body.status === "published" ? "published" as const : "draft" as const,
    category: text(body.category, 80), audience: text(body.audience, 120), ticketingOpen: body.ticketingOpen === true || body.ticketingOpen === "on",
    startsAt, endsAt, venue: text(body.venue, 160), priceStudent: text(body.priceStudent, 100), priceFull: text(body.priceFull, 100), heroImage: text(body.heroImage, 1000), contentImage: text(body.contentImage, 1000),
    introTitle: text(body.introTitle, 220), description: text(body.description), secondaryDescription: text(body.secondaryDescription), editionLabel: text(body.editionLabel, 160),
    program, practicalInfo: [] as { label: string; value: string }[], faq: [] as { question: string; answer: string }[],
  }} as const;
}

export function serializeEvent(event: EventDocument) {
  return { ...event, _id: event._id.toString(), createdBy: event.createdBy.toString(), updatedBy: event.updatedBy.toString(), startsAt: event.startsAt.toISOString(), endsAt: event.endsAt.toISOString() };
}
