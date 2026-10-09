import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/content/services';
import { site } from '@/content/site';

function ContactLink({ kind, children, href }: { kind: string; children: React.ReactNode; href: string }) {
  return <a href={href} data-event={kind} className="footer-contact">{children}</a>;
}

export function SiteFooter() {
  const phone = site.phone ? `tel:${site.phone.replace(/\s/g, '')}` : '/contact';
  const email = site.email ? `mailto:${site.email}` : '/contact';
  const emailLabel = site.email || 'Nog in te vullen';
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-intro">
          <Link href="/" className="footer-wordmark">ALAINA<span>BOUW</span></Link>
          <p>Professioneel bouw- en kluswerk, zorgvuldig uitgevoerd.</p>
          <Link href="/offerte-aanvragen" className="text-link">Vertel over je plannen <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="footer-col"><h2>Diensten</h2><Link href="/diensten">Alle diensten</Link>{services.map((service) => <Link key={service.slug} href={`/diensten/${service.slug}`}>{service.title}</Link>)}<Link href="/projecten">Projecten</Link><Link href="/werkwijze">Onze werkwijze</Link><Link href="/werkgebied">Werkgebied</Link></div>
        <div className="footer-col"><h2>Informatie</h2><Link href="/over-ons">Over Alaina Bouw</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacyverklaring</Link><Link href="/cookies">Cookiebeleid</Link><Link href="/algemene-voorwaarden">Voorwaarden</Link></div>
        <div className="footer-col footer-contact-col"><h2>Contact</h2>
          <ContactLink kind="click_phone" href={phone}><Phone size={16} aria-hidden="true" />{site.phone || 'Telefoonnummer volgt'}</ContactLink>
          <ContactLink kind="click_email" href={email}><Mail size={16} aria-hidden="true" />{emailLabel}</ContactLink>
          <div className="footer-contact"><MapPin size={16} aria-hidden="true" /><span>{site.addressLocality ? [site.addressStreet, `${site.postalCode} ${site.addressLocality}`.trim()].filter(Boolean).join(", ") : site.serviceArea}</span></div>
          {site.whatsapp ? <a className="footer-contact" data-event="click_whatsapp" href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><Instagram size={16} aria-hidden="true" />WhatsApp</a> : <span className="footer-muted">WhatsApp-nummer volgt</span>}
        </div>
      </div>
      <div className="footer-bottom"><div className="container footer-bottom-inner"><span>© {new Date().getFullYear()} Alaina Bouw Klusbedrijf</span><span>Vakkundig gebouwd. Zorgvuldig uitgevoerd.</span><Link href="/privacy">Privacy & gegevens</Link></div></div>
    </footer>
  );
}
