import SiteContent from '../models/SiteContent.js';
import { DEFAULT_HOME_CONTENT } from '../seed/siteContentDefaults.js';

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
      const created = await SiteContent.create({ key: 'default', home: DEFAULT_HOME_CONTENT });
      return res.status(200).json({ success: true, data: created });
    }

    const normalizedHome = buildHomePayload(content.home, DEFAULT_HOME_CONTENT);
    if (JSON.stringify(content.home) !== JSON.stringify(normalizedHome)) {
      content.home = normalizedHome;
      await content.save();
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
