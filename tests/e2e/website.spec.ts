import { randomBytes } from "node:crypto";
import { expect, test } from "@playwright/test";

const mainRoutes = [
  "/diensten",
  "/diensten/stukadoor",
  "/diensten/schilderwerk",
  "/diensten/tuinieren",
  "/diensten/badkamer-plaatsen-renoveren",
  "/diensten/tegelen",
  "/diensten/laminaat",
  "/projecten",
  "/projecten/badkamer-renovatie",
  "/projecten/vloer-en-afwerking",
  "/werkwijze",
  "/over-ons",
  "/werkgebied",
  "/contact",
  "/offerte-aanvragen",
  "/privacy",
  "/cookies",
  "/algemene-voorwaarden",
];

test("homepage presents responsive brand, confirmed services, and conversion actions without horizontal overflow", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /goed gebouwd.*aandacht/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /offerte aanvragen/i }).first()).toHaveAttribute("href", "/offerte-aanvragen");
  await expect(page.getByRole("img", { name: /alaina bouw klusbedrijf/i }).first()).toBeVisible();
  for (const service of ["Stukadoor", "Schilderwerk", "Tuinieren", "Badkamer plaatsen of renoveren", "Tegelen", "Laminaat leggen"]) {
    await expect(page.getByRole("heading", { name: service }).first()).toBeVisible();
  }
  await expect(page.getByRole("img", { name: /project van Alaina Bouw/i }).first()).toBeVisible();
  await expect(page.getByText("Werkgebied in overleg").first()).toBeVisible();
  expect(await page.locator("html").evaluate((element) => element.scrollWidth)).toBeLessThanOrEqual(
    await page.locator("html").evaluate((element) => element.clientWidth),
  );
  if (isMobile) {
    await expect(page.getByRole("navigation", { name: "Snelle contactopties" }).getByRole("link", { name: /offerte aanvragen/i })).toBeVisible();
    await page.getByRole("button", { name: "Menu openen" }).click();
    await expect(page.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Projecten" })).toBeVisible();
  } else {
    await expect(page.getByRole("navigation", { name: "Hoofdnavigatie" }).getByRole("link", { name: "Projecten" })).toBeVisible();
  }
});

test("published routes are directly reachable, canonical, and unsupported detail routes remain 404", async ({ page }) => {
  for (const route of mainRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} should resolve`).toBe(200);
    await expect(page.locator("main h1").first(), `${route} should have a primary heading`).toBeVisible();
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical, `${route} should have a canonical URL`).toHaveAttribute("href", new RegExp(`${route.replaceAll("/", "\\/")}$`));
    expect(new URL((await canonical.getAttribute("href"))!).pathname).toBe(route);
  }
  for (const route of ["/werkgebied/bestaande-onbekende-plaats", "/projecten/niet-aangeleverd-project"]) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} must not invent content`).toBe(404);
    await expect(page.getByRole("heading", { name: /pagina.*kwijt/i })).toBeVisible();
  }
});

test("quote flow retains entered data and honestly rejects undeliverable requests", async ({ page }) => {
  await page.goto("/offerte-aanvragen?klus=Badkamer%20plaatsen%20of%20renoveren&utm_source=test&utm_campaign=qa");
  await expect(page.getByRole("radio", { name: "Badkamer plaatsen of renoveren" })).toBeChecked();
  await page.getByRole("button", { name: "Verder" }).click();
  await expect(page.getByText("Stap 2 van 5")).toBeVisible();
  await page.getByRole("button", { name: "Verder" }).click();
  await expect(page.locator(".form-error")).toContainText("Vertel in minimaal 15 tekens");
  const description = "We willen graag onze badkamer renoveren en bespreken de nieuwe indeling, het tegelwerk en de afwerking.";
  await page.getByLabel(/wat moet er gebeuren/i).fill(description);
  await page.getByRole("button", { name: "Verder" }).click();
  await page.getByLabel("Binnen 1–3 maanden").check();
  await page.getByRole("button", { name: "Verder" }).click();
  await page.getByLabel("Postcode").fill("1234 AB");
  await page.getByLabel("Plaats").fill("Voorbeeldstad");
  await page.getByRole("button", { name: "Verder" }).click();
  await page.getByLabel("Naam").fill("Test Persoon");
  await page.getByLabel("Telefoonnummer").fill("+31612345678");
  await page.getByLabel("E-mailadres").fill("test@example.com");
  await page.getByLabel(/ik geef toestemming om mij/i).check();

  await page.getByRole("button", { name: "Aanvraag veilig versturen" }).click();
  await expect(page.locator(".form-error")).toContainText("offertes wordt nog klaargezet");
  await expect(page.getByLabel("Naam")).toHaveValue("Test Persoon");
  await expect(page.getByText("Stap 5 van 5")).toBeVisible();
});

test("server accepts the five confirmed services and rejects unconfirmed jobs, missing consent, and honeypot submissions", async ({ request }) => {
  const [validA, validB] = [...randomBytes(2)].map((value) => (value % 250) + 1);
  const [invalidA, invalidB] = [...randomBytes(2)].map((value) => (value % 250) + 1);
  const validLead = {
    jobType: "Stukadoor", description: "Een complete omschrijving van de klus op deze locatie", timing: "Binnen 1 maand",
    postalCode: "1234 AB", city: "Voorbeeldstad", name: "Demo Klant", phone: "+31612345678",
    email: "demo@example.com", preferredContact: "phone", contactConsent: true, website: "",
  };
  await Promise.all(["Stukadoor", "Schilderwerk", "Tuinieren", "Badkamer plaatsen of renoveren", "Tegelen", "Laminaat leggen"].map(async (jobType, index) => {
    const response = await request.post("/api/leads", {
      data: { ...validLead, jobType },
      headers: { "x-real-ip": `10.${validA}.${validB}.${index + 1}` },
    });
    expect(response.status(), `${jobType} should pass validation before delivery`).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ ok: false });
  }));
  const invalidPayloads = [
    ...["Renovatie", "Badkamer & keuken", "Sloopwerk", "Badkamer plaatsen", "", "Stukadoor "].map((jobType) => ({ ...validLead, jobType })),
    { ...validLead, contactConsent: false },
    { ...validLead, website: "spam" },
  ];
  await Promise.all(invalidPayloads.map(async (data, index) => {
    const response = await request.post("/api/leads", {
      data,
      headers: { "x-real-ip": `11.${invalidA}.${invalidB}.${index + 1}` },
    });
    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ ok: false });
  }));
});

test("robots and sitemap publish https://alainabouw.nl", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsText = await robots.text();
  expect(robotsText).toContain("Allow: /");
  expect(robotsText).toContain("Sitemap: https://alainabouw.nl/sitemap.xml");
  expect(robotsText.split("\n").some((line) => line.trim() === "Disallow: /")).toBe(false);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain("<loc>https://alainabouw.nl</loc>");
  expect(xml).toContain("<loc>https://alainabouw.nl/diensten/stukadoor</loc>");
  expect(xml).not.toContain("localhost");
});
