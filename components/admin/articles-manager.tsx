"use client";

import Link from "next/link";
import { useState } from "react";
import { ErrorMessage } from "./form-ui";

type Item = { _id: string; title: string; slug: string; status: "draft" | "published"; category: string; publishedAt: string };

export function ArticlesManager({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState("");

  async function remove(item: Item) {
    if (!window.confirm(`Supprimer « ${item.title} » ?`)) return;
    setError("");
    const response = await fetch(`/api/admin/actualites/${item._id}`, { method: "DELETE" });
    if (!response.ok) return setError("La suppression de l’article a échoué.");
    setItems((current) => current.filter(({ _id }) => _id !== item._id));
  }

  return <>
    <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
      <div><p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#EF2F29]">Journal de création</p><h1 className="font-display text-[clamp(38px,5vw,64px)]">Actualités</h1><p className="text-sm text-[#77716B]">{items.length} article{items.length !== 1 ? "s" : ""}</p></div>
      <Link href="/admin/actualites/creation" className="grid min-h-12 place-items-center bg-[#EF2F29] px-6 text-[11px] uppercase tracking-[.17em] text-white">+ Créer un article</Link>
    </div>
    {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    <div className="overflow-x-auto border border-black/10 bg-white"><table className="w-full min-w-[700px] text-left">
      <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.18em] text-[#837D77]"><th className="px-6 py-4">Article</th><th>Publication</th><th>Statut</th><th className="px-6 text-right">Actions</th></tr></thead>
      <tbody>{items.map((item) => <tr key={item._id} className="border-b border-black/[.06] even:bg-black/[.02] hover:bg-black/[.04] transition-colors">
        <td className="px-6 py-5"><p className="font-display text-xl">{item.title}</p><small>/{item.slug}</small></td>
        <td>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(item.publishedAt))}</td><td>{item.status === "published" ? "Publié" : "Brouillon"}</td>
        <td className="px-6 py-5"><div className="flex justify-end gap-2">{item.status === "published" ? <Link href={`/actualites/${item.slug}`} target="_blank" className="flex items-center gap-1.5 bg-[#EF2F29] text-white px-3 py-1.5 text-[10px] uppercase tracking-[.1em] font-medium transition hover:bg-black"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Voir</Link> : null}<Link href={`/admin/actualites/${item._id}`} className="flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 text-[10px] uppercase tracking-[.1em] font-medium transition hover:border-[#EF2F29] hover:text-[#EF2F29]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Modifier</Link><button onClick={() => remove(item)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[.1em] font-medium text-red-600 transition hover:text-red-800"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Supprimer</button></div></td>
      </tr>)}{!items.length ? <tr><td colSpan={4} className="py-20 text-center font-display text-2xl text-[#625D58]">Aucun article</td></tr> : null}</tbody>
    </table></div>
  </>;
}
