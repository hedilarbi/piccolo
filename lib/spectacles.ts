import type { SpectacleDocument } from "@/lib/spectacle-admin";

export type Spectacle = {
  _id: string;
  slug: string;
  title: string;
  titleLines: [string, string];
  season: string;
  audienceLabel: string;
  description: string;
  deadline: string;
  image: string;
  creation: string;
  director: string;
  partnerCount: string;
  facts: readonly { label: string; value: string }[];
  plateaux: readonly { num: string; time: string; title: string; description: string; accent?: boolean }[];
  provides: readonly string[];
  venueProvides: readonly string[];
  dates: readonly { window: string; zone: string; status: string; available: boolean }[];
  technique: readonly { label: string; value: string }[];
  steps: readonly { num: string; text: string }[];
  slots: readonly string[];
  firstParts: readonly string[];
  faq: readonly { question: string; answer: string }[];
};

export const spectacles: readonly Spectacle[] = [
  {
    _id: "64e0a4f6d4d1d1f00b999999",
    slug: "le-cri-des-murs",
    title: "Le Cri des Murs",
    titleLines: ["Le Cri", "des Murs"],
    season: "TOURNÉE 26/27",
    audienceLabel: "Offre aux maisons de culture",
    description: "Une pièce chorale pour cinq interprètes, conçue pour voyager. Votre maison de culture l'accueille — et y ajoute son propre plateau : une première partie portée par vos artistes, vos amateurs ou votre atelier.",
    deadline: "Clôture des candidatures — 30 nov. 2026",
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=900&h=1200&fit=crop&q=80",
    creation: "CRÉATION 2026",
    director: "Nour Behlil",
    partnerCount: "12 lieux · saison 26/27",
    facts: [
      { label: "Durée", value: "1h35 sans entracte" },
      { label: "Plateau", value: "5 interprètes · 2 techniciens" },
      { label: "Jauge conseillée", value: "150 — 600 places" },
      { label: "Public", value: "À partir de 14 ans" },
      { label: "Langue", value: "Français · surtitrage NL/EN" },
    ],
    plateaux: [
      { num: "01", time: "19h30", title: "Votre plateau", description: "Trente minutes offertes à votre maison de culture : une compagnie locale, un atelier amateur, une école ou une création maison. Vous choisissez, nous accompagnons.", accent: true },
      { num: "02", time: "20h15", title: "Le Cri des Murs", description: "La pièce, dans sa forme intégrale. Régie autonome, montage en une journée, équipe de tournée complète." },
      { num: "03", time: "22h00", title: "La rencontre", description: "Un bord de plateau commun aux deux équipes, animé par notre médiateur. Vos artistes rencontrent les nôtres devant votre public." },
    ],
    provides: [
      "Le spectacle complet : distribution, décor, costumes, régie son et lumière",
      "Un plan de feu adaptable à votre gril et à votre jauge",
      "Une journée d'accompagnement pour votre première partie (mise en espace, filage)",
      "Le kit de communication : visuels, dossier de presse, teaser, textes",
      "Un médiateur pour le bord de plateau et une rencontre scolaire optionnelle",
    ],
    venueProvides: [
      "La salle, l’équipe d’accueil et la billetterie",
      "Une première partie de 20 à 30 minutes portée par vos artistes",
      "Deux services de montage la veille ou le matin",
      "Le logement et les repas de l’équipe de tournée (7 personnes)",
      "La diffusion locale auprès de votre public et de vos partenaires",
    ],
    dates: [
      { window: "Oct — Nov 2026", zone: "Bruxelles · Brabant", status: "2 créneaux", available: true },
      { window: "Jan — Fév 2027", zone: "Wallonie · Hainaut", status: "4 créneaux", available: true },
      { window: "Mars 2027", zone: "Liège · Luxembourg", status: "3 créneaux", available: true },
      { window: "Avril 2027", zone: "Flandre · surtitrage NL", status: "2 créneaux", available: true },
      { window: "Mai 2027", zone: "France · Grand Est", status: "Complet", available: false },
    ],
    technique: [
      { label: "Ouverture", value: "9 m mur à mur · 8 m souhaités" },
      { label: "Profondeur", value: "7 m depuis le nu du rideau" },
      { label: "Hauteur sous gril", value: "5 m minimum" },
      { label: "Montage", value: "2 services · démontage 1h30" },
      { label: "Son", value: "Façade fournie par le lieu · console numérique" },
      { label: "Lumière", value: "48 circuits · plan de feu adaptable" },
    ],
    steps: [
      { num: "01", text: "Vous remplissez le dossier d’accueil ci-contre." },
      { num: "02", text: "Nous vous envoyons dates disponibles, budget et fiche technique complète." },
      { num: "03", text: "Visite technique ou visio avec votre régie, puis validation des dates." },
      { num: "04", text: "Contrat, plan de communication et journée d’accompagnement de votre plateau." },
    ],
    slots: ["Oct — Nov 26", "Jan — Fév 27", "Mars 27", "Avril 27", "À définir"],
    firstParts: ["Compagnie locale", "Atelier amateur", "École / conservatoire", "Création maison", "Pas encore décidé"],
    faq: [
      { question: "Notre première partie doit-elle être professionnelle ?", answer: "Non. Compagnies émergentes, ateliers amateurs, classes d’art dramatique : le dispositif est pensé pour faire monter sur scène les forces vives de votre territoire, quel que soit leur niveau." },
      { question: "Comment se répartissent les recettes ?", answer: "Cession classique ou coréalisation, au choix. Le montant est calculé sur votre jauge et le nombre de représentations ; nous vous transmettons les deux scénarios chiffrés avec la proposition de dates." },
      { question: "Peut-on programmer deux représentations ?", answer: "Oui, et c’est même recommandé : la deuxième est proposée à tarif dégressif, avec une séance scolaire possible en journée." },
      { question: "Que se passe-t-il si notre salle est plus petite ?", answer: "Une version allégée existe pour les plateaux de 6 m d’ouverture, avec quatre interprètes et un décor réduit. Précisez votre jauge dans le formulaire." },
    ],
  },
] as const;

export async function getSpectacle(slug: string): Promise<Spectacle | undefined> {
  const fixture = spectacles.find((spectacle) => spectacle.slug === slug);
  if (fixture) return fixture;

  const { getDb } = await import("@/lib/mongodb");
  const event = await (await getDb()).collection<SpectacleDocument>("spectacles").findOne({ slug, status: "published" });
  if (!event) return undefined;
  const dateLabel = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(event.applicationDeadline);
  return {
    _id: event._id.toHexString(), slug: event.slug, title: event.title, titleLines: splitTitle(event.title), season: event.season, audienceLabel: event.audienceLabel,
    description: event.description, deadline: `Clôture des candidatures — ${dateLabel}`,
    image: event.image || "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=900&h=1200&fit=crop&q=80", creation: event.creationLabel || "CRÉATION", director: event.director || "Piccolo Teatro", partnerCount: event.partnerCount || "Saison en cours",
    facts: event.facts,
    plateaux: event.plateaux.map((item, index) => ({ num: String(index + 1).padStart(2, "0"), time: item.time, title: item.title, description: item.description, accent: index === 0 })),
    provides: event.provides, venueProvides: event.venueProvides,
    dates: event.tourDates.map(item => ({ ...item, available: !/complet/i.test(item.status) })),
    technique: event.technique,
    steps: [{ num: "01", text: "Vous remplissez le dossier d’accueil ci-contre." }, { num: "02", text: "Notre équipe étudie votre proposition." }, { num: "03", text: "Nous validons ensemble les conditions et la date." }],
    slots: event.slots, firstParts: event.firstParts,
    faq: event.faq.length ? event.faq : [{ question: "Comment recevoir le dossier complet ?", answer: "Envoyez votre candidature avec le formulaire : notre équipe vous transmettra les informations artistiques, budgétaires et techniques." }],
  };
}

function splitTitle(title: string): [string, string] {
  const words = title.trim().split(/\s+/); const middle = Math.max(1, Math.ceil(words.length / 2));
  return [words.slice(0, middle).join(" "), words.slice(middle).join(" ") || " "];
}
