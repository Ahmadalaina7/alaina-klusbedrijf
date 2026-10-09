'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';  const links = [
  ['Diensten', '/diensten'], ['Projecten', '/projecten'], ['Werkwijze', '/werkwijze'],
  ['Over ons', '/over-ons'], ['Werkgebied', '/werkgebied'], ['Contact', '/contact'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="utility-bar"><div className="container utility-inner"><span>Alaina Bouw Klusbedrijf</span><span>Vakkundig gebouwd. Zorgvuldig uitgevoerd.</span><Link href="/contact">Een klus bespreken <ArrowUpRight size={13} aria-hidden="true" /></Link></div></div>
      <div className="container navigation-row">
        <Link className="brand" href="/" aria-label="Alaina Bouw — startpagina" onClick={() => setOpen(false)}>
          <Image src="/images/alaina-bouw-logo-crop.png" width={182} height={120} alt="Alaina Bouw Klusbedrijf" priority />
        </Link>
        <nav id="mobile-navigation" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Hoofdnavigatie">
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="button button-primary nav-mobile-cta" href="/offerte-aanvragen" onClick={() => setOpen(false)}>Offerte aanvragen <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
        <div className="header-actions">
          <Link className="button button-primary header-cta" href="/offerte-aanvragen">Offerte aanvragen <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button className="menu-toggle" type="button" aria-label={open ? 'Menu sluiten' : 'Menu openen'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
