import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Pagina niet gevonden', robots: { index: false, follow: true } };

export default function NotFound(){return <section className="section"><div className="container"><div className="eyebrow"><span/> NIET GEVONDEN</div><h1 style={{fontSize:'clamp(3rem,9vw,6rem)',margin:'20px 0'}}>Deze pagina<br/>is even kwijt.</h1><p className="section-intro">Het adres klopt misschien niet of de pagina is verplaatst. Je kunt altijd terug naar het overzicht.</p><div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:26}}><Link className="button button-primary" href="/">Terug naar home <ArrowLeft size={16}/></Link><Link className="button button-outline" href="/diensten">Bekijk diensten <ArrowUpRight size={16}/></Link></div></div></section>}
