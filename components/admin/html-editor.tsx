"use client";
import { useRef, useState } from "react";

export function HtmlEditor({ onImagesChange }: { onImagesChange: (files: Map<string, File>) => void }) {
  const editor = useRef<HTMLDivElement>(null); const selection = useRef<Range | null>(null); const [html,setHtml]=useState("");
  const sync=()=>setHtml(editor.current?.innerHTML||"");
  const remember=()=>{const current=window.getSelection();if(current?.rangeCount)selection.current=current.getRangeAt(0).cloneRange()};
  const command=(name:string,value?:string)=>{editor.current?.focus();document.execCommand(name,false,value);sync()};
  const block=(tag:"p"|"h2"|"h3")=>command("formatBlock",tag);
  const link=()=>{const url=window.prompt("Adresse du lien (https://…)");if(url)command("createLink",url)};
  const image=(file:File)=>{const id=crypto.randomUUID();onImagesChange(new Map([[id,file]]));const url=URL.createObjectURL(file);editor.current?.focus();const sel=window.getSelection();if(selection.current){sel?.removeAllRanges();sel?.addRange(selection.current)}const figure=`<figure><img src="${url}" alt="" data-upload-id="${id}"><figcaption>Légende de l’image</figcaption></figure><p><br></p>`;document.execCommand("insertHTML",false,figure);sync()};
  return <div className="overflow-hidden border border-black/15 bg-white"><input type="hidden" name="contentHtml" value={html}/><div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b border-black/10 bg-[#EEEAE4] p-2"><Tool onClick={()=>block("p")}>Paragraphe</Tool><Tool onClick={()=>block("h2")}>Titre H2</Tool><Tool onClick={()=>block("h3")}>Sous-titre H3</Tool><Tool onClick={()=>command("bold")}><strong>B</strong></Tool><Tool onClick={()=>command("italic")}><em>I</em></Tool><Tool onClick={link}>🔗 Lien</Tool><label className="cursor-pointer border border-black/10 bg-white px-3 py-2 text-[10px] uppercase tracking-[.1em] hover:border-[#EF2F29]">＋ Image<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{const f=e.target.files?.[0];if(f)image(f);e.target.value=""}}/></label></div><div ref={editor} contentEditable suppressContentEditableWarning onInput={sync} onBlur={remember} onKeyUp={remember} onMouseUp={remember} data-placeholder="Commencez à écrire votre article…" className="article-editor min-h-[520px] px-[clamp(20px,4vw,54px)] py-10 outline-none" /></div>;
}
function Tool({children,onClick}:{children:React.ReactNode;onClick:()=>void}){return <button type="button" onMouseDown={event=>event.preventDefault()} onClick={onClick} className="min-h-9 border border-black/10 bg-white px-3 text-[10px] uppercase tracking-[.1em] hover:border-[#EF2F29]">{children}</button>}
