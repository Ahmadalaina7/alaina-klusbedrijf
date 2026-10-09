import { ArrowUpRight, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactCta } from '@/components/contact-cta';
import { projects } from '@/content/projects';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({ path: '/projecten', title: 'Projecten en uitgevoerde klussen', description: 'Bekijk projectfoto’s van badkamers, tegelwerk en vloeren van Alaina Bouw. Echte beelden uit het portfolio, zonder verzonnen klantdetails.' });

export default function ProjectsPage() {
  return <>
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Projecten' }]} />
        <div className="eyebrow"><span /> EIGEN PROJECTFOTOGRAFIE</div>
        <h1>Echt werk. Echte beelden.</h1>
        <p>Een selectie van door Alaina Bouw aangeleverde foto’s. De beelden geven een inkijkje in badkamers, tegelwerk, vloeren en werkzaamheden tijdens projecten.</p>
      </div>
    </section>
    <section className="page-body section-soft">
      <div className="container">
        <div className="projects-intro-note"><Eye size={17} /><p>De foto’s zijn echt. Omdat projectdetails niet zijn meegeleverd, vermelden we geen namen, plaatsen, reviews of onbevestigde resultaten.</p></div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <Link className="portfolio-card" href={`/projecten/${project.slug}`} key={project.slug}>
              <div className="portfolio-card-image">
                <Image src={project.image} alt={`${project.category}: projectfoto van Alaina Bouw`} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 44vw" priority={index === 0} />
                <span className="portfolio-card-index">0{index + 1}</span>
                <span className="portfolio-card-arrow"><ArrowUpRight size={19} /></span>
              </div>
              <div className="portfolio-card-copy"><div className="eyebrow"><span /> {project.category}</div><h2>{project.title}</h2><p>{project.description}</p><span className="text-link">Bekijk de foto’s <ArrowUpRight size={16} /></span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <ContactCta title="Heb jij een vergelijkbaar plan?" description="Vertel welke ruimte je wilt aanpakken. Dan bespreekt Alaina Bouw persoonlijk de mogelijkheden." />
  </>;
}
