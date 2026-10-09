"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const pathname = usePathname();
  const last = items.length - 1;
  const trail = [
    { name: "Home", path: "/" },
    ...items.map((item, index) => ({ name: item.label, path: item.href ?? (index === last ? pathname : undefined) })),
  ];

  return (
    <nav className="breadcrumbs" aria-label="Broodkruimelnavigatie">
      <StructuredData data={breadcrumbJsonLd(trail)} />
      <Link href="/">Home</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} style={{ display: "contents" }}>
          <span aria-hidden="true">/</span>
          {index === last ? <span aria-current="page">{item.label}</span> : <Link href={item.href ?? "/"}>{item.label}</Link>}
        </span>
      ))}
    </nav>
  );
}
