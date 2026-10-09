# Alaina Bouw Klusbedrijf — website

Een Nederlandstalige Next.js-website voor Alaina Bouw Klusbedrijf. De interface, routes en offerteflow zijn gebouwd met de aangeleverde branding. Omdat de bedrijfsgegevens, regio, projecten en reviews ontbreken, worden er geen onbevestigde bewijsstukken of contactgegevens verzonnen.

## Vereisten

- Node.js 20+
- npm 10+

## Lokaal starten

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open daarna <http://localhost:3000>.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 npm run test:e2e
```

## Leads configureren vóór livegang

Kopieer `.env.example` naar `.env.local` en vul de door de eigenaar bevestigde gegevens in:

- `NEXT_PUBLIC_SITE_URL`: canoniek adres, standaard `https://alainabouw.nl`.
- `NEXT_PUBLIC_PHONE`: echt belbaar telefoonnummer.
- `NEXT_PUBLIC_WHATSAPP`: het bevestigde nummer met landcode.
- `NEXT_PUBLIC_EMAIL`: actief zakelijk e-mailadres.
- `LEAD_WEBHOOK_URL`: privé HTTPS-webhook voor leadontvangst; nooit publiek laten zien.

Het actuele dienstenaanbod staat centraal in `content/services.ts` en bevat stukadoorswerk, schilderwerk, tuinieren, badkamers plaatsen of renoveren, tegelwerk en laminaat leggen. De aangeleverde projectfoto’s staan geoptimaliseerd als WebP in `public/images/projects/` en worden getoond in het portfolio.

De server valideert payloads met Zod, controleert afbeeldingen (JPEG/PNG/WebP, maximaal 5 MB), gebruikt een honeypot en begrenst verzoeken per IP in de procesgeheugenopslag. Ongeconfigureerde of mislukte bezorging produceert nadrukkelijk geen succesbericht. De aangewezen ontvangende webhook is verantwoordelijk voor de veilige bewaartermijn, interne notificatie, eventuele ontvangstbevestiging, toegangscontrole, back-ups, verwerkersovereenkomsten en opvolging.

De huidige IP-limiter werkt binnen één Node-proces. Bij multi-instance/serverless productie is een gedeelde, distribueerbare rate-limit adapter nodig. Controleer ook maximale request-body-grootte van de hostingprovider. Voor bedrijfsbrede beveiliging kan een platform-WAF aanvullend nodig zijn.

## Projectfoto’s

De zip met 15 projectfoto’s is veilig verwerkt tot geoptimaliseerde WebP-bestanden (maximaal 1200 px; circa 1,7 MB totaal). De badkamer- en vloerportfolio’s gebruiken de meegeleverde foto’s, inclusief mobiele en desktopvriendelijke detailgalerijen.

## Gebouwd

- Responsive homepage, navigatie, dienstenoverzicht en herbruikbare dienstpagina’s.
- Projectoverzicht en individuele projectpagina’s met de aangeleverde, geoptimaliseerde foto’s; locaties en projectdetails worden niet verzonnen.
- Werkwijze, over ons, werkgebied, contact, offerteaanvraag, privacy, cookies en conceptvoorwaarden.
- Meerstapsformulier met behoud van ingevulde gegevens bij verzendfout, client/server-validatie, honeypot, optionele veilige foto-upload en UTM-attributie.
- Metadata, canonical URLs, Open Graph, JSON-LD met alleen bekende feiten, robots.txt en sitemap.
- Toegankelijke links, labels, focus, reduced motion, keyboard-navigatie en cookiebanner met gelijkwaardige keuzes.

## Nog nodig voor productie

- Officieel bedrijfsadres, registratienummer en juridisch gecontroleerde bedrijfsnaam. Het canonieke domein is `https://alainabouw.nl`.
- Echte telefoon, e-mail, WhatsApp, plaats, werkgebied en openingstijden.
- Beschikbare diensten en echte bedrijfsbiografie.
- Toestemming en onderschriften voor de aangeleverde projectfoto’s, echte reviews met bron, ervaring, certificaten, verzekerings- en garantie-informatie.
- Definitieve algemene voorwaarden en privacybeleid, bewaartermijnen, AVG-verantwoordelijke en privacycontact.
- Geverifieerde veilige webhook/leadbeheerder, eigenaar van notificaties, ontvangstbevestiging en spamfilter.
- Aangrenzende diensten uitsluitend opnemen nadat beschikbaarheid echt bevestigd is.

Er wordt geen niet-toegestane analytics geladen; een toekomstige analyticsintegratie moet pas na toestemming starten. De huidige opt-in signaleert toestemming, maar registreert op zichzelf geen analytics.

`/werkgebied/[slug]` en `/projecten/[slug]` hebben bewust geen fictieve detailpagina’s. Echte, unieke plaats- of projectgegevens kunnen later de templates vullen. De dynamische vacature routes renderen als 404 totdat de content bestaat.

## Zichtbaar in Google

Het canonieke adres is `https://alainabouw.nl`. `www.alainabouw.nl` wordt doorverwezen naar dat adres. Publiceer deze versie op die host. Daarna:

1. Open [Google Search Console](https://search.google.com/search-console) en voeg `https://alainabouw.nl` toe.
2. Kies HTML-tagverificatie en zet alleen de code in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Dien `https://alainabouw.nl/sitemap.xml` in.
4. Vul telefoon, e-mail, adres en werkgebied pas in als die gegevens echt kloppen. Google Maps heeft een volledig en gelijk adres, telefoonnummer en bedrijfsnaam nodig; verzonnen plaatsen of reviews worden niet toegevoegd.

Indexatie duurt daarna meestal enkele dagen tot een paar weken. De site vraagt Google om pagina’s te volgen, maar een vermelding in de zoekresultaten blijft een beslissing van Google.

## Hosting

Gebruik een Node.js-host die Next.js App Router ondersteunt. Stel bovenstaande environment variables in via het beveiligde hostinstellingenpaneel; commit geen echte `.env.local` of webhooksleutels. Configureer op het platform een minimale bodylimiet van 7,5 MB en passend HTTPS-only verkeer. Test daarna formulier, afwijzingen, notificatie en follow-up met de webhookeigenaar vóór het publiceren.
