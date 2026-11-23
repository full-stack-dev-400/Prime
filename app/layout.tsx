import type { Metadata } from "next";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),

  title: "JKV Prime | Global Markets. Local Insight.",

  description:
    "One prime relationship for aggregated FX liquidity, FIX connectivity at Equinix LD4/LD5 and real-time risk control — built for brokers, funds and exchanges.",

  openGraph: {
    title: "JKV Prime",
    description: "Global Markets. Local Insight.",
    images: ["/brand/jkv-logo-original.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/favicons/favicon-32x32.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/favicons/favicon-48x48.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
