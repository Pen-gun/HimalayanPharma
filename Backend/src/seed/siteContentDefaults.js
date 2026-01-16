export const DEFAULT_HOME_CONTENT = {
  hero: {
    heading: 'Wellness Rooted in Nature - Science-Backed Ayurveda',
    subheading:
      'Herbal, clinically validated formulations inspired by the Himalayas. Trusted by physicians, loved by families.',
    primaryText: 'Explore Products',
    primaryLink: '/products',
    secondaryText: 'Our Story',
    secondaryLink: '/about',
  },
  featured: {
    eyebrow: 'Featured',
    title: 'Flagship formulations for everyday balance',
    subtitle:
      'Curated bestsellers from liver health to stress resilience, crafted with traceable botanicals and rigorous lab validation.',
    ctaText: 'View all products',
    ctaLink: '/products',
    limit: 6,
  },
  about: {
    eyebrow: 'About',
    title: 'Himalayan expertise, global standards',
    subtitle:
      'Our formulations are built on Ayurveda, validated in modern labs, and produced in cGMP facilities with end-to-end traceability.',
    bullets: [
      'Multi-center clinical collaborations across hepatology, metabolic, and immune health.',
      'Chromatography fingerprinting and stability testing for every batch.',
      'Regenerative sourcing with partner farms across the Himalayan belt.',
    ],
    highlights: ['Traceable botanicals', 'Clinically studied', 'Vegan friendly', 'ISO & cGMP'],
    ctaText: 'Learn more',
    ctaLink: '/about',
  },
  stories: {
    eyebrow: 'Stories',
    title: 'From the community',
    subtitle: 'Trusted by clinicians, athletes, parents, and pet lovers who want clean, effective herbal support.',
    loadingText: 'Loading stories...',
  },
  journal: {
    eyebrow: 'Journal',
    title: 'Science, sustainability, and wellness insights',
    subtitle: 'Field notes from our labs and partner farms, plus how to use our products with confidence.',
    ctaText: 'View all articles',
    ctaLink: '/blog',
    limit: 3,
  },
};

export const DEFAULT_SITE_CONTENT = {
  key: 'default',
  home: DEFAULT_HOME_CONTENT,
  testimonials: [
    {
      name: 'Asha Thapa',
      title: 'Holistic Nutritionist',
      quote: 'Clear sourcing and consistent quality make these formulas easy to recommend.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Kiran Joshi',
      title: 'Yoga Coach',
      quote: 'The daily balance line fits perfectly into my clients wellness routines.',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Dr. Meera Rao',
      title: 'Integrative Physician',
      quote: 'Lab validation and transparency are the reasons I trust these products.',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=200&q=80',
    },
  ],
  stats: [
    { label: 'Years of Ayurvedic R&D', value: '35+' },
    { label: 'Clinically Studied Formulas', value: '24' },
    { label: 'Partner Farms', value: '120+' },
    { label: 'Global Markets', value: '90' },
  ],
  scienceHighlights: [
    {
      title: 'Clinical Collaborations',
      description: 'Multi-center studies across metabolic, immune, and liver health.',
    },
    {
      title: 'Standardized Extracts',
      description: 'Marker-compound fingerprinting for every batch.',
    },
    {
      title: 'Sustainable Chemistry',
      description: 'Green extraction methods with reduced solvent use.',
    },
  ],
  commitments: [
    {
      title: 'Regenerative Sourcing',
      description: 'Direct partnerships with Himalayan growers and fair trade practices.',
    },
    {
      title: 'Quality by Design',
      description: 'cGMP facilities and transparent batch documentation.',
    },
    {
      title: 'Low-Impact Packaging',
      description: 'Recyclable materials and reduced-plastic formats.',
    },
  ],
  jobs: [
    {
      title: 'Senior Scientist, Phytochemistry',
      location: 'Bengaluru, India',
      type: 'Full-time',
      summary: 'Lead chromatography method development and stability studies.',
    },
    {
      title: 'Brand Manager, Global Markets',
      location: 'Singapore',
      type: 'Full-time',
      summary: 'Drive launches and clinical storytelling for flagship lines.',
    },
  ],
  contactLocations: [
    {
      office: 'Global HQ',
      address: 'Evergreen Biotech Park, Bengaluru, India',
      phone: '+91 80 1234 5678',
      email: 'hello@himalayanpharma.works',
    },
    {
      office: 'North America',
      address: 'Suite 18, Greenway Innovation Hub, Seattle, USA',
      phone: '+1 206 555 1144',
      email: 'care@himalayanpharma.works',
    },
  ],
  mediaItems: [
    {
      type: 'image',
      title: 'Himalayan Botanicals',
      description: 'Harvest season in the Himalayan belt.',
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80',
      provider: 'Unsplash',
    },
    {
      type: 'image',
      title: 'Lab Validation',
      description: 'Quality testing in our partner labs.',
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
      provider: 'Unsplash',
    },
  ],
};
