import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#faf9f7",
    theme_color: "#faf9f7",
    lang: "nl",
    categories: ["business"],
    icons: [{ src: site.logo, sizes: "981x644", type: "image/png", purpose: "any" }],
  };
}
