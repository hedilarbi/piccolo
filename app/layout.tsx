import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://piccoloteatro.tn"),
  title: { default: "Piccolo Teatro", template: "%s | Piccolo Teatro" },
  description:
    "Centre culturel et artistique dédié au théâtre, à la création et à l’accompagnement des artistes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-TN" className={`${archivo.variable} ${bodoni.variable}`}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
