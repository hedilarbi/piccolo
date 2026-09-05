"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Antigone, fragments", year: "2025", type: "Théâtre", category: "Théâtre", description: "Relecture chorale d’un texte fondateur.", image: "https://loremflickr.com/800/1000/theatre,stage,light?lock=61" },
  { title: "Corps sonore", year: "2025", type: "Performance", category: "Performance", description: "Une partition pour six interprètes.", image: "https://loremflickr.com/800/1000/performance,dance,stage?lock=62" },
  { title: "Atelier des ombres", year: "2024", type: "Arts visuels", category: "Arts visuels", description: "Installation lumière et matière.", image: "https://loremflickr.com/800/1000/art,installation,gallery?lock=63" },
  { title: "La Traversée", year: "2024", type: "Production", category: "Production", description: "Création accompagnée en résidence.", image: "https://loremflickr.com/800/1000/rehearsal,actor,theatre?lock=64" },
  { title: "Hors champ", year: "2023", type: "Audiovisuel", category: "Audiovisuel", description: "Court-métrage documentaire de plateau.", image: "https://loremflickr.com/800/1000/film,camera,shooting?lock=65" },
  { title: "Chambre 4", year: "2023", type: "Théâtre", category: "Théâtre", description: "Huis clos contemporain en petite forme.", image: "https://loremflickr.com/800/1000/theatre,drama,portrait?lock=66" },
  { title: "Matières premières", year: "2022", type: "Arts visuels", category: "Arts visuels", description: "Exposition des ateliers Mel Art.", image: "https://loremflickr.com/800/1000/exhibition,art,museum?lock=67" },
  { title: "Écho", year: "2022", type: "Performance", category: "Performance", description: "Déambulation sonore dans le centre.", image: "https://loremflickr.com/800/1000/performance,street,art?lock=68" },
] as const;

const filters = ["Tous", "Théâtre", "Performance", "Production", "Arts visuels", "Audiovisuel"] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Tous");
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const visibleProjects = projects.filter(
    (project) => filter === "Tous" || project.category === filter,
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!section || !track || !wrap) return;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      const distance = Math.max(0, track.scrollWidth - wrap.clientWidth);
      track.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
      if (progressRef.current) progressRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [filter]);

  return (
    <section ref={sectionRef} id="spectacles" className="relative h-[400vh] scroll-mt-24">
      <div className="sticky top-0 box-border flex h-svh flex-col justify-center gap-[clamp(10px,2vh,26px)] overflow-hidden pb-[clamp(20px,4vh,44px)] pt-[clamp(70px,10vh,110px)]">
        <div className="site-container">
          <div className="mb-[clamp(20px,3vh,38px)] flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-kicker">Acte VI — Portfolio</p>
              <h2 className="section-title mt-4 text-[clamp(38px,5.2vw,84px)]">Sur <em>scène</em></h2>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filtrer les projets">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                  className={`border px-[15px] py-[9px] text-[11px] uppercase tracking-[0.16em] transition-colors duration-[350ms] ${filter === item ? "border-[#EF2F29] bg-[#EF2F29] text-[#050505]" : "border-[rgba(243,239,233,.16)] bg-transparent text-[#AAA6A3] hover:border-[rgba(243,239,233,.5)] hover:text-[#F3EFE9]"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={wrapRef} className="flex min-h-0 w-full flex-1 items-center overflow-hidden">
          <div ref={trackRef} className="flex h-full items-start gap-[clamp(16px,2vw,34px)] px-[clamp(20px,4vw,60px)] transition-transform duration-[120ms] ease-linear will-change-transform">
            {visibleProjects.map((project) => (
              <Link
                key={project.title}
                href="#spectacles"
                onMouseEnter={() => setHovered(project.title)}
                onMouseLeave={() => setHovered(null)}
                className={`group flex h-full w-[clamp(180px,min(24vw,30svh),400px)] shrink-0 flex-col transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2.5 ${hovered && hovered !== project.title ? "opacity-40" : "opacity-100"}`}
              >
                <div className="relative min-h-0 flex-1 overflow-hidden bg-[#0d0d0d] aspect-[3/4]">
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 60vw, 24vw" className="object-cover grayscale brightness-[.8] transition duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-105 group-hover:saturate-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,5,5,.9)_100%)]" />
                  <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.16em] text-[#EF2F29]">{project.year}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#AAA6A3]">{project.type}</p>
                    <h3 className="mb-1.5 mt-2 font-display text-[clamp(22px,1.9vw,32px)] font-normal leading-[1.05]">{project.title}</h3>
                    <p className="text-[13px] leading-[1.55] text-[#AAA6A3]">{project.description}</p>
                  </div>
                </div>
                <span className="mt-3 inline-flex shrink-0 items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-[#F3EFE9]">Voir le projet <i className="h-px w-[22px] bg-[#EF2F29]" /></span>
              </Link>
            ))}
          </div>
        </div>

        <div className="site-container mt-[clamp(16px,2.4vh,30px)]">
          <div className="h-0.5 bg-[rgba(243,239,233,.1)]">
            <div ref={progressRef} className="h-full w-0 bg-[#EF2F29]" />
          </div>
        </div>
      </div>
    </section>
  );
}
