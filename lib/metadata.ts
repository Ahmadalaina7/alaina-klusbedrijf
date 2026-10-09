import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noindex?: boolean;
};

const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function pageMetadata({ path, title, description, image = site.heroImage, imageAlt = "Projectfoto van Alaina Bouw Klusbedrijf", keywords = [], noindex = false }: PageMetadataInput): Metadata {
  const brandedTitle = `${title} | ${site.shortName}`;
  const indexable = site.domainConfigured && !noindex;
  const canonical = path === "/" ? site.domain : path;

  return {
    title: path === "/" ? { absolute: brandedTitle } : title,
    description,
    keywords: [...new Set([...keywords, ...site.keywords])],
    alternates: { canonical, languages: { "nl-NL": canonical } },
    robots: indexable ? indexRobots : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: site.name,
      title: brandedTitle,
      description,
      url: path,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title: brandedTitle, description, images: [image] },
  };
}
