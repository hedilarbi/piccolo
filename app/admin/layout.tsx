import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: { default: "Administration", template: "%s | Administration Piccolo" }, robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-[#F4F1EC] font-sans text-[#171717]">{children}</div>;
}
