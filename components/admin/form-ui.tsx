"use client";
import type { ReactNode } from "react";

export function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="fixed inset-0 z-[100] flex justify-end bg-black/55 backdrop-blur-sm"><button aria-label="Fermer" className="absolute inset-0" onClick={onClose} /><section className="relative h-full w-full overflow-y-auto bg-[#F8F6F2] shadow-[-30px_0_80px_rgba(0,0,0,.25)]"><header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[.08] bg-[#F8F6F2]/95 px-[clamp(22px,4vw,44px)] py-5 backdrop-blur-xl"><div><p className="text-[9px] uppercase tracking-[.22em] text-[#EF2F29]">Administration</p><h2 className="mt-1 font-display text-3xl">{title}</h2></div><button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center border border-black/10 text-xl hover:border-black/40">×</button></header><div className="mx-auto max-w-5xl">{children}</div></section></div>; }
export function FormSection({ title, children }: { title: string; children: ReactNode }) { return <fieldset className="space-y-5"><legend className="mb-5 w-full border-b border-black/10 pb-3 font-display text-2xl">{title}</legend>{children}</fieldset>; }
export function Field(props: { label: string; name: string; defaultValue?: string; type?: string; placeholder?: string; required?: boolean; accept?: string }) { const { label, ...input } = props; return <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">{label}</span><input {...input} onClick={(e) => { if (input.type === "date" || input.type === "datetime-local") { try { e.currentTarget.showPicker(); } catch (err) {} } }} className="min-h-12 w-full border border-black/10 bg-white px-3.5 text-sm outline-none transition focus:border-[#EF2F29] cursor-pointer" /></label>; }
export function Area(props: { label: string; name: string; defaultValue?: string; rows?: number; hint?: string; required?: boolean }) { const { label, hint, ...area } = props; return <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">{label}</span>{hint ? <span className="mb-2 block text-xs text-[#98918B]">{hint}</span> : null}<textarea {...area} className="w-full resize-y border border-black/10 bg-white p-3.5 text-sm leading-6 outline-none transition focus:border-[#EF2F29]" /></label>; }
export function Select({ label, name, defaultValue, options }: { label: string; name: string; defaultValue: string; options: string[] }) { return <label><span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">{label}</span><select name={name} defaultValue={defaultValue} className="min-h-12 w-full border border-black/10 bg-white px-3.5 text-sm outline-none focus:border-[#EF2F29]">{options.map(option => { const [value, text] = option.split("|"); return <option key={value} value={value}>{text}</option>; })}</select></label>; }
export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) { return <label className="flex cursor-pointer items-start gap-3 border border-black/10 bg-white p-4"><input name={name} type="checkbox" defaultChecked={defaultChecked} className="mt-0.5 h-5 w-5 accent-[#EF2F29]" /><span className="text-sm leading-5">{label}</span></label>; }
export function Actions({ saving, onClose }: { saving: boolean; onClose: () => void }) { return <div className="sticky bottom-0 flex justify-end gap-3 border-t border-black/10 bg-[#F8F6F2]/95 py-5 backdrop-blur"><button type="button" onClick={onClose} className="border border-black/15 px-6 py-3 text-[11px] uppercase tracking-[.15em]">Annuler</button><button disabled={saving} className="bg-[#EF2F29] px-7 py-3 text-[11px] font-medium uppercase tracking-[.15em] text-[#050505] disabled:opacity-50">{saving ? "Enregistrement…" : "Enregistrer"}</button></div>; }
export function ErrorMessage({ children }: { children: ReactNode }) { return <p role="alert" className="border-l-2 border-[#EF2F29] bg-red-50 px-4 py-3 text-sm text-red-700">{children}</p>; }
export function localDate(value: string) { const date = new Date(value); const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000); return local.toISOString().slice(0, 16); }

import { useState } from "react";
export function ImageField({ label, name, defaultValue, hint, ratio = "16/9" }: { label: string; name: string; defaultValue?: string; hint?: string; ratio?: string }) {
  const [preview, setPreview] = useState(defaultValue || "");
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[.16em] text-[#726C66]">{label}</span>
      {hint ? <span className="mb-2 block text-xs text-[#98918B]">{hint}</span> : null}
      <div className="flex gap-5 items-start mt-3">
        <div className="relative overflow-hidden bg-black/5 border border-black/10" style={{ aspectRatio: ratio, width: "240px", flexShrink: 0 }}>
          {preview ? <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-[#98918B]">Aucune image</div>}
        </div>
        <div className="flex-1">
          <input type="file" name={name} accept="image/jpeg, image/png, image/webp" className="w-full border border-black/10 bg-white p-3 text-sm" onChange={(e) => { if (e.target.files?.[0]) { setPreview(URL.createObjectURL(e.target.files[0])); } }} />
        </div>
      </div>
    </label>
  );
}
