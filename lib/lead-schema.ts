import { z } from 'zod';

export const jobTypes = ["Stukadoor", "Schilderwerk", "Tuinieren", "Badkamer plaatsen of renoveren", "Tegelen", "Laminaat leggen"] as const;
export const timings = ["Zo snel mogelijk", "Binnen 1 maand", "Binnen 1–3 maanden", "Binnen 3–6 maanden", "Ik ben me aan het oriënteren"] as const;
export const budgets = ["", "Tot € 2.500", "€ 2.500 – € 5.000", "€ 5.000 – € 10.000", "€ 10.000 – € 25.000", "€ 25.000 of meer", "Dat weet ik nog niet"] as const;
const emailSchema = z.string().trim().email('Vul een geldig e-mailadres in.').max(254, 'Dit e-mailadres is te lang.');

export const leadSchema = z.object({
  jobType: z.enum(jobTypes, { error: 'Kies een van de aangeboden diensten.' }),
  description: z.string().trim().min(15, 'Vertel in minimaal 15 tekens iets meer over de klus.').max(3000, 'De omschrijving mag maximaal 3000 tekens zijn.'),
  timing: z.enum(timings, { error: 'Kies een geldige planning.' }),
  postalCode: z.string().trim().min(4, 'Vul een geldige postcode in.').max(12, 'Controleer de postcode.'),
  city: z.string().trim().min(2, 'Vul je woonplaats in.').max(100),
  budget: z.enum(budgets, { error: 'Kies een geldige budgetindicatie.' }).optional().default(''),
  name: z.string().trim().min(2, 'Vul je naam in.').max(120),
  phone: z.string().trim().min(8, 'Vul een geldig telefoonnummer in.').max(32).regex(/^[+()\d\s.-]+$/, 'Gebruik alleen cijfers, spaties of + ( ) . - voor je telefoonnummer.'),
  email: emailSchema,
  preferredContact: z.enum(['phone', 'email', 'whatsapp'], { error: 'Kies je voorkeursmanier om contact op te nemen.' }),
  contactConsent: z.boolean().refine((value) => value, 'Toestemming om je over deze aanvraag te contacteren is nodig.'),
  website: z.string().max(0, 'Ongeldige aanvraag.').optional().default(''),
  utm: z.record(z.string(), z.string().max(200)).optional().default({}),
  fileName: z.string().max(120).optional().default(''),
  fileType: z.string().max(120).optional().default(''),
  fileSize: z.coerce.number().int().min(0).max(5 * 1024 * 1024).optional().default(0),
  fileData: z.string().max(7_100_000).optional().default(''),
}).superRefine((data, context) => {
  if (data.fileName?.includes('\\')) {
    context.addIssue({ code: 'custom', path: ['fileName'], message: 'De bestandsnaam is ongeldig.' });
  }
  if (data.fileData && !/^[A-Za-z0-9+/]+={0,2}$/.test(data.fileData)) {
    context.addIssue({ code: 'custom', path: ['fileData'], message: 'De toegevoegde afbeelding is niet geldig.' });
  }
  const imageType = ['image/jpeg', 'image/png', 'image/webp'].includes(data.fileType);
  if (data.fileSize > 0 && !imageType) {
    context.addIssue({ code: 'custom', path: ['file'], message: 'Voeg alleen een JPEG-, PNG- of WebP-afbeelding toe.' });
  }
  if (data.fileSize > 0 && !data.fileData) {
    context.addIssue({ code: 'custom', path: ['file'], message: 'De foto kon niet worden verwerkt. Probeer het opnieuw.' });
  }
  if (data.fileData && data.fileData.length > 7_100_000) {
    context.addIssue({ code: 'custom', path: ['file'], message: 'De foto is te groot. De maximale bestandsgrootte is 5 MB.' });
  }
});

export type LeadInput = z.infer<typeof leadSchema>;
