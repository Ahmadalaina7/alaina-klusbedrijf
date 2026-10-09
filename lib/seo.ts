import { faqs } from "@/content/faq";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { services } from "@/content/services";
import { site } from "@/content/site";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return site.domain;
  return `${site.domain}${normalized}`;
}

export const businessId = `${site.domain}/#business`;
export const websiteId = `${site.domain}/#website`;

function defined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== "")) as T;
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) =>
      defined({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.path ? absoluteUrl(item.path) : undefined,
      }),
    ),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diensten van Alaina Bouw",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: absoluteUrl(`/diensten/${service.slug}`),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  const area = areaServed();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: absoluteUrl(`/diensten/${service.slug}`),
    provider: { "@id": businessId },
    ...(area ? { areaServed: area } : {}),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projecten/${project.slug}`),
    image: project.images.map((image) => absoluteUrl(image)),
    creator: { "@id": businessId },
  };
}

export function contactJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact met Alaina Bouw",
    url: absoluteUrl("/contact"),
    inLanguage: "nl-NL",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": businessId },
    about: { "@id": businessId },
  };
}

function areaServed() {
  if (site.isPlaceholder.serviceArea) return undefined;
  const places = site.serviceArea.split(",").map((place) => place.trim()).filter(Boolean);
  if (places.length === 1) return { "@type": "AdministrativeArea", name: places[0] };
  return places.map((name) => ({ "@type": "AdministrativeArea", name }));
}

function openingHours() {
  return /^(Mo|Tu|We|Th|Fr|Sa|Su).*\d{2}:\d{2}/.test(site.openingHours) ? site.openingHours : undefined;
}

export function siteJsonLd() {
  const address = site.addressLocality
    ? defined({
        "@type": "PostalAddress",
        streetAddress: site.addressStreet || undefined,
        postalCode: site.postalCode || undefined,
        addressLocality: site.addressLocality,
        addressRegion: site.addressRegion || undefined,
        addressCountry: "NL",
      })
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      defined({
        "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
        "@id": businessId,
        name: site.name,
        alternateName: [site.shortName, "Alainabouw", "Alaina Bouw klusbedrijf"],
        description: site.description,
        url: absoluteUrl("/"),
        image: absoluteUrl(site.heroImage),
        logo: defined({
          "@type": "ImageObject",
          url: absoluteUrl(site.logo),
          width: 981,
          height: 644,
        }),
        telephone: site.phone || undefined,
        email: site.email || undefined,
        address,
        areaServed: areaServed(),
        openingHours: openingHours(),
        identifier: site.kvk ? { "@type": "PropertyValue", propertyID: "KVK", value: site.kvk } : undefined,
        knowsLanguage: "nl",
        knowsAbout: ["Klusbedrijf", "Bouwdiensten", "Stukadoorswerk", "Schilderwerk", "Tuinieren", "Badkamer plaatsen", "Badkamer renoveren", "Tegelen", "Laminaat leggen"],
        currenciesAccepted: "EUR",
        sameAs: site.profiles.length ? site.profiles : undefined,
        contactPoint: site.phone || site.email
          ? defined({
              "@type": "ContactPoint",
              contactType: "customer service",
              telephone: site.phone || undefined,
              email: site.email || undefined,
              availableLanguage: ["Dutch", "nl"],
              areaServed: "NL",
            })
          : undefined,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Bouwdiensten",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.short,
              url: absoluteUrl(`/diensten/${service.slug}`),
            },
          })),
        },
      }),
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: site.name,
        description: site.description,
        inLanguage: "nl-NL",
        publisher: { "@id": businessId },
      },
    ],
  };
}
