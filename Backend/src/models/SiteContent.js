import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    quote: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { _id: false }
);

const StatSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const HighlightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { _id: false }
);

const ContactLocationSchema = new mongoose.Schema(
  {
    office: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false }
);

const MediaItemSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ['image', 'video', 'audio'] },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    provider: { type: String, default: '' },
  },
  { _id: false }
);

const HomeHeroSchema = new mongoose.Schema(
  {
    heading: { type: String, default: 'Wellness Rooted in Nature - Science-Backed Ayurveda' },
    subheading: {
      type: String,
      default:
        'Herbal, clinically validated formulations inspired by the Himalayas. Trusted by physicians, loved by families.',
    },
    primaryText: { type: String, default: 'Explore Products' },
    primaryLink: { type: String, default: '/products' },
    secondaryText: { type: String, default: 'Our Story' },
    secondaryLink: { type: String, default: '/about' },
  },
  { _id: false }
);

const HomeFeaturedSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'Featured' },
    title: { type: String, default: 'Flagship formulations for everyday balance' },
    subtitle: {
      type: String,
      default:
        'Curated bestsellers from liver health to stress resilience, crafted with traceable botanicals and rigorous lab validation.',
    },
    ctaText: { type: String, default: 'View all products' },
    ctaLink: { type: String, default: '/products' },
    limit: { type: Number, default: 6 },
  },
  { _id: false }
);

const HomeAboutSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'About' },
    title: { type: String, default: 'Himalayan expertise, global standards' },
    subtitle: {
      type: String,
      default:
        'Our formulations are built on Ayurveda, validated in modern labs, and produced in cGMP facilities with end-to-end traceability.',
    },
    bullets: {
      type: [String],
      default: [
        'Multi-center clinical collaborations across hepatology, metabolic, and immune health.',
        'Chromatography fingerprinting and stability testing for every batch.',
        'Regenerative sourcing with partner farms across the Himalayan belt.',
      ],
    },
    highlights: { type: [String], default: ['Traceable botanicals', 'Clinically studied', 'Vegan friendly', 'ISO & cGMP'] },
    ctaText: { type: String, default: 'Learn more' },
    ctaLink: { type: String, default: '/about' },
  },
  { _id: false }
);

const HomeStoriesSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'Stories' },
    title: { type: String, default: 'From the community' },
    subtitle: {
      type: String,
      default: 'Trusted by clinicians, athletes, parents, and pet lovers who want clean, effective herbal support.',
    },
    loadingText: { type: String, default: 'Loading stories...' },
  },
  { _id: false }
);

const HomeJournalSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: 'Journal' },
    title: { type: String, default: 'Science, sustainability, and wellness insights' },
    subtitle: {
      type: String,
      default:
        'Field notes from our labs and partner farms, plus how to use our products with confidence.',
    },
    ctaText: { type: String, default: 'View all articles' },
    ctaLink: { type: String, default: '/blog' },
    limit: { type: Number, default: 3 },
  },
  { _id: false }
);

const HomeContentSchema = new mongoose.Schema(
  {
    hero: { type: HomeHeroSchema, default: () => ({}) },
    featured: { type: HomeFeaturedSchema, default: () => ({}) },
    about: { type: HomeAboutSchema, default: () => ({}) },
    stories: { type: HomeStoriesSchema, default: () => ({}) },
    journal: { type: HomeJournalSchema, default: () => ({}) },
  },
  { _id: false }
);

const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'default' },
    testimonials: { type: [TestimonialSchema], default: [] },
    stats: { type: [StatSchema], default: [] },
    scienceHighlights: { type: [HighlightSchema], default: [] },
    commitments: { type: [HighlightSchema], default: [] },
    jobs: { type: [JobSchema], default: [] },
    contactLocations: { type: [ContactLocationSchema], default: [] },
    mediaItems: { type: [MediaItemSchema], default: [] },
    home: { type: HomeContentSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const SiteContent = mongoose.model('SiteContent', SiteContentSchema);

export default SiteContent;
