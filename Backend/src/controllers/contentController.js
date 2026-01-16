import SiteContent from '../models/SiteContent.js';

const DEFAULT_HOME_CONTENT = {
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

const normalizeText = (value, fallback) => (typeof value === 'string' ? value : fallback);
const normalizeArray = (value, fallback) =>
  Array.isArray(value)
    ? value
        .filter((item) => typeof item === 'string' && item.trim() !== '')
        .map((item) => item.trim())
    : fallback;
const normalizeLimit = (value, fallback) => (Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback);

const buildHomePayload = (home = {}, fallback = DEFAULT_HOME_CONTENT) => ({
  hero: {
    heading: normalizeText(home?.hero?.heading, fallback.hero.heading),
    subheading: normalizeText(home?.hero?.subheading, fallback.hero.subheading),
    primaryText: normalizeText(home?.hero?.primaryText, fallback.hero.primaryText),
    primaryLink: normalizeText(home?.hero?.primaryLink, fallback.hero.primaryLink),
    secondaryText: normalizeText(home?.hero?.secondaryText, fallback.hero.secondaryText),
    secondaryLink: normalizeText(home?.hero?.secondaryLink, fallback.hero.secondaryLink),
  },
  featured: {
    eyebrow: normalizeText(home?.featured?.eyebrow, fallback.featured.eyebrow),
    title: normalizeText(home?.featured?.title, fallback.featured.title),
    subtitle: normalizeText(home?.featured?.subtitle, fallback.featured.subtitle),
    ctaText: normalizeText(home?.featured?.ctaText, fallback.featured.ctaText),
    ctaLink: normalizeText(home?.featured?.ctaLink, fallback.featured.ctaLink),
    limit: normalizeLimit(home?.featured?.limit, fallback.featured.limit),
  },
  about: {
    eyebrow: normalizeText(home?.about?.eyebrow, fallback.about.eyebrow),
    title: normalizeText(home?.about?.title, fallback.about.title),
    subtitle: normalizeText(home?.about?.subtitle, fallback.about.subtitle),
    bullets: normalizeArray(home?.about?.bullets, fallback.about.bullets),
    highlights: normalizeArray(home?.about?.highlights, fallback.about.highlights),
    ctaText: normalizeText(home?.about?.ctaText, fallback.about.ctaText),
    ctaLink: normalizeText(home?.about?.ctaLink, fallback.about.ctaLink),
  },
  stories: {
    eyebrow: normalizeText(home?.stories?.eyebrow, fallback.stories.eyebrow),
    title: normalizeText(home?.stories?.title, fallback.stories.title),
    subtitle: normalizeText(home?.stories?.subtitle, fallback.stories.subtitle),
    loadingText: normalizeText(home?.stories?.loadingText, fallback.stories.loadingText),
  },
  journal: {
    eyebrow: normalizeText(home?.journal?.eyebrow, fallback.journal.eyebrow),
    title: normalizeText(home?.journal?.title, fallback.journal.title),
    subtitle: normalizeText(home?.journal?.subtitle, fallback.journal.subtitle),
    ctaText: normalizeText(home?.journal?.ctaText, fallback.journal.ctaText),
    ctaLink: normalizeText(home?.journal?.ctaLink, fallback.journal.ctaLink),
    limit: normalizeLimit(home?.journal?.limit, fallback.journal.limit),
  },
});

export const getContent = async (req, res, next) => {
  try {
    const content = await SiteContent.findOne({ key: 'default' });

    if (!content) {
      const created = await SiteContent.create({ key: 'default' });
      return res.status(200).json({ success: true, data: created });
    }

    return res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const upsertContent = async (req, res, next) => {
  try {
    const payload = req.body || {};
    const existing = await SiteContent.findOne({ key: 'default' });
    const fallbackHome = existing?.home || DEFAULT_HOME_CONTENT;
    const home = buildHomePayload(payload.home, fallbackHome);

    const content = await SiteContent.findOneAndUpdate(
      { key: 'default' },
      {
        key: 'default',
        testimonials: Array.isArray(payload.testimonials) ? payload.testimonials : [],
        stats: Array.isArray(payload.stats) ? payload.stats : [],
        scienceHighlights: Array.isArray(payload.scienceHighlights) ? payload.scienceHighlights : [],
        commitments: Array.isArray(payload.commitments) ? payload.commitments : [],
        jobs: Array.isArray(payload.jobs) ? payload.jobs : [],
        contactLocations: Array.isArray(payload.contactLocations) ? payload.contactLocations : [],
        mediaItems: Array.isArray(payload.mediaItems) ? payload.mediaItems : [],
        home,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Content updated', data: content });
  } catch (error) {
    next(error);
  }
};
