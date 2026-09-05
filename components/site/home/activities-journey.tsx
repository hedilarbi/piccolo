"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  { number: "01", title: "Production", href: "/activites/production", description: "Transformer une vision artistique en un projet structuré et réalisable.", image: "https://loremflickr.com/1600/1000/theatre,scenography,backstage?lock=34" },
  { number: "02", title: "Diffusion", href: "/activites/diffusion", description: "Accompagner les œuvres dans leur rencontre avec les lieux, les partenaires et les publics.", image: "https://loremflickr.com/1600/1000/theatre,audience,concerthall?lock=35" },
  { number: "03", title: "Incubation", href: "/activites/incubation", description: "Offrir aux artistes et porteurs de projets un cadre pour expérimenter, évoluer et se développer.", image: "https://loremflickr.com/1600/1000/rehearsal,theatre,artist?lock=36" },
] as const;

export function ActivitiesJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const nextProgress = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0;
      const nextIndex = Math.min(steps.length - 1, Math.floor(nextProgress * (steps.length - 0.001)));
      setProgress(nextProgress);
      setActiveIndex(nextIndex);
      setLocalProgress(Math.max(0, Math.min(1, nextProgress * steps.length - nextIndex)));
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
  }, []);

  const goToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const span = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + span * ((index + 0.45) / steps.length),
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="activites" className="relative h-[260vh] scroll-mt-24">
      <div className="sticky top-0 h-svh overflow-hidden">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="100vw"
              className="object-cover grayscale brightness-[0.55]"
              style={{ transform: index === activeIndex ? `scale(${1.06 + localProgress * 0.1}) translate3d(0, ${localProgress * -22}px, 0)` : "scale(1.06)", transition: "transform 120ms linear" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_72%_40%,rgba(239,47,41,.2),transparent_68%)]" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.96)_0%,rgba(5,5,5,.72)_45%,rgba(5,5,5,.55)_100%)]" />

        <div className="site-container relative grid h-full grid-cols-1 items-center gap-[clamp(30px,5vw,90px)] md:grid-cols-2">
          <div>
            <p className="section-kicker">Acte IV — Sur les planches</p>
            <h2 className="section-title mb-8">De l’idée <em>jusqu’à la scène</em></h2>
            <div className="mb-5 flex items-baseline gap-3">
              <span className="font-display text-[clamp(28px,2.6vw,40px)] leading-none text-accent">{steps[activeIndex].number}</span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted">/ 03</span>
              <span className="ml-2 text-[11px] uppercase tracking-[0.24em] text-muted">{steps[activeIndex].title}</span>
            </div>
            <div className="h-0.5 max-w-[420px] bg-foreground/15"><span className="block h-full bg-accent" style={{ width: `${progress * 100}%` }} /></div>
            <div className="mt-3 flex gap-2.5">
              {steps.map((step, index) => (
                <button key={step.title} type="button" onClick={() => goToStep(index)} className={`min-h-11 flex-1 basis-[132px] border-t-2 py-3 text-left text-[11px] uppercase tracking-[0.16em] transition-colors ${index <= activeIndex ? "border-accent" : "border-foreground/15"} ${index === activeIndex ? "text-foreground" : "text-muted"}`}>{step.title}</button>
              ))}
            </div>
            <div className={`mt-[clamp(24px,4vh,40px)] flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-subtle transition-opacity ${progress > 0.82 ? "opacity-0" : "opacity-100"}`}>
              <span className="h-9 w-px bg-gradient-to-b from-accent to-transparent" />
              Continuez à faire défiler
            </div>
          </div>

          <div className="relative min-h-[340px]">
            {steps.map((step, index) => (
              <div key={step.title} className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${index === activeIndex ? "translate-y-0 opacity-100" : index < activeIndex ? "-translate-y-8 opacity-0 pointer-events-none" : "translate-y-8 opacity-0 pointer-events-none"}`}>
                <span className="font-display text-[clamp(70px,9vw,150px)] leading-[0.82] text-accent">{step.number}</span>
                <h3 className="mb-4 mt-5 font-display text-[clamp(30px,3vw,46px)] leading-none">{step.title}</h3>
                <p className="mb-7 max-w-[42ch] text-[clamp(15px,1.1vw,17px)] leading-7 text-muted">{step.description}</p>
                <Link href={step.href} className="inline-flex w-fit items-center gap-3 border-b border-foreground/25 pb-2 text-[11px] uppercase tracking-[0.18em] hover:border-accent">En savoir plus <span className="h-px w-6 bg-accent" /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
