import { ArrowRight, ArrowUpRight, Check, Compass, Eye, MapPin, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactCta } from '@/components/contact-cta';
import { FaqList } from '@/components/faq-list';
import { ServiceCard } from '@/components/service-card';
import { StructuredData } from '@/components/structured-data';
import { faqs } from '@/content/faq';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Klusbedrijf voor bouwdiensten',
  description: 'Alaina Bouw is een klusbedrijf voor stukadoorswerk, schilderwerk, tuinieren, badkamerrenovatie, tegelen en laminaat leggen. Bespreek je klus vrijblijvend.',
});

const process=[['01','Eerst kennismaken','Vertel over je plannen en de situatie. Samen brengen we in kaart wat je nodig hebt.'],['02','De situatie bespreken','Wensen, werkzaamheden en eventuele aandachtspunten worden samen doorgenomen.'],['03','Heldere vervolgstappen','De eigenaar stemt mogelijkheden en een eventueel voorstel persoonlijk met je af.'],['04','Samen verder','Pas na overleg worden de scope, planning en afspraken bevestigd.']];

export default function HomePage() {
  return <>
    <StructuredData data={faqJsonLd()} />
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span/> ALAINA BOUW KLUSBEDRIJF</div><h1>Goed gebouwd.<br/>Met <em>aandacht.</em></h1><p className="hero-description">Alaina Bouw is een klusbedrijf voor bouwdiensten. Van stukadoorswerk en schilderwerk tot tuinieren, badkamers, tegelen en laminaat — we beginnen met een helder gesprek.</p><div className="hero-actions"><Link href="/offerte-aanvragen" className="button button-primary" data-event="start_quote">Bespreek je plannen <ArrowUpRight size={17} aria-hidden="true"/></Link><Link href="/diensten" className="button button-outline">Bekijk de diensten <ArrowRight size={16} aria-hidden="true"/></Link></div><div className="hero-meta"><span className="meta-line"/><span>Rustig beginnen. Samen bekijken.</span></div></div><div className="hero-image-frame"><Image src={site.heroImage} alt="Alaina Bouw aan het werk tijdens het plaatsen van een badkamerplafond" fill priority sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, 56vw"/><div className="hero-image-caption"><span/>Op locatie · Badkamer in uitvoering</div></div></div><div className="hero-annotation">Vakkundig uitgevoerd</div><span className="hero-bottom-rule" aria-hidden="true"/></section>

    <section className="trust-strip" aria-label="Uitgangspunten"><div className="container trust-strip-inner"><div className="trust-intro"><span className="eyebrow"><span/> HOE WE GRAAG WERKEN</span></div><div className="trust-point"><span className="trust-icon"><Compass size={18}/></span><div><b>Eerst goed bespreken</b><span>Wensen en mogelijkheden</span></div></div><div className="trust-point"><span className="trust-icon"><Eye size={18}/></span><div><b>Helderheid voorop</b><span>Afstemming vóór afspraken</span></div></div><div className="trust-point"><span className="trust-icon"><Sparkles size={18}/></span><div><b>Aandacht voor afwerking</b><span>Details maken het verschil</span></div></div></div></section>

    <section className="section" id="diensten"><div className="container"><div className="section-header"><div><div className="eyebrow"><span/> WAT STAAT ER OP JE LIJSTJE?</div><h2>Vakkundig werk.<br/>Zorgvuldig gedaan.</h2><p>Elke woning en iedere klus vraagt iets anders. Bekijk de bouwdiensten van Alaina Bouw, of vraag gerust wat dit klusbedrijf voor je kan doen.</p></div><Link href="/diensten" className="text-link">Alle diensten bekijken <ArrowUpRight size={17}/></Link></div><div className="service-grid">{services.map((service,index)=><ServiceCard key={service.slug} service={service} index={index}/>)}</div><div className="service-bottom"><span>Dit overzicht is een kennismaking; de eigenaar bevestigt welke werkzaamheden beschikbaar zijn.</span><Link href="/offerte-aanvragen" className="text-link">Past jouw klus ertussen? <ArrowUpRight size={15}/></Link></div></div></section>

    <section className="section section-soft"><div className="container projects-layout"><div className="projects-heading"><div className="eyebrow"><span/> PROJECTEN</div><h2>Werk met<br/>een verhaal.</h2><p>Elk huis heeft een eigen verhaal. De projectpagina’s worden gevuld met foto’s en ervaringen die door Alaina Bouw zijn aangeleverd.</p><Link href="/projecten" className="text-link">Bekijk de projectpagina <ArrowUpRight size={17}/></Link></div><Link className="project-preview" href="/projecten" aria-label="Bekijk de projecten van Alaina Bouw"><Image src="/images/projects/alaina-project-15.webp" alt="Echte foto van een gerenoveerde badkamer met ligbad, wastafel en toilet" fill sizes="(max-width: 850px) 100vw, 65vw"/><div className="project-preview-overlay"><div><p>BADKAMER · PROJECTFOTOGRAFIE</p><h3>Bekijk echt werk van Alaina Bouw.</h3></div><ArrowUpRight size={19}/></div></Link></div><div className="container project-note"><Eye size={14}/>Projecten en resultaten worden niet verzonnen. Vraag gerust naar beschikbaar werk.</div></section>

    <section className="section"><div className="container"><div className="section-header"><div><div className="eyebrow"><span/> VAN IDEE NAAR UITVOERING</div><h2>Een helder begin,<br/>stap voor stap.</h2></div><Link href="/werkwijze" className="text-link">Zo werkt het <ArrowUpRight size={17}/></Link></div><div className="process-grid">{process.map(([num,title,text])=><article className="process-step" key={num}><span className="process-number">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section section-soft"><div className="container split-layout"><div className="split-copy"><div className="eyebrow"><span/> ZORGVULDIG GEPLAND</div><h2>Netjes begint<br/>met goed kijken.</h2><p>Een klus verdient meer dan een snelle inschatting. Daarom staat een goede inventarisatie voorop: wat wil je bereiken, wat is er mogelijk en waar moeten we rekening mee houden?</p><ul className="quality-points"><li><Check size={17}/>Eerst begrijpen wat voor jou belangrijk is.</li><li><Check size={17}/>Mogelijkheden en scope samen afstemmen.</li><li><Check size={17}/>Planning en afspraken persoonlijk bevestigen.</li></ul><Link href="/werkwijze" className="text-link">Ontdek onze werkwijze <ArrowUpRight size={16}/></Link></div><div className="split-visual"><div className="split-image"><Image src="/images/projects/alaina-project-06.webp" alt="Detail van een warme houtlookvloer tijdens de afwerking van een project" fill sizes="(max-width: 600px) 86vw, 47vw"/></div><div className="split-caption"><span>Samen afgestemd</span><strong>De juiste aanpak begint met aandacht.</strong></div></div></div></section>

    <section className="section" id="werkgebied"><div className="container"><div className="section-header"><div><div className="eyebrow"><span/> DE REGIO</div><h2>Een klus om de hoek?</h2><p>{site.isPlaceholder.serviceArea ? 'Het actuele werkgebied is nog niet door de eigenaar opgegeven. Stuur je postcode mee — dan kan Alaina Bouw zelf bevestigen of je locatie past.' : `Alaina Bouw werkt in ${site.serviceArea}. Vermeld je postcode, dan kan de locatie worden bevestigd.`}</p></div><Link href="/werkgebied" className="text-link">Werkgebied bekijken <ArrowUpRight size={17}/></Link></div><div className="area-card"><span className="area-symbol"><MapPin size={24}/></span><div className="area-copy"><div><h3>{site.serviceArea}</h3><p>Vermeld je plaats of postcode bij je aanvraag.</p></div></div><span className="area-chip">{site.isPlaceholder.serviceArea ? 'Regio nog te bevestigen' : 'Werkgebied'}</span><Link href="/werkgebied" className="button button-outline">Meer informatie <ArrowUpRight size={15}/></Link></div></div></section>

    <section className="section section-soft"><div className="container faq-layout"><div className="faq-intro"><div className="eyebrow"><span/> GOED OM TE WETEN</div><h2>Veelgevraagd.</h2><p>Heb je nog een vraag over wat er mogelijk is of hoe een aanvraag in zijn werk gaat?</p><Link href="/contact" className="text-link">Stel je vraag <ArrowUpRight size={17}/></Link></div><FaqList items={faqs}/></div></section>

    <ContactCta title="Klaar om iets moois te maken?" description="De eerste stap is vertellen wat je voor ogen hebt. Alaina Bouw stemt de rest persoonlijk met je af."/>
  </>;
}
