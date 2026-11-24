import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SITE_CONFIG } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Financial Control & Software Architecture`,
    template: `%s | ${SITE_CONFIG.alias}`,
  },
  description:
    "Official presentation of Gabriel Minka Bassi (Bassi Gabriel) — MBA 2 Financial Management & Control and Software Engineering graduate in Douala, Cameroon.",
  keywords: [
    "Gabriel Minka Bassi",
    "Bassi Gabriel",
    "Financial Management and Control",
    "Software Engineering Douala",
    "Toonslab",
    "Full-Stack Developer Cameroon",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Finance & Software Architecture`,
    description:
      "Bridging financial strategy, management control, and high-velocity software systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Finance & Software Architecture`,
    description:
      "Bridging financial strategy, management control, and high-velocity software systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.alias,
    url: SITE_CONFIG.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Douala",
      addressCountry: "CM",
    },
    alumniOf: ["IUGET", "IUC Logbessou", "IUT of Douala"],
    knowsLanguage: ["English", "French"],
    sameAs: ["https://toonslab.fun"],
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
