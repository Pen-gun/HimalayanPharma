export type Product = {
  id: string;
  name: string;
  category: string;
  price?: string;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  tags?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  content: string;
};

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

export const productCategories = [
  "All",
  "Pharmaceuticals",
  "Personal Care",
  "Baby Care",
  "Men's Health",
  "Women's Health",
  "Animal Health",
];

export const products: Product[] = [
  {
    id: "liv52",
    name: "Liv.52 DS",
    category: "Pharmaceuticals",
    price: "$18",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Clinically studied liver support formula.",
    description: "Our flagship hepatoprotective blend supports healthy liver enzymes and metabolism with a dual approach of herbs and modern science.",
    benefits: ["Supports liver function", "Backed by clinical studies", "Helps detox pathways"],
    ingredients: ["Capers", "Chicory", "Arjuna", "Black Nightshade"],
    usage: "2 tablets twice daily after meals or as directed by a physician.",
    tags: ["Clinically tested", "Vegan"],
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha+ Restore",
    category: "Pharmaceuticals",
    price: "$16",
    image: "https://images.unsplash.com/photo-1580281657521-6e022f36c1c9?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Stress resilience and restful sleep support.",
    description: "A potent KSM-66 grade ashwagandha root extract paired with pippali for enhanced absorption and adaptogenic balance.",
    benefits: ["Supports cortisol balance", "Promotes calm focus", "Aids restorative sleep"],
    ingredients: ["Ashwagandha Root Extract", "Pippali", "Ginger"],
    usage: "1 capsule twice daily with water.",
    tags: ["Adaptogen", "Non-drowsy"],
  },
  {
    id: "neem-wash",
    name: "Neem Purify Face Wash",
    category: "Personal Care",
    price: "$9",
    image: "https://images.unsplash.com/photo-1601049313729-4726c0c8c08b?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Soap-free cleanser with neem and turmeric.",
    description: "Balances oil, purifies pores, and soothes skin with neem, turmeric, and vetiver for daily clarity.",
    benefits: ["Purifies without stripping", "Supports clear skin", "Cooling botanical base"],
    ingredients: ["Neem", "Turmeric", "Vetiver", "Aloe"],
    usage: "Massage onto damp skin and rinse. Use twice daily.",
    tags: ["Dermatologist tested", "Sulfate-free"],
  },
  {
    id: "rumalaya-gel",
    name: "Rumalaya Relief Gel",
    category: "Pharmaceuticals",
    price: "$12",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Fast-absorbing gel for joints and muscles.",
    description: "Cooling menthol with boswellia and guggulu to comfort stiff joints and overworked muscles.",
    benefits: ["Fast soothing sensation", "Herbal anti-inflammatory support", "Non-greasy finish"],
    ingredients: ["Boswellia", "Guggulu", "Menthol", "Ginger"],
    usage: "Apply to affected area 2-3 times daily.",
    tags: ["Topical", "Paraben-free"],
  },
  {
    id: "koflet",
    name: "Koflet Herbal Lozenges",
    category: "Pharmaceuticals",
    price: "$7",
    image: "https://images.unsplash.com/photo-1587854692152-1c3894ea3c1c?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Soothing lozenges with tulsi and honey.",
    description: "Comforts the throat with licorice, tulsi, and honey in a naturally sweet base.",
    benefits: ["Eases throat irritation", "Tastes pleasant", "Travel-friendly"],
    ingredients: ["Tulsi", "Licorice", "Honey", "Clove"],
    usage: "Dissolve 1 lozenge slowly 3-4 times daily.",
  },
  {
    id: "baby-oil",
    name: "Gentle Baby Massage Oil",
    category: "Baby Care",
    price: "$14",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Lightweight blend with olive and winter cherry.",
    description: "Nurtures infant skin barrier with cold-pressed oils and calming herbs, perfect for daily massage rituals.",
    benefits: ["Supports skin barrier", "Easily absorbed", "Dermatologically tested"],
    ingredients: ["Olive Oil", "Winter Cherry", "Licorice", "Aloe"],
    usage: "Warm a small amount and massage gently before bath or bedtime.",
  },
  {
    id: "baby-bath",
    name: "Soft Suds Baby Bath",
    category: "Baby Care",
    price: "$10",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Tear-free head-to-toe cleanser.",
    description: "pH-balanced mild surfactants with chickpea and fenugreek to cleanse without dryness.",
    benefits: ["Tear-free formula", "Maintains natural oils", "Hypoallergenic"],
    ingredients: ["Chickpea", "Fenugreek", "Aloe", "Green Gram"],
    usage: "Add to bath water or apply directly, rinse well.",
  },
  {
    id: "cystone",
    name: "Cystone Kidney Support",
    category: "Pharmaceuticals",
    price: "$19",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Supports urinary tract balance.",
    description: "Shilapushpa and pasanabheda support urinary tract comfort and balanced mineral levels.",
    benefits: ["Supports kidney health", "Herbal urinary comfort", "Non-GMO"],
    ingredients: ["Shilapushpa", "Pasanabheda", "Saxifraga", "Cyperus"],
    usage: "2 tablets twice daily with meals.",
  },
  {
    id: "shatavari",
    name: "Shatavari Women's Balance",
    category: "Women's Health",
    price: "$15",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Hormonal harmony and vitality support.",
    description: "Traditional tonic for women's wellness to support hormonal balance and natural vitality.",
    benefits: ["Supports hormonal balance", "Cooling and nourishing", "Plant-based capsules"],
    ingredients: ["Shatavari Root", "Guduchi", "Cardamom"],
    usage: "1 capsule twice daily after meals.",
  },
  {
    id: "mens-mult",
    name: "Men's Vitality Tonic",
    category: "Men's Health",
    price: "$21",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Ashwagandha, gokshura, and minerals for stamina.",
    description: "Energy and endurance support crafted with adaptogens, trace minerals, and antioxidant herbs.",
    benefits: ["Stamina and performance", "Supports recovery", "Sugar-free"],
    ingredients: ["Ashwagandha", "Gokshura", "Mucuna", "Zinc"],
    usage: "1-2 tablets daily with food.",
  },
  {
    id: "animal-care",
    name: "Companion Coat Care",
    category: "Animal Health",
    price: "$13",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Ayurvedic shine serum for pets.",
    description: "Neem, coconut, and aloe base to support coat shine and skin comfort for companion animals.",
    benefits: ["Adds shine", "Soothes skin", "Natural fragrance"],
    ingredients: ["Neem", "Coconut Oil", "Aloe", "Vetiver"],
    usage: "Apply a few drops along coat and brush through weekly.",
  },
  {
    id: "herbal-tea",
    name: "Stress Relief Herbal Tea",
    category: "Pharmaceuticals",
    price: "$11",
    image: "https://images.unsplash.com/photo-1507915135761-41a0a222c709?auto=format&fit=crop&w=900&q=80",
    shortDescription: "Tulsi, brahmi, and lemongrass infusion.",
    description: "A calming daily tea with adaptogens and aromatic herbs to restore balance after long days.",
    benefits: ["Calms the senses", "Caffeine-free", "Antioxidant rich"],
    ingredients: ["Tulsi", "Brahmi", "Lemongrass", "Licorice"],
    usage: "Steep 1 bag for 5 minutes in hot water. Enjoy warm.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "science-of-ashwagandha",
    title: "The Science of Ashwagandha: Adaptogens Explained",
    excerpt: "How adaptogens help the body respond to stress through the HPA axis.",
    category: "Science",
    image: "https://images.unsplash.com/photo-1508387024700-9fe5c0b36c70?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "Nov 18, 2025",
    content:
      "We explore peer-reviewed findings on ashwagandha's effects on stress pathways, sleep quality, and cortisol balance, plus how we standardize our extracts for consistent potency.",
  },
  {
    id: "sustainability-himalayas",
    title: "Sourcing with Respect: Sustainability in the Himalayas",
    excerpt: "Partnering with local growers and regenerative farms across the Himalayan belt.",
    category: "Commitments",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "Oct 02, 2025",
    content:
      "Our sourcing charter focuses on soil health, fair trade practices, and traceability. Learn how our botanicals are mapped from seed to shelf with transparent audits.",
  },
  {
    id: "future-of-phytotherapy",
    title: "Phytotherapy & Modern Labs: What's Next",
    excerpt: "Where traditional knowledge meets chromatography, genomics, and AI-led discovery.",
    category: "R&D",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8f?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "Sep 10, 2025",
    content:
      "Dive into our lab pipelines, from fingerprinting botanicals to stability testing and multi-center clinical collaborations that shape our upcoming launches.",
  },
];

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
