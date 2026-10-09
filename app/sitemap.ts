import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

type ChangeFrequency = "weekly" | "monthly" | "yearly";

function entry(path: string, priority: number, changeFrequency: ChangeFrequency, images: string[] = []): MetadataRoute.Sitemap[number] {
  const url = absoluteUrl(path);
  return {
    url,
    lastModified: site.contentUpdated,
    changeFrequency,
    priority,
    alternates: { languages: { "nl-NL": url } },
    ...(images.length ? { images: images.map((image) => absoluteUrl(image)) } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.domainConfigured) return [];

  const pages: MetadataRoute.Sitemap = [
    entry("/", 1, "weekly", [site.heroImage]),
    entry("/diensten", 0.9, "weekly"),
    entry("/offerte-aanvragen", 0.9, "monthly"),
    entry("/projecten", 0.8, "monthly", projects.map((project) => project.image)),
    entry("/werkwijze", 0.7, "monthly"),
    entry("/werkgebied", 0.7, "monthly"),
    entry("/over-ons", 0.6, "monthly"),
    entry("/contact", 0.8, "monthly"),
    entry("/privacy", 0.2, "yearly"),
    entry("/cookies", 0.2, "yearly"),
  ];

  return [
    ...pages,
    ...services.map((service) => entry(`/diensten/${service.slug}`, 0.85, "monthly", service.image ? [service.image] : [])),
    ...projects.map((project) => entry(`/projecten/${project.slug}`, 0.65, "monthly", project.images)),
  ];
}
