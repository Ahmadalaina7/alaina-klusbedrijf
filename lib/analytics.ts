'use client';

export function trackEvent(event: string, detail?: Record<string, string | number | boolean>) {
  try {
    if (localStorage.getItem('alaina-privacy-choice') !== 'analytics') return;
  } catch {
    return;
  }
  window.dispatchEvent(new CustomEvent('alaina-analytics-event', { detail: { event, ...detail } }));
}
