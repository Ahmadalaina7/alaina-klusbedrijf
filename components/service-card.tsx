import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Service } from '@/content/services';

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return <Link href={`/diensten/${service.slug}`} className="service-card" aria-label={`Meer over ${service.title}`} data-event="view_service"><span className="service-card-top"><span className="service-card-icon" aria-hidden="true">{service.icon}</span><span className="card-index">0{index + 1}</span></span><h3>{service.title}</h3><p>{service.short}</p><ArrowUpRight className="service-card-arrow" size={19} aria-hidden="true" /></Link>;
}
