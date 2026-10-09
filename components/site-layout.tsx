import { AnalyticsOptIn } from '@/components/analytics-opt-in';
import { CookieBanner } from '@/components/cookie-banner';
import { MobileContactBar } from '@/components/mobile-contact-bar';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main-content">Ga direct naar de inhoud</a><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter /><MobileContactBar /><CookieBanner /><AnalyticsOptIn /></>;
}
