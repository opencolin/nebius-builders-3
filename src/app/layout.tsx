import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebius Builders — Nebius for AI Builders",
  description:
    "Training, fine-tuning, and inference at scale on Nebius — plus the community of builders shipping on it. Workshops, demos, hackathons, and office hours, with $100 of Token Factory or AI Cloud credits to start.",
  metadataBase: new URL("https://builders.nebius.com"),
  openGraph: {
    title: "Nebius Builders",
    description:
      "Nebius for AI Builders. Training, fine-tuning, and inference at scale — plus the community that ships on it.",
    url: "https://builders.nebius.com",
    siteName: "Nebius Builders",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
