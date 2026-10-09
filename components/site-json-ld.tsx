import { StructuredData } from "@/components/structured-data";
import { siteJsonLd } from "@/lib/seo";

export function SiteJsonLd() {
  return <StructuredData data={siteJsonLd()} />;
}
