'use client';

import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { site } from '@/content/site';

export function MobileContactBar() {
  return <nav className="mobile-contact-bar" aria-label="Snelle contactopties">
    {site.phone && <a aria-label="Bel Alaina Bouw" data-event="click_phone" href={`tel:${site.phone.replace(/\s/g, '')}`}><Phone size={18} aria-hidden="true" /><span>Bellen</span></a>}
    {site.whatsapp && <a aria-label="Stuur Alaina Bouw een WhatsApp-bericht" data-event="click_whatsapp" href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>WhatsApp</span></a>}
    <Link className="mobile-quote-link" data-event="start_quote" href="/offerte-aanvragen"><span>Offerte aanvragen</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
  </nav>;
}
