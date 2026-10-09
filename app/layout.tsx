import type { Metadata, Viewport } from "next";
import { SiteJsonLd } from "@/components/site-json-ld";
import { SiteLayout } from "@/components/site-layout";
import { site } from "@/content/site";
import "@/app/globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: "Alaina Bouw Klusbedrijf | Vakkundig gebouwd", template: "%s | Alaina Bouw" },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  publisher: site.name,
  category: "Bouw en klussen",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: Boolean(site.phone), email: Boolean(site.email), address: Boolean(site.addressLocality) },
  icons: { icon: [{ url: site.logo, type: "image/png" }], apple: site.logo },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: site.name,
    title: "Alaina Bouw Klusbedrijf",
    description: site.description,
    url: "/",
    images: [{ url: site.heroImage, alt: "Projectfoto van Alaina Bouw Klusbedrijf" }],
  },
  twitter: { card: "summary_large_image", title: "Alaina Bouw Klusbedrijf", description: site.description, images: [site.heroImage] },
  robots: site.domainConfigured
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: true },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport: Viewport = { themeColor: "#faf9f7", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        <SiteJsonLd />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
