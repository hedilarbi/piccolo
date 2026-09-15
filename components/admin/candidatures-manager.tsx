"use client";
import { useState } from "react";
import { Drawer, FormSection } from "./form-ui";

type Candidature = {
  _id: string;
  spectacleTitle: string;
  lieu: string;
  ville: string;
  jauge: string;
  contact: string;
  email: string;
  slot: string;
  firstPart: string;
  plateau: string;
  createdAt: string;
};

export function CandidaturesManager({ items }: { items: Candidature[] }) {
  const [selected, setSelected] = useState<Candidature | null>(null);

  return (
    <>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#EF2F29]">Espace administration</p>
          <h1 className="font-display text-[clamp(38px,5vw,64px)] leading-none">Candidatures</h1>
          <p className="mt-4 text-sm text-[#77716B]">
            {items.length} soumission{items.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-black/[.09] bg-[#FBFAF7]">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-black/[.08] text-[10px] uppercase tracking-[.18em] text-[#837D77]">
              <th className="px-6 py-4">Spectacle</th>
              <th className="px-4 py-4">Lieu</th>
              <th className="px-4 py-4">Contact</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-black/[.06] even:bg-black/[.02] hover:bg-black/[.04] transition-colors">
                <td className="px-6 py-5">
                  <p className="font-display text-xl">{item.spectacleTitle}</p>
                </td>
                <td className="px-4 py-5 text-sm">
                  <p className="font-medium text-[#1A1A1A]">{item.lieu}</p>
                  <small className="block text-[#96908A]">{item.ville}</small>
                </td>
                <td className="px-4 py-5 text-sm">
                  <p className="font-medium text-[#1A1A1A]">{item.contact}</p>
                  <a href={`mailto:${item.email}`} className="text-xs text-[#EF2F29] hover:underline">{item.email}</a>
                </td>
                <td className="px-4 py-5 text-sm">
                  {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelected(item)} className="bg-[#EF2F29] px-4 py-2 text-[11px] font-medium uppercase tracking-[.16em] text-white transition hover:bg-[#050505]">
                      Voir détails
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length ? (
              <tr>
                <td colSpan={5} className="py-20 text-center font-display text-2xl text-[#625D58]">
                  Aucune candidature
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {selected ? (
        <Drawer title="Détails de la candidature" onClose={() => setSelected(null)}>
          <div className="space-y-10 p-[clamp(22px,4vw,44px)]">
            <FormSection title="Général">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Spectacle</span>
                  <p className="text-sm font-medium">{selected.spectacleTitle}</p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Date de soumission</span>
                  <p className="text-sm">{new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(new Date(selected.createdAt))}</p>
                </div>
              </div>
            </FormSection>

            <FormSection title="Dossier d'accueil">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Nom du lieu</span>
                  <p className="text-sm">{selected.lieu}</p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Ville</span>
                  <p className="text-sm">{selected.ville}</p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Jauge de la salle</span>
                  <p className="text-sm">{selected.jauge}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Contact</span>
                  <p className="text-sm">{selected.contact}</p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Email</span>
                  <p className="text-sm text-[#EF2F29]"><a href={`mailto:${selected.email}`}>{selected.email}</a></p>
                </div>
              </div>
            </FormSection>

            <FormSection title="Besoins et plateau">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Créneau souhaité</span>
                  <p className="text-sm">{selected.slot || "Non précisé"}</p>
                </div>
                <div>
                  <span className="mb-1 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Première partie</span>
                  <p className="text-sm">{selected.firstPart || "Non précisé"}</p>
                </div>
              </div>
              <div className="mt-5">
                <span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">Description du plateau</span>
                <p className="whitespace-pre-wrap rounded bg-black/5 p-4 text-sm leading-relaxed">{selected.plateau || "Aucune description fournie."}</p>
              </div>
            </FormSection>
          </div>
        </Drawer>
      ) : null}
    </>
  );
}
