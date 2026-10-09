'use client';

import { useEffect } from 'react';

export function AnalyticsOptIn() {
  useEffect(() => {
    let enabled = localStorage.getItem('alaina-privacy-choice') === 'analytics';
    const handleConsent = (event: Event) => {
      enabled = Boolean((event as CustomEvent<{ analytics: boolean }>).detail?.analytics);
    };
    const handleClick = (event: MouseEvent) => {
      if (!enabled) return;
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-event]') : null;
      if (!element) return;
      window.dispatchEvent(new CustomEvent('alaina-analytics-event', {
        detail: { event: element.dataset.event, path: window.location.pathname },
      }));
    };
    window.addEventListener('alaina-consent', handleConsent);
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('alaina-consent', handleConsent);
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return null;
}
