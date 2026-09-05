"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function OpeningCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setVisible(false), reduced ? 0 : 2300);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none">
      <div className="curtain-panel curtain-panel-left flex-1" />
      <div className="curtain-panel curtain-panel-right flex-1" />
    </div>
  );
}

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    reveals.forEach((element) => observer.observe(element));

    const parallaxItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const heroCopy = document.querySelector<HTMLElement>("[data-hero-copy]");
    const heroBackground = document.querySelector<HTMLElement>("[data-hero-bg]");
    const heroBeam = document.querySelector<HTMLElement>("[data-beam]");
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        const heroProgress = Math.max(
          0,
          Math.min(1, -heroRect.top / window.innerHeight),
        );
        if (heroCopy) {
          heroCopy.style.transform = `translate3d(0, ${-heroProgress * 90}px, 0) scale(${1 - heroProgress * 0.06})`;
          heroCopy.style.opacity = String(1 - heroProgress * 0.9);
        }
        if (heroBackground) {
          heroBackground.style.transform = `translate3d(0, ${heroProgress * 110}px, 0)`;
        }
        if (heroBeam) {
          heroBeam.style.transform = `rotate(${14 - heroProgress * 9}deg) translate3d(${-heroProgress * 90}px, 0, 0)`;
        }
      }
      parallaxItems.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const speed = Number(element.dataset.parallax ?? 0.08);
        const center = (rect.top + rect.height / 2 - viewportCenter) / window.innerHeight;
        const offset = -center * speed * 100;
        element.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

export function SiteCursor() {
  const pathname = usePathname();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isPainting = pathname.startsWith("/ateliers/mel-art");
  const variant = pathname.startsWith("/ateliers/dna")
    ? "dna"
    : pathname.startsWith("/ateliers/theatre")
      ? "theatre"
      : "home";

  useEffect(() => {
    if (
      isPainting ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;
    document.documentElement.classList.add("has-site-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;
    const move = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.dataset.visible = "true";
      dot.dataset.visible = "true";
      const interactive = (event.target as Element | null)?.closest(
        "a, button, input, textarea, select, [data-cursor]",
      );
      ring.dataset.active = interactive ? "true" : "false";
    };
    const leave = () => {
      ring.dataset.visible = "false";
      dot.dataset.visible = "false";
    };
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = window.requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("has-site-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.cancelAnimationFrame(frame);
    };
  }, [isPainting, pathname]);

  if (isPainting) return null;

  return (
    <>
      <div ref={ringRef} data-cursor-variant={variant} className="site-cursor-ring" aria-hidden="true">
        {variant === "dna" ? <><i /><i /><i /></> : null}
        {variant === "theatre" ? (
          <svg viewBox="0 0 40 34" aria-hidden="true">
            <path d="M4 5.5C9 2.7 14.3 2 20 3.8 25.7 2 31 2.7 36 5.5v9.2c0 8.8-6.4 14.7-16 16.3C10.4 29.4 4 23.5 4 14.7V5.5Z" />
            <path d="M9.2 12.3c2.9-2 5.6-2 8.2.3-3.1 2.2-5.8 2.1-8.2-.3Zm13.4.3c2.6-2.3 5.3-2.3 8.2-.3-2.4 2.4-5.1 2.5-8.2.3Z" />
            <path d="M14.2 22.2c3.8 2.4 7.7 2.4 11.6 0" />
          </svg>
        ) : null}
      </div>
      <div ref={dotRef} data-cursor-variant={variant} className="site-cursor-dot" aria-hidden="true" />
    </>
  );
}
