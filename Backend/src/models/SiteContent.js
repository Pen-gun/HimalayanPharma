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

const SiteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'default' },
    testimonials: { type: [TestimonialSchema], default: [] },
    stats: { type: [StatSchema], default: [] },
    scienceHighlights: { type: [HighlightSchema], default: [] },
    commitments: { type: [HighlightSchema], default: [] },
    jobs: { type: [JobSchema], default: [] },
    contactLocations: { type: [ContactLocationSchema], default: [] },
  },
  { timestamps: true }
);

const SiteContent = mongoose.model('SiteContent', SiteContentSchema);

export default SiteContent;
