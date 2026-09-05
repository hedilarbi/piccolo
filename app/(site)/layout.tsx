import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { OpeningCurtain, ScrollAnimations, SiteCursor } from "@/components/site/site-motion";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <OpeningCurtain />
      <ScrollAnimations />
      <SiteCursor />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
