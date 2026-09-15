import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Connexion" };

export default function LoginPage() {
  return <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#080808] px-5 py-12 text-[#F3EFE9]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(239,47,41,.19),transparent_32%),radial-gradient(circle_at_15%_90%,rgba(243,239,233,.08),transparent_30%)]" /><div className="absolute inset-y-0 left-[14%] w-px bg-white/[.06]" /><div className="absolute inset-y-0 right-[14%] w-px bg-white/[.06]" /><LoginForm /></main>;
}
