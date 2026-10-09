import { ArrowLeft, ArrowUpRight, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactCta } from '@/components/contact-cta';
import { StructuredData } from '@/components/structured-data';
import { projects } from '@/content/projects';
import { pageMetadata } from '@/lib/metadata';
import { projectJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? pageMetadata({ path: `/projecten/${project.slug}`, title: project.seoTitle, description: project.seoDescription, image: project.image, imageAlt: project.title })
    : { title: 'Project niet gevonden', robots: { index: false, follow: true } };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return <>
    <StructuredData data={projectJsonLd(project)} />
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Projecten', href: '/projecten' }, { label: project.title }]} />
        <div className="eyebrow"><span /> EIGEN PROJECTFOTOGRAFIE</div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <Link href="/offerte-aanvragen" className="page-hero-cta" data-event="start_quote">Bespreek een vergelijkbare klus <ArrowUpRight size={17} /></Link>
      </div>
    </section>
    <section className="page-body section-soft">
      <div className="container">
        <div className="project-gallery-heading">
          <div><div className="eyebrow"><span /> UIT HET PORTFOLIO</div><h2>Werk in beeld.</h2></div>
          <p>{project.category} <span aria-hidden="true">·</span> {project.location}</p>
        </div>
        <div className="project-gallery">
          {project.images.map((image, index) => (
            <figure className={index === 0 ? 'project-gallery-item project-gallery-featured' : 'project-gallery-item'} key={image}>
              <Image src={image} alt={`${project.category}, projectfoto ${index + 1} van ${project.images.length}`} fill sizes={index === 0 ? '(max-width: 700px) 100vw, 65vw' : '(max-width: 700px) 50vw, 33vw'} priority={index === 0} loading={index === 0 ? 'eager' : 'lazy'} />
              <figcaption><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="project-note"><Eye size={15} /> Projectfoto’s zijn door Alaina Bouw aangeleverd. Locaties, klantnamen, planning en specifieke werkzaamheden zijn niet vermeld.</p>
        <Link href="/projecten" className="project-back-link"><ArrowLeft size={16} /> Alle projecten bekijken</Link>
      </div>
    </section>
    <ContactCta title="Een soortgelijke klus bespreken?" description="Vertel over je plannen. Alaina Bouw bespreekt persoonlijk wat er mogelijk is." />
  </>;
}
