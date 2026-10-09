export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  seoTitle: string;
  seoDescription: string;
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: 'badkamer-renovatie',
    title: 'Badkamer plaatsen en renoveren',
    location: 'Projectlocatie niet vermeld',
    category: 'Badkamer & tegelwerk',
    image: '/images/projects/alaina-project-15.webp',
    images: [
      '/images/projects/alaina-project-15.webp',
      '/images/projects/alaina-project-08.webp',
      '/images/projects/alaina-project-02.webp',
      '/images/projects/alaina-project-03.webp',
      '/images/projects/alaina-project-04.webp',
      '/images/projects/alaina-project-13.webp',
    ],
    description: 'Een selectie van projectfoto’s van badkamers, tegelwerk en werkzaamheden tijdens de uitvoering. De beelden tonen verschillende momenten van projecten; geen niet-aangeleverde klantdetails of resultaten worden verondersteld.',
    seoTitle: 'Badkamerprojecten',
    seoDescription: 'Bekijk projectfoto’s van badkamers en tegelwerk van Alaina Bouw. De beelden komen uit het eigen portfolio; klantdetails worden niet verzonnen.',
    placeholder: false,
  },
  {
    slug: 'vloer-en-afwerking',
    title: 'Vloeren en afwerking',
    location: 'Projectlocatie niet vermeld',
    category: 'Laminaat & afwerking',
    image: '/images/projects/alaina-project-06.webp',
    images: [
      '/images/projects/alaina-project-06.webp',
      '/images/projects/alaina-project-05.webp',
      '/images/projects/alaina-project-07.webp',
      '/images/projects/alaina-project-11.webp',
      '/images/projects/alaina-project-01.webp',
    ],
    description: 'Foto’s van vloeren en interieurwerk uit het aangeleverde portfolio. Locaties, klantnamen en de precieze scope zijn niet vermeld.',
    seoTitle: 'Vloeren en afwerking',
    seoDescription: 'Bekijk projectfoto’s van vloeren en afwerking van Alaina Bouw. Locaties en klantdetails staan er bewust niet bij.',
    placeholder: false,
  },
];
