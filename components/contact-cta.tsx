import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import Link from 'next/link';

export function ContactCta({ title = 'Tijd om plannen te maken?', description = 'Vertel wat je in gedachten hebt. Dan kan Alaina Bouw met je meedenken over een passende volgende stap.' }: { title?: string; description?: string }) {
  return <section className="cta-band"><div className="cta-band-grid" aria-hidden="true" /><div className="cta-band-inner container"><div className="eyebrow eyebrow-light"><span />VAN PLAN NAAR AANPAK</div><h2>{title}</h2><p>{description}</p><Link className="button button-light" href="/offerte-aanvragen">Bespreek je project <ArrowUpRight size={17} aria-hidden="true" /></Link></div><MoveUpRight className="cta-decoration" size={120} strokeWidth={.65} aria-hidden="true" /></section>;
}
