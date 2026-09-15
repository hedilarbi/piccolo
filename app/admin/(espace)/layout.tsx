import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSession } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const user = await getSession();
  if (!user) redirect("/admin/connexion");
  return <AdminShell user={user}>{children}</AdminShell>;
}
