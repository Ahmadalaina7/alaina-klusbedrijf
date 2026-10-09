import { site } from '@/content/site';

export const faqs = [
  {
    question: 'Welke werkzaamheden voert Alaina Bouw uit?',
    answer: 'Alaina Bouw biedt stukadoorswerk, schilderwerk, tuinieren, badkamers plaatsen of renoveren, tegelen en laminaat leggen. Welke werkzaamheden bij je klus passen, bespreekt Alaina Bouw persoonlijk.',
  },
  {
    question: 'In welke plaatsen is Alaina Bouw actief?',
    answer: site.isPlaceholder.serviceArea
      ? 'Het werkgebied is nog niet door de eigenaar opgegeven. Stuur je plaats of postcode mee; dan kan Alaina Bouw laten weten of de klus past.'
      : `Alaina Bouw werkt in ${site.serviceArea}. Stuur je plaats of postcode mee; dan kan Alaina Bouw laten weten of de klus past.`,
  },
  {
    question: 'Kan ik vrijblijvend een offerte aanvragen?',
    answer: 'Je kunt je plannen beschrijven via het aanvraagformulier. De inhoud, eventuele opname en vervolgstappen worden daarna met je afgestemd.',
  },
  {
    question: 'Moet ik al precies weten wat er moet gebeuren?',
    answer: 'Nee. Een eerste omschrijving van je wens en de situatie is genoeg om je aanvraag te starten. Foto’s zijn optioneel.',
  },
  {
    question: 'Wanneer kan mijn klus beginnen?',
    answer: 'Beschikbaarheid en planning zijn afhankelijk van de klus en de actuele agenda. Een concrete startdatum wordt pas na overleg bevestigd.',
  },
  {
    question: 'Zijn foto’s verplicht bij een aanvraag?',
    answer: 'Nee, foto’s toevoegen is optioneel. Ze kunnen wel helpen om de situatie alvast beter te begrijpen.',
  },
];
