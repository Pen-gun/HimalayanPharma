import SiteContent from '../models/SiteContent.js';

// Default content used to auto-seed the first document (mirrors previous mock data)
const defaultContent = {
  testimonials: [
    {
      name: 'Anika Sharma',
      title: 'Marathoner & Working Mom',
      quote: 'Ashwagandha+ Restore helped me balance training stress and sleep during peak season.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Rahul Mehta',
      title: 'Founder, PetWell Clinic',
      quote: 'Our clients love the herbal coat serum—clean label and visible shine in weeks.',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Dr. Sophia Lin',
      title: 'Integrative Physician',
      quote: 'Traceable supply chains and rigorous standardization make these formulas clinic-ready.',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80',
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
      description: 'Multi-center studies with leading institutes on hepatic, metabolic, and immune health.',
    },
    {
      title: 'Standardized Extracts',
      description: 'Each batch fingerprinted for marker compounds using HPLC and LC-MS.',
    },
    {
      title: 'Sustainable Chemistry',
      description: 'Green extraction with reduced solvents and circular water systems in our labs.',
    },
  ],
  commitments: [
    {
      title: 'Regenerative Sourcing',
      description: 'Direct trade with Himalayan growers, soil stewardship, and biodiversity protection.',
    },
    {
      title: 'Quality by Design',
      description: 'cGMP facilities, pharmacopeial standards, and transparent batch COAs.',
    },
    {
      title: 'Low-Impact Packaging',
      description: 'Recyclable amber glass, FSC-certified cartons, and refill-ready formats.',
    },
    {
      title: 'Community Health',
      description: "Rural clinics, women's health camps, and herb farmer training initiatives.",
    },
  ],
  jobs: [
    {
      title: 'Senior Scientist, Phytochemistry',
      location: 'Bengaluru, India',
      type: 'Full-time',
      summary: 'Lead chromatography method development and stability studies for new herbal actives.',
    },
    {
      title: 'Brand Manager, Global Markets',
      location: 'Singapore',
      type: 'Full-time',
      summary: 'Shape omnichannel launches and clinical storytelling for flagship lines.',
    },
    {
      title: 'Sustainability Program Lead',
      location: 'Dehradun, India',
      type: 'Contract',
      summary: 'Drive regenerative agriculture pilots and measure scope 3 emissions reductions.',
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
};

export const getContent = async (req, res, next) => {
  try {
    let content = await SiteContent.findOne({ key: 'default' });

    if (!content) {
      content = await SiteContent.create({ key: 'default', ...defaultContent });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const upsertContent = async (req, res, next) => {
  try {
    const payload = req.body || {};

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
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Content updated', data: content });
  } catch (error) {
    next(error);
  }
};
