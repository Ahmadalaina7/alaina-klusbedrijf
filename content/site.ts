export const canonicalOrigin = "https://alainabouw.nl";
export const canonicalHost = "alainabouw.nl";

function origin(value: string) {
  return value.replace(/\/+$/, "");
}

const requestedOrigin = origin(process.env.NEXT_PUBLIC_SITE_URL?.trim() || canonicalOrigin);
const domainConfigured = requestedOrigin.startsWith("https://") && !/localhost|127\.0\.0\.1/.test(requestedOrigin);

const serviceArea = process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || "Werkgebied in overleg";
const addressStreet = process.env.NEXT_PUBLIC_ADDRESS_STREET?.trim() || "";
const addressLocality = process.env.NEXT_PUBLIC_ADDRESS_LOCALITY?.trim() || "";
const postalCode = process.env.NEXT_PUBLIC_POSTAL_CODE?.trim() || "";
const addressRegion = process.env.NEXT_PUBLIC_ADDRESS_REGION?.trim() || "";

export const site = {
  name: "Alaina Bouw Klusbedrijf",
  shortName: "Alaina Bouw",
  domain: requestedOrigin,
  domainConfigured,
  contentUpdated: "2026-10-09",
  description:
    "Alaina Bouw is een klusbedrijf voor stukadoorswerk, schilderwerk, tuinieren, badkamerrenovatie, tegelen en laminaat leggen.",
  keywords: [
    "Alaina Bouw",
    "Alaina Bouw Klusbedrijf",
    "alainabouw",
    "klusbedrijf",
    "bouwbedrijf",
    "bouwdiensten",
    "bouw en klussen",
    "stukadoor",
    "stukadoorswerk",
    "schilderwerk",
    "schilder",
    "tuinieren",
    "tuinwerk",
    "badkamer renoveren",
    "badkamer plaatsen",
    "tegelen",
    "tegelwerk",
    "laminaat leggen",
    "klusbedrijf offerte",
  ],
  heroImage: "/images/projects/alaina-project-09.webp",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  serviceArea,
  addressStreet,
  addressLocality,
  postalCode,
  addressRegion,
  kvk: process.env.NEXT_PUBLIC_KVK?.trim() || "",
  openingHours: process.env.NEXT_PUBLIC_OPENING_HOURS?.trim() || "",
  profiles: (process.env.NEXT_PUBLIC_SAME_AS || "")
    .split(",")
    .map((profile) => profile.trim())
    .filter((profile) => profile.startsWith("https://")),
  logo: "/images/alaina-bouw-logo-crop.png",
  isPlaceholder: {
    phone: !process.env.NEXT_PUBLIC_PHONE,
    whatsapp: !process.env.NEXT_PUBLIC_WHATSAPP,
    email: !process.env.NEXT_PUBLIC_EMAIL,
    serviceArea: !process.env.NEXT_PUBLIC_SERVICE_AREA?.trim(),
    address: !addressLocality,
  },
} as const;
