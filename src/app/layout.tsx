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
  const themeScript = `(function(){try{var t=localStorage.getItem('nb-theme');var dark=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme:dark)').matches);var html=document.documentElement;if(dark){html.classList.add('dark');}html.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
