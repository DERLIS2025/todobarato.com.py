import type { Metadata } from "next";
import "./globals.css";
import { PublicLayoutShell } from "@/components/layout/PublicLayoutShell";

export const metadata: Metadata = {
  title: "Todopromo.com.py",
  description:
    "Marketplace paraguayo multicategoría con ofertas para hogar, bazar, electrónica, cotillón y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <PublicLayoutShell>{children}</PublicLayoutShell>
      </body>
    </html>
  );
}
