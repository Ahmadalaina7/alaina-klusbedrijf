export type Service = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  short: string;
  description: string;
  detail: string;
  icon: string;
  tag: string;
  image?: string;
  placeholder: boolean;
};

export const services: Service[] = [
  {
    slug: "stukadoor",
    title: "Stukadoor",
    seoTitle: "Stukadoor voor wanden en plafonds",
    seoDescription: "Laat wanden en plafonds stukadoren door Alaina Bouw. Bespreek de ondergrond en de afwerking, zodat je weet wat er nodig is voor een strak resultaat.",
    image: "/images/projects/alaina-project-09.webp",
    eyebrow: "Gladde wanden en plafonds",
    short: "Laat wanden of plafonds stukadoren als voorbereiding op een strakke afwerking.",
    description: "Stukadoorswerk begint met de bestaande ondergrond en de gewenste afwerking. Beschrijf om welke ruimte het gaat en waar je de wanden of plafonds voor wilt voorbereiden.",
    detail: "De benodigde voorbereiding en de mogelijke afwerking hangen af van de ondergrond en de ruimte. De eigenaar stemt vooraf met je af welk stukadoorswerk wordt uitgevoerd en wat de vervolgbehandeling vraagt.",
    icon: "▤",
    tag: "Wanden & plafonds",
    placeholder: false,
  },
  {
    slug: "schilderwerk",
    title: "Schilderwerk",
    seoTitle: "Schilderwerk binnen en buiten",
    seoDescription: "Schilderwerk voor binnen en buiten door Alaina Bouw. Bespreek de ondergrond, de kleur en welke oppervlakken je wilt laten schilderen.",
    image: "/images/projects/alaina-project-09.webp",
    eyebrow: "Een verzorgde uitstraling",
    short: "Bespreek schilderwerk voor binnen of buiten en de afwerking die bij jouw woning past.",
    description: "Goed schilderwerk vraagt aandacht voor de ondergrond, de voorbereiding en de gewenste kleur en afwerking. Vertel welke oppervlakken je wilt laten schilderen.",
    detail: "Het schilderwerk, de staat van de ondergrond en eventuele voorbereidende werkzaamheden worden per klus bekeken. Kleur, materialen, binnen- of buitenschilderwerk en de afgesproken scope worden vooraf besproken.",
    icon: "◩",
    tag: "Binnen & buiten",
    placeholder: false,
  },
  {
    slug: "tuinieren",
    title: "Tuinieren",
    seoTitle: "Tuinieren en tuinonderhoud",
    seoDescription: "Tuinwerk en onderhoud door Alaina Bouw. Bespreek of het gaat om aanleg, een aanpassing of het bijhouden van je buitenruimte.",
    eyebrow: "Ruimte om buiten te genieten",
    short: "Bespreek tuinwerk en onderhoud dat jouw buitenruimte weer een frisse start geeft.",
    description: "Iedere tuin is anders. Beschrijf hoe je tuin er nu bij ligt, wat je wilt laten doen en of het gaat om aanleg, een aanpassing of onderhoud.",
    detail: "Welke tuinwerkzaamheden beschikbaar en passend zijn hangt af van de tuin, het seizoen, materiaal en de omvang van de klus. Bespreek eventuele afvoer, beplanting en onderhoud vooraf met de eigenaar.",
    icon: "❋",
    tag: "Buitenruimte & onderhoud",
    placeholder: false,
  },
  {
    slug: "badkamer-plaatsen-renoveren",
    title: "Badkamer plaatsen of renoveren",
    seoTitle: "Badkamer plaatsen of renoveren",
    seoDescription: "Een badkamer plaatsen of renoveren met Alaina Bouw. Bespreek de indeling, het tegelwerk en de afwerking die bij jouw ruimte past.",
    image: "/images/projects/alaina-project-15.webp",
    eyebrow: "Een badkamer die bij je past",
    short: "Bespreek het plaatsen of renoveren van een badkamer, van indeling tot tegelwerk en afwerking.",
    description: "Een badkamer plaatsen of renoveren begint met de bestaande situatie, de gewenste indeling en de onderdelen die je wilt vernieuwen. Vertel wat je voor ogen hebt en welke keuzes nog openstaan.",
    detail: "Werkzaamheden aan een badkamer verschillen per ruimte en gewenste aanpak. Bespreek vooraf de indeling, tegelwerk, sanitair, leidingwerk, ventilatie, waterdichting, materialen en eventuele inzet van andere vakmensen. De eigenaar bevestigt welke onderdelen en verantwoordelijkheden in de afgesproken scope vallen.",
    icon: "▥",
    tag: "Badkamer & tegelwerk",
    placeholder: false,
  },
  {
    slug: "tegelen",
    title: "Tegelen",
    seoTitle: "Tegelen van wand en vloer",
    seoDescription: "Wand- en vloertegels laten zetten door Alaina Bouw. Bespreek de ondergrond, het formaat, het patroon en de afwerking van de ruimte.",
    image: "/images/projects/alaina-project-15.webp",
    eyebrow: "Een mooie basis voor elke ruimte",
    short: "Laat een vloer of wand betegelen en stem formaat, patroon en afwerking vooraf af.",
    description: "Tegelwerk begint met de staat van de ondergrond en de keuzes voor materiaal en patroon. Geef bij je aanvraag aan om welke ruimte en oppervlakken het gaat.",
    detail: "Voorbereiding van de ondergrond, snijwerk, voegkleur, tegelkeuze en eventuele waterdichte afwerking worden per ruimte besproken. De eigenaar bevestigt vooraf welke werkzaamheden worden opgenomen.",
    icon: "▦",
    tag: "Wand & vloer",
    placeholder: false,
  },
  {
    slug: "laminaat",
    title: "Laminaat leggen",
    seoTitle: "Laminaat laten leggen",
    seoDescription: "Laminaat laten leggen door Alaina Bouw. We bespreken de ondervloer, de plinten en de afwerking van de ruimte die je wilt aanpakken.",
    image: "/images/projects/alaina-project-06.webp",
    eyebrow: "Een nieuwe vloer met karakter",
    short: "Bespreek het leggen van een laminaatvloer, inclusief de voorbereiding van de ruimte.",
    description: "Een laminaatvloer leggen vraagt om een passende basis, zorgvuldige plaatsing en afwerking bij randen en overgangen. Vertel welke ruimte je wilt aanpakken.",
    detail: "De staat van de vloer, ondervloer, materiaal, plinten en eventuele bestaande vloerbedekking worden vooraf besproken. De eigenaar stemt met je af wat bij de specifieke ruimte is inbegrepen.",
    icon: "▧",
    tag: "Vloeren & afwerking",
    placeholder: false,
  },
];
