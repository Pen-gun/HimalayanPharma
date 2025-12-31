import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

dotenv.config({ path: './.env.local' });

const connectToDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/himalayanpharma';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const categories = [
  { name: 'Pharmaceuticals', description: 'Clinically studied herbal formulas' },
  { name: 'Personal Care', description: 'Natural skincare and beauty products' },
  { name: 'Baby Care', description: 'Gentle care for infants and toddlers' },
  { name: "Men's Health", description: 'Vitality and stamina support' },
  { name: "Women's Health", description: 'Hormonal balance and wellness' },
  { name: 'Animal Health', description: 'Pet wellness solutions' },
];

const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await User.deleteMany({});

    console.log('🧹 Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✓ Created ${createdCategories.length} categories`);

    // Create products
    const pharmaceuticals = createdCategories.find(c => c.name === 'Pharmaceuticals')._id;
    const personalCare = createdCategories.find(c => c.name === 'Personal Care')._id;
    const babyCare = createdCategories.find(c => c.name === 'Baby Care')._id;
    const mensHealth = createdCategories.find(c => c.name === "Men's Health")._id;
    const womensHealth = createdCategories.find(c => c.name === "Women's Health")._id;
    const animalHealth = createdCategories.find(c => c.name === 'Animal Health')._id;

    const products = [
      {
        name: 'Liv.52 DS',
        category: pharmaceuticals,
        price: '$18',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Clinically studied liver support formula.',
        description: 'Our flagship hepatoprotective blend supports healthy liver enzymes and metabolism with a dual approach of herbs and modern science.',
        benefits: ['Supports liver function', 'Backed by clinical studies', 'Helps detox pathways'],
        ingredients: ['Capers', 'Chicory', 'Arjuna', 'Black Nightshade'],
        usage: '2 tablets twice daily after meals or as directed by a physician.',
        tags: ['Clinically tested', 'Vegan'],
        featured: true,
      },
      {
        name: 'Ashwagandha+ Restore',
        category: pharmaceuticals,
        price: '$16',
        image: 'https://images.unsplash.com/photo-1580281657521-6e022f36c1c9?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Stress resilience and restful sleep support.',
        description: 'A potent KSM-66 grade ashwagandha root extract paired with pippali for enhanced absorption and adaptogenic balance.',
        benefits: ['Supports cortisol balance', 'Promotes calm focus', 'Aids restorative sleep'],
        ingredients: ['Ashwagandha Root Extract', 'Pippali', 'Ginger'],
        usage: '1 capsule twice daily with water.',
        tags: ['Adaptogen', 'Non-drowsy'],
        featured: true,
      },
      {
        name: 'Neem Purify Face Wash',
        category: personalCare,
        price: '$9',
        image: 'https://images.unsplash.com/photo-1601049313729-4726c0c8c08b?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Soap-free cleanser with neem and turmeric.',
        description: 'Balances oil, purifies pores, and soothes skin with neem, turmeric, and vetiver for daily clarity.',
        benefits: ['Purifies without stripping', 'Supports clear skin', 'Cooling botanical base'],
        ingredients: ['Neem', 'Turmeric', 'Vetiver', 'Aloe'],
        usage: 'Massage onto damp skin and rinse. Use twice daily.',
        tags: ['Dermatologist tested', 'Sulfate-free'],
        featured: true,
      },
      {
        name: 'Rumalaya Relief Gel',
        category: pharmaceuticals,
        price: '$12',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Fast-absorbing gel for joints and muscles.',
        description: 'Cooling menthol with boswellia and guggulu to comfort stiff joints and overworked muscles.',
        benefits: ['Fast soothing sensation', 'Herbal anti-inflammatory support', 'Non-greasy finish'],
        ingredients: ['Boswellia', 'Guggulu', 'Menthol', 'Ginger'],
        usage: 'Apply to affected area 2-3 times daily.',
        tags: ['Topical', 'Paraben-free'],
        featured: false,
      },
      {
        name: 'Koflet Herbal Lozenges',
        category: pharmaceuticals,
        price: '$7',
        image: 'https://images.unsplash.com/photo-1587854692152-1c3894ea3c1c?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Soothing lozenges with tulsi and honey.',
        description: 'Comforts the throat with licorice, tulsi, and honey in a naturally sweet base.',
        benefits: ['Eases throat irritation', 'Tastes pleasant', 'Travel-friendly'],
        ingredients: ['Tulsi', 'Licorice', 'Honey', 'Clove'],
        usage: 'Dissolve 1 lozenge slowly 3-4 times daily.',
        tags: ['Natural', 'Convenient'],
        featured: false,
      },
      {
        name: 'Gentle Baby Massage Oil',
        category: babyCare,
        price: '$14',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Lightweight blend with olive and winter cherry.',
        description: 'Nurtures infant skin barrier with cold-pressed oils and calming herbs, perfect for daily massage rituals.',
        benefits: ['Supports skin barrier', 'Easily absorbed', 'Dermatologically tested'],
        ingredients: ['Olive Oil', 'Winter Cherry', 'Licorice', 'Aloe'],
        usage: 'Warm a small amount and massage gently before bath or bedtime.',
        tags: ['Gentle', 'Hypoallergenic'],
        featured: true,
      },
      {
        name: 'Soft Suds Baby Bath',
        category: babyCare,
        price: '$10',
        image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Tear-free head-to-toe cleanser.',
        description: 'pH-balanced mild surfactants with chickpea and fenugreek to cleanse without dryness.',
        benefits: ['Tear-free formula', 'Maintains natural oils', 'Hypoallergenic'],
        ingredients: ['Chickpea', 'Fenugreek', 'Aloe', 'Green Gram'],
        usage: 'Add to bath water or apply directly, rinse well.',
        tags: ['Tear-free', 'Mild'],
        featured: false,
      },
      {
        name: 'Cystone Kidney Support',
        category: pharmaceuticals,
        price: '$19',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Supports urinary tract balance.',
        description: 'Shilapushpa and pasanabheda support urinary tract comfort and balanced mineral levels.',
        benefits: ['Supports kidney health', 'Herbal urinary comfort', 'Non-GMO'],
        ingredients: ['Shilapushpa', 'Pasanabheda', 'Saxifraga', 'Cyperus'],
        usage: '2 tablets twice daily with meals.',
        tags: ['Clinically tested', 'Non-GMO'],
        featured: false,
      },
      {
        name: 'Shatavari Women\'s Balance',
        category: womensHealth,
        price: '$15',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Hormonal harmony and vitality support.',
        description: 'Traditional tonic for women\'s wellness to support hormonal balance and natural vitality.',
        benefits: ['Supports hormonal balance', 'Cooling and nourishing', 'Plant-based capsules'],
        ingredients: ['Shatavari Root', 'Guduchi', 'Cardamom'],
        usage: '1 capsule twice daily after meals.',
        tags: ['Women-focused', 'Adaptogenic'],
        featured: true,
      },
      {
        name: 'Men\'s Vitality Tonic',
        category: mensHealth,
        price: '$21',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Ashwagandha, gokshura, and minerals for stamina.',
        description: 'Energy and endurance support crafted with adaptogens, trace minerals, and antioxidant herbs.',
        benefits: ['Stamina and performance', 'Supports recovery', 'Sugar-free'],
        ingredients: ['Ashwagandha', 'Gokshura', 'Mucuna', 'Zinc'],
        usage: '1-2 tablets daily with food.',
        tags: ['Men-focused', 'Energy boost'],
        featured: true,
      },
      {
        name: 'Companion Coat Care',
        category: animalHealth,
        price: '$13',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Ayurvedic shine serum for pets.',
        description: 'Neem, coconut, and aloe base to support coat shine and skin comfort for companion animals.',
        benefits: ['Adds shine', 'Soothes skin', 'Natural fragrance'],
        ingredients: ['Neem', 'Coconut Oil', 'Aloe', 'Vetiver'],
        usage: 'Apply a few drops along coat and brush through weekly.',
        tags: ['Pet-safe', 'Natural'],
        featured: false,
      },
      {
        name: 'Stress Relief Herbal Tea',
        category: pharmaceuticals,
        price: '$11',
        image: 'https://images.unsplash.com/photo-1507915135761-41a0a222c709?auto=format&fit=crop&w=900&q=80',
        shortDescription: 'Tulsi, brahmi, and lemongrass infusion.',
        description: 'A calming daily tea with adaptogens and aromatic herbs to restore balance after long days.',
        benefits: ['Calms the senses', 'Caffeine-free', 'Antioxidant rich'],
        ingredients: ['Tulsi', 'Brahmi', 'Lemongrass', 'Licorice'],
        usage: 'Steep 1 bag for 5 minutes in hot water. Enjoy warm.',
        tags: ['Caffeine-free', 'Relaxing'],
        featured: false,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✓ Created ${createdProducts.length} products`);

    // Create blog posts
    const blogs = [
      {
        title: 'The Science of Ashwagandha: Adaptogens Explained',
        excerpt: 'How adaptogens help the body respond to stress through the HPA axis.',
        category: 'Science',
        image: 'https://images.unsplash.com/photo-1508387024700-9fe5c0b36c70?auto=format&fit=crop&w=1200&q=80',
        author: 'Dr. Priya Sharma',
        content: 'We explore peer-reviewed findings on ashwagandha\'s effects on stress pathways, sleep quality, and cortisol balance, plus how we standardize our extracts for consistent potency. Recent clinical trials have shown ashwagandha to support healthy cortisol levels and promote restful sleep patterns.',
        tags: ['Ashwagandha', 'Science', 'Adaptogens'],
        publishedAt: new Date('2025-11-18'),
      },
      {
        title: 'Sourcing with Respect: Sustainability in the Himalayas',
        excerpt: 'Partnering with local growers and regenerative farms across the Himalayan belt.',
        category: 'Commitments',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        author: 'Rajesh Kumar',
        content: 'Our sourcing charter focuses on soil health, fair trade practices, and traceability. Learn how our botanicals are mapped from seed to shelf with transparent audits. We work directly with 120+ partner farms across the Himalayas to ensure sustainable harvesting practices.',
        tags: ['Sustainability', 'Sourcing', 'Community'],
        publishedAt: new Date('2025-10-02'),
      },
      {
        title: 'Phytotherapy & Modern Labs: What\'s Next',
        excerpt: 'Where traditional knowledge meets chromatography, genomics, and AI-led discovery.',
        category: 'R&D',
        image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8f?auto=format&fit=crop&w=1200&q=80',
        author: 'Dr. Anisha Patel',
        content: 'Dive into our lab pipelines, from fingerprinting botanicals to stability testing and multi-center clinical collaborations that shape our upcoming launches. Our research team uses advanced analytical techniques to ensure the highest quality and efficacy standards.',
        tags: ['R&D', 'Research', 'Innovation'],
        publishedAt: new Date('2025-09-10'),
      },
    ];

    const createdBlogs = await Blog.insertMany(blogs);
    console.log(`✓ Created ${createdBlogs.length} blog posts`);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@himalayanpharma.works',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`✓ Created admin user: ${adminUser.email}`);

    console.log('\n✓ Database seeding completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  - Categories: ${createdCategories.length}`);
    console.log(`  - Products: ${createdProducts.length}`);
    console.log(`  - Blog Posts: ${createdBlogs.length}`);
    console.log(`  - Admin User: ${adminUser.email}`);
    console.log(`\n🔐 Login credentials for testing:`);
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Password: admin123`);
  } catch (error) {
    console.error('✗ Error seeding data:', error.message);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectToDB();
  await seedData();
  await mongoose.connection.close();
  console.log('\n✓ Database connection closed');
};

runSeed();
