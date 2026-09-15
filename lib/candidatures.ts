import { ObjectId } from "mongodb";

export type CandidatureDocument = {
  _id: ObjectId;
  spectacleId: ObjectId;
  lieu: string;
  ville: string;
  jauge: string;
  contact: string;
  email: string;
  slot: string;
  firstPart: string;
  plateau: string;
  createdAt: Date;
};

const text = (value: unknown, max = 2000) => typeof value === "string" ? value.trim().slice(0, max) : "";

export function parseCandidatureInput(value: unknown) {
  if (!value || typeof value !== "object") return { error: "Données invalides." } as const;
  const body = value as Record<string, unknown>;

  const spectacleIdStr = text(body.spectacleId);
  if (!ObjectId.isValid(spectacleIdStr)) return { error: "Identifiant de spectacle invalide." } as const;

  const lieu = text(body.lieu, 160);
  const ville = text(body.ville, 100);
  const jauge = text(body.jauge, 100);
  const contact = text(body.contact, 160);
  const email = text(body.email, 160);

  if (!lieu || !ville || !jauge || !contact || !email) {
    return { error: "Les champs lieu, ville, jauge, contact et email sont obligatoires." } as const;
  }

  return {
    data: {
      spectacleId: new ObjectId(spectacleIdStr),
      lieu,
      ville,
      jauge,
      contact,
      email,
      slot: text(body.slot, 100),
      firstPart: text(body.firstPart, 100),
      plateau: text(body.plateau, 2000)
    }
  } as const;
}
