"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

const navigation: readonly NavigationItem[] = [
  { label: "Accueil", href: "/#top" },
  { label: "Le Centre", href: "/le-centre" },
  {
    label: "Ateliers",
    href: "/#ateliers",
    children: [
      { label: "Théâtre", href: "/ateliers/theatre" },
      { label: "DNA", href: "/ateliers/danse" },
      { label: "Mel Art", href: "/ateliers/peinture" },
    ],
  },
  {
    label: "Activités",
    href: "/#activites",
    children: [
      { label: "Production", href: "/activites/production" },
      { label: "Incubation", href: "/activites/incubation" },
      { label: "Diffusion", href: "/activites/diffusion" },
    ],
  },
  { label: "Événements", href: "/evenements" },
  { label: "Spectacles", href: "/spectacles" },
  { label: "Actualités", href: "/actualites" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isSpectacle = pathname.startsWith("/spectacles/");
  const isArticle = pathname.startsWith("/actualites/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [closingSubmenu, setClosingSubmenu] = useState<string | null>(null);

  const closeMenus = (submenu?: string) => {
    setMenuOpen(false);
    setClosingSubmenu(submenu ?? null);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    const updateHeader = () =>
      setScrollProgress(Math.max(0, Math.min(1, window.scrollY / 140)));
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] border-b font-sans transition-[background,border-color,backdrop-filter] duration-500"
      style={{
        background: menuOpen
          ? "rgba(5,5,5,.96)"
          : `rgba(5,5,5,${(0.86 * scrollProgress).toFixed(3)})`,
        borderBottomColor: `rgba(243,239,233,${(
          menuOpen ? 0.09 : 0.09 * scrollProgress
        ).toFixed(3)})`,
        backdropFilter:
          menuOpen || scrollProgress > 0.04 ? "blur(16px)" : "none",
      }}
    >
      <div className="relative mx-auto flex max-w-[1680px] items-center justify-between gap-8 px-[clamp(20px,4vw,60px)] py-[22px]">
        <Link href="/" aria-label="Piccolo Teatro — Accueil">
          <Image
            src="/piccolo.png"
            alt="Piccolo Teatro di Bizerta"
            width={383}
            height={324}
            priority
            className="h-[clamp(44px,4.4vw,62px)] w-auto"
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[clamp(14px,1.7vw,30px)] min-[1100px]:flex"
        >
          {navigation.map((item) => (
            <div
              key={item.label}
              className="group/nav relative py-1.5"
              onMouseLeave={() => setClosingSubmenu(null)}
            >
              <Link
                href={item.href}
                onClick={() => closeMenus(item.children ? item.label : undefined)}
                className="relative whitespace-nowrap py-1.5 text-[12.5px] uppercase tracking-[0.16em] text-[#AAA6A3] transition-colors duration-[350ms] group-hover/nav:!text-[#F3EFE9]"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#EF2F29] transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover/nav:scale-x-100" />
              </Link>
              {item.children ? (
                <div className={`invisible absolute left-1/2 top-full min-w-52 -translate-x-1/2 translate-y-3 pt-5 opacity-0 transition-all duration-300 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 ${closingSubmenu === item.label ? "!invisible !translate-y-3 !opacity-0" : ""}`}>
                  <div className="border border-[rgba(243,239,233,.1)] bg-[rgba(5,5,5,.96)] p-2 shadow-2xl backdrop-blur-2xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => closeMenus(item.label)}
                        className="block border-b border-[rgba(243,239,233,.06)] px-4 py-3 text-[11.5px] uppercase tracking-[0.16em] text-[#AAA6A3] transition-colors last:border-0 hover:bg-[rgba(243,239,233,.06)] hover:!text-[#EF2F29]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-[clamp(14px,1.7vw,30px)]">
          <Link
            href={isSpectacle ? "#inscription" : isArticle ? "/actualites" : "/#contact"}
            className="whitespace-nowrap border border-[rgba(243,239,233,.22)] px-5 py-[11px] text-xs uppercase tracking-[0.16em] !text-[#F3EFE9] transition-colors duration-[400ms] hover:!border-[#EF2F29] hover:!bg-[#EF2F29] hover:!text-[#050505]"
          >
            {isSpectacle ? "Inscrire mon lieu" : isArticle ? "Le journal" : "Nous contacter"}
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="border border-[rgba(243,239,233,.22)] bg-transparent px-3.5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-[#F3EFE9] min-[1100px]:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      <div
        id="site-mobile-menu"
        className={`grid border-t border-[rgba(243,239,233,.08)] bg-[rgba(5,5,5,.96)] transition-[grid-template-rows] duration-500 min-[1100px]:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Navigation mobile"
            className="flex flex-col gap-0.5 px-[clamp(20px,4vw,60px)] pb-7 pt-[18px]"
          >
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-[rgba(243,239,233,.06)]">
                <Link
                  href={item.href}
                  onClick={() => closeMenus()}
                  className="block py-2 font-display text-[26px] text-[#F3EFE9] transition-colors hover:text-[#EF2F29]"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => closeMenus()}
                        className="text-[11px] uppercase tracking-[0.16em] text-[#AAA6A3] transition-colors hover:text-[#EF2F29]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
