import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "JKV Prime | Global Markets. Local Insight.",
  description:
    "One prime relationship for aggregated FX liquidity, FIX connectivity at Equinix LD4/LD5 and real-time risk control — built for brokers, funds and exchanges.",
  openGraph: { title: "JKV Prime", description: "Global Markets. Local Insight.", images: ["/brand/jkv-logo-original.jpg"] },
  icons: { icon: "/brand/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
