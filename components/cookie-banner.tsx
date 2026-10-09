'use client';

import { ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'alaina-privacy-choice';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(!localStorage.getItem(STORAGE_KEY)); } catch { setVisible(false); }
  }, []);

  const choose = (analytics: boolean) => {
    try { localStorage.setItem(STORAGE_KEY, analytics ? 'analytics' : 'necessary-only'); } catch { /* essential browsing does not depend on stored consent */ }
    setVisible(false);
    window.dispatchEvent(new CustomEvent('alaina-consent', { detail: { analytics } }));
  };

  if (!visible) return null;
  return <section className="cookie-banner" role="dialog" aria-label="Cookiekeuze" aria-describedby="cookie-description">
    <div className="cookie-banner-top"><div><span className="eyebrow"><span /> JE PRIVACY</span><h2>Jij bepaalt wat we meten.</h2></div><button className="cookie-close" aria-label="Alleen noodzakelijke voorkeur onthouden en sluiten" onClick={() => choose(false)} type="button"><X size={19} aria-hidden="true" /></button></div>
    <p id="cookie-description">Deze website gebruikt alleen noodzakelijke functies. Kies vrijwillig of je later anonieme metingen wilt toestaan. Je kunt verder zonder toestemming te geven. <Link href="/cookies">Lees ons cookiebeleid <ArrowUpRight size={13} aria-hidden="true" /></Link></p>
    <div className="cookie-actions"><button type="button" className="button button-outline cookie-action" onClick={() => choose(false)}>Alleen noodzakelijk</button><button type="button" className="button button-primary cookie-action" onClick={() => choose(true)}>Toestaan <ArrowUpRight size={15} aria-hidden="true" /></button></div>
  </section>;
}
