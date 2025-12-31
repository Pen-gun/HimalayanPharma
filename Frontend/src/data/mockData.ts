// Static content for pages (not fetched from API)
// Products and Blogs are now loaded from the real API via hooks

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
};

// Static data for pages
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Anika Sharma",
    title: "Marathoner & Working Mom",
    quote: "Ashwagandha+ Restore helped me balance training stress and sleep during peak season.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t2",
    name: "Rahul Mehta",
    title: "Founder, PetWell Clinic",
    quote: "Our clients love the herbal coat serum—clean label and visible shine in weeks.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "t3",
    name: "Dr. Sophia Lin",
    title: "Integrative Physician",
    quote: "Traceable supply chains and rigorous standardization make these formulas clinic-ready.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
  },
];

export const stats = [
  { label: "Years of Ayurvedic R&D", value: "35+" },
  { label: "Clinically Studied Formulas", value: "24" },
  { label: "Partner Farms", value: "120+" },
  { label: "Global Markets", value: "90" },
];

export const scienceHighlights = [
  {
    title: "Clinical Collaborations",
    description: "Multi-center studies with leading institutes on hepatic, metabolic, and immune health.",
  },
  {
    title: "Standardized Extracts",
    description: "Each batch fingerprinted for marker compounds using HPLC and LC-MS.",
  },
  {
    title: "Sustainable Chemistry",
    description: "Green extraction with reduced solvents and circular water systems in our labs.",
  },
];

export const commitments = [
  {
    title: "Regenerative Sourcing",
    description: "Direct trade with Himalayan growers, soil stewardship, and biodiversity protection.",
  },
  {
    title: "Quality by Design",
    description: "cGMP facilities, pharmacopeial standards, and transparent batch COAs.",
  },
  {
    title: "Low-Impact Packaging",
    description: "Recyclable amber glass, FSC-certified cartons, and refill-ready formats.",
  },
  {
    title: "Community Health",
    description: "Rural clinics, women's health camps, and herb farmer training initiatives.",
  },
];

export const jobs: Job[] = [
  {
    id: "job-rd",
    title: "Senior Scientist, Phytochemistry",
    location: "Bengaluru, India",
    type: "Full-time",
    summary: "Lead chromatography method development and stability studies for new herbal actives.",
  },
  {
    id: "job-brand",
    title: "Brand Manager, Global Markets",
    location: "Singapore",
    type: "Full-time",
    summary: "Shape omnichannel launches and clinical storytelling for flagship lines.",
  },
  {
    id: "job-sustain",
    title: "Sustainability Program Lead",
    location: "Dehradun, India",
    type: "Contract",
    summary: "Drive regenerative agriculture pilots and measure scope 3 emissions reductions.",
  },
];

export const contactLocations = [
  {
    office: "Global HQ",
    address: "Evergreen Biotech Park, Bengaluru, India",
    phone: "+91 80 1234 5678",
    email: "hello@himalayanpharma.works",
  },
  {
    office: "North America",
    address: "Suite 18, Greenway Innovation Hub, Seattle, USA",
    phone: "+1 206 555 1144",
    email: "care@himalayanpharma.works",
  },
];
