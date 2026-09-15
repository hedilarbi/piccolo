"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Article = {
  _id: string; title: string; titleAccent?: string; slug: string; category: string; excerpt: string;
  publishedAt: string; readingMinutes: number; authorName: string; authorRole: string; authorInitials: string;
  photoCredit: string; heroImage: string; heroCaption: string; tags: string[]; relatedSpectacleSlug: string;
  contentHtml: string;
};

export function ArticleDetail({ article, related }: { article: Article; related: Article[] }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toc, setToc] = useState<{ id: string; label: string; level: 2 | 3 }[]>([]);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const headings = [...(contentRef.current?.querySelectorAll<HTMLHeadingElement>("h2") || [])];
    const used = new Set<string>();
    const items = headings.map((heading, index) => {
      const base = heading.textContent?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${index + 1}`;
      let id = base; let suffix = 2;
      while (used.has(id)) id = `${base}-${suffix++}`;
      used.add(id); heading.id = id;
      return { id, label: heading.textContent || `Section ${index + 1}`, level: 2 as const };
    });
    setToc(items);
    const update = () => {
      setProgress(Math.min(100, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) * 100)));
      let active = "";
      for (const heading of headings) if (heading.getBoundingClientRect().top < window.innerHeight * .4) active = heading.id;
      setActiveHeading(active);
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [article.contentHtml]);
  const accent = article.titleAccent || "";
  const regularTitle = accent && article.title.endsWith(accent) ? article.title.slice(0, -accent.length).trim() : article.title;
  async function copyLink() { await navigator.clipboard?.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }

  return <div className="bg-[#050505] text-[#F3EFE9]">
    <span className="fixed left-0 top-0 z-[90] h-[2px] bg-[#EF2F29]" style={{ width: `${progress}%` }} />
    <section className="relative pt-[clamp(138px,18vh,200px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(18px,4vw,60px)]">
        <Link href="/actualites" className="mb-[30px] inline-flex items-center gap-2.5 text-[11.5px] uppercase tracking-[.18em] text-[#AAA6A3] transition hover:text-[#EF2F29]">← Journal de création</Link>
        <div className="mb-[22px] flex flex-wrap items-center gap-3.5"><span className="font-mono text-[11.5px] tracking-[.2em] text-[#EF2F29]">{article.category.toUpperCase()}</span><span className="h-px w-10 bg-[#F3EFE9]/30" /><span className="text-[11px] uppercase tracking-[.24em] text-[#AAA6A3]">{formatDate(article.publishedAt)} · {article.readingMinutes} min de lecture</span></div>
        <h1 className="max-w-[20ch] text-balance font-display text-[clamp(38px,6.4vw,104px)] font-normal leading-[.98] tracking-[-.025em]">{regularTitle}{accent ? <> <em className="font-normal text-[#EF2F29]">{accent}</em></> : null}</h1>
        <p className="mb-[clamp(30px,4.4vh,46px)] mt-[clamp(28px,4vh,44px)] max-w-[62ch] text-pretty font-display text-[clamp(19px,1.7vw,27px)] leading-[1.5]">{article.excerpt}</p>
        <div className="flex flex-wrap items-center gap-[clamp(16px,2.4vw,40px)] border-y border-[#F3EFE9]/10 py-[22px]">{article.authorName || article.authorInitials ? <div className="flex items-center gap-3.5">{article.authorInitials ? <span className="grid h-11 w-11 place-items-center rounded-full border border-[#EF2F29]/40 bg-[#EF2F29]/10 font-display text-[17px] text-[#EF2F29]">{article.authorInitials}</span> : null}<span className="text-sm leading-[1.5]">{article.authorName}{article.authorRole ? <small className="block text-[12.5px] text-[#8f8b88]">{article.authorRole}</small> : null}</span></div> : null}{article.photoCredit ? <span className="font-mono text-[11px] tracking-[.14em] text-[#AAA6A3]">Photographies : {article.photoCredit}</span> : null}<button onClick={copyLink} className="ml-auto min-h-11 border border-[#F3EFE9]/20 px-[18px] font-mono text-[10px] uppercase tracking-[.14em] text-[#AAA6A3] transition hover:border-[#EF2F29] hover:text-[#EF2F29]">{copied ? "Lien copié" : "Copier le lien"}</button></div>
      </div>
      <figure className="mt-[clamp(34px,5vh,60px)]"><div className="relative aspect-[21/9] w-full overflow-hidden bg-[#0e0e0e]"><Image src={article.heroImage || fallback} alt={article.title} fill priority sizes="100vw" className="scale-[1.02] object-cover brightness-[.62] contrast-[1.08]" /><span className="absolute inset-0 bg-gradient-to-b from-[#050505]/35 via-transparent to-[#050505]/40" /></div><figcaption className="mx-auto mt-3.5 max-w-[1180px] px-[clamp(18px,4vw,60px)] font-mono text-[11px] tracking-[.12em] text-[#8f8b88]">{article.heroCaption}</figcaption></figure>
    </section>

    <section className="pb-[clamp(70px,10vh,120px)] pt-[clamp(56px,8vh,100px)]"><div className="mx-auto grid max-w-[1180px] items-start gap-[clamp(30px,4.4vw,70px)] px-[clamp(18px,4vw,60px)] min-[940px]:grid-cols-[minmax(0,1fr)_230px]">
      <article ref={contentRef} className="min-w-0"><div className="article-content" dangerouslySetInnerHTML={{ __html: article.contentHtml }} /><div className="mt-[clamp(44px,6vh,74px)] flex flex-wrap gap-2.5 border-t border-[#F3EFE9]/10 pt-7">{article.tags.map(tag => <Link href="/actualites" key={tag} className="border border-[#F3EFE9]/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-[#AAA6A3] transition hover:border-[#EF2F29] hover:text-[#EF2F29]">{tag}</Link>)}</div></article>
      <aside className="order-first flex flex-col gap-7 min-[940px]:sticky min-[940px]:top-[120px] min-[940px]:order-none">
        {toc.length ? <nav aria-label="Dans cet article"><p className="mb-4 font-mono text-[10.5px] uppercase tracking-[.2em] text-[#EF2F29]">Dans cet article</p><div className="flex flex-col">{toc.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeHeading === item.id ? "location" : undefined} className={`border-l py-2.5 pl-3.5 text-[13px] leading-[1.55] transition-colors duration-300 ${activeHeading === item.id ? "border-[#EF2F29] text-[#F3EFE9]" : "border-[#F3EFE9]/15 text-[#AAA6A3] hover:text-[#F3EFE9]"}`}>{item.label}</a>)}</div></nav> : null}
        {article.relatedSpectacleSlug ? <div className="border border-[#F3EFE9]/15 bg-[#EF2F29]/[.05] p-[22px]"><p className="font-display text-[21px] leading-[1.2]">Le spectacle associé</p><p className="my-3 text-[13px] leading-[1.7] text-[#AAA6A3]">Découvrez la création née de cette histoire.</p><Link href={`/spectacles/${article.relatedSpectacleSlug}`} className="inline-flex min-h-11 items-center bg-[#EF2F29] px-[18px] text-[10px] uppercase tracking-[.14em] text-[#050505]">Voir le spectacle</Link></div> : null}
      </aside>
    </div></section>

    {related.length ? <section className="border-t border-[#F3EFE9]/[.08] bg-[#0A0A0A] py-[clamp(60px,9vh,110px)]"><div className="site-container"><p className="section-kicker">À lire ensuite</p><div className="mt-[clamp(30px,4vh,48px)] grid gap-[clamp(24px,3vw,48px)] md:grid-cols-3">{related.map(item => <Link href={`/actualites/${item.slug}`} key={item.slug} data-reveal className="group"><div className="relative mb-5 aspect-[4/3] overflow-hidden bg-[#0e0e0e]"><Image src={item.heroImage || fallback} alt={item.title} fill sizes="(max-width:768px) 100vw,33vw" className="object-cover transition duration-700 group-hover:scale-105 " /></div><p className="text-[10px] uppercase tracking-[.18em] text-[#EF2F29]">{item.category} <span className="ml-3 text-[#AAA6A3]">{shortDate(item.publishedAt)}</span></p><h3 className="mt-3 font-display text-[clamp(21px,1.8vw,29px)] leading-[1.15]">{item.title}</h3><p className="mt-2.5 text-sm leading-[1.7] text-[#AAA6A3]">{item.excerpt}</p></Link>)}</div></div></section> : null}
  </div>;
}

const fallback = "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1900&h=815&fit=crop&q=80";
function formatDate(value: string) { return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)); }
function shortDate(value: string) { return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value)); }
