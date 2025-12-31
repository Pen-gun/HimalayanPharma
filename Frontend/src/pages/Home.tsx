import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import TestimonialCard from '../components/TestimonialCard';
import SectionHeader from '../components/SectionHeader';
import StatsBar from '../components/StatsBar';
import { stats, testimonials } from '../data/mockData';
import { useFeaturedProducts } from '../hooks/useProducts';
import { useBlogPosts } from '../hooks/useBlog';

const Home = () => {
  const { data: featuredData, isLoading: productsLoading } = useFeaturedProducts();
  const { data: blogData, isLoading: blogLoading } = useBlogPosts({ limit: 3 });

  useEffect(() => {
    document.title = 'Himalayan Pharma Works | Wellness Rooted in Nature';
  }, []);

  const featuredProducts = featuredData?.data || [];
  const blogPosts = blogData?.data || [];

  return (
    <div className="space-y-16">
      <Hero
        heading="Wellness Rooted in Nature — Science-Backed Ayurveda"
        subheading="Herbal, clinically validated formulations inspired by the Himalayas. Trusted by physicians, loved by families."
        primaryText="Explore Products"
        primaryLink="/products"
        secondaryText="Our Story"
        secondaryLink="/about"
      />

      <section className="section-shell space-y-8">
        <SectionHeader
          eyebrow="Featured"
          title="Flagship formulations for everyday balance"
          subtitle="Curated bestsellers from liver health to stress resilience, crafted with traceable botanicals and rigorous lab validation."
        />
        {productsLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard 
                key={product._id} 
                product={{
                  id: product._id,
                  name: product.name,
                  category: typeof product.category === 'object' ? product.category.name : product.category,
                  price: `$${product.price}`,
                  image: product.image,
                  shortDescription: product.shortDescription,
                  description: product.description,
                  benefits: product.benefits,
                  ingredients: product.ingredients,
                  usage: product.usage,
                  tags: product.tags,
                }}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Link to="/products" className="btn-secondary">
            View all products
          </Link>
        </div>
      </section>

      <section className="section-shell space-y-6">
        <StatsBar stats={stats} />
      </section>

      <section className="section-shell grid gap-8 rounded-3xl bg-white/90 p-8 shadow-sm lg:grid-cols-2">
        <div className="space-y-4">
          <SectionHeader
            eyebrow="About"
            title="Himalayan expertise, global standards"
            subtitle="Our formulations are built on Ayurveda, validated in modern labs, and produced in cGMP facilities with end-to-end traceability."
          />
          <ul className="space-y-3 text-sm text-slate-700">
            <li>• Multi-center clinical collaborations across hepatology, metabolic, and immune health.</li>
            <li>• Chromatography fingerprinting and stability testing for every batch.</li>
            <li>• Regenerative sourcing with partner farms across the Himalayan belt.</li>
          </ul>
          <Link to="/about" className="btn-primary">
            Learn more
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {['Traceable botanicals', 'Clinically studied', 'Vegan friendly', 'ISO & cGMP'].map((item) => (
            <div key={item} className="glass-panel rounded-2xl p-4 text-center text-emerald-900">
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell space-y-8">
        <SectionHeader
          eyebrow="Stories"
          title="From the community"
          subtitle="Trusted by clinicians, athletes, parents, and pet lovers who want clean, effective herbal support."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      <section className="section-shell space-y-8">
        <SectionHeader
          eyebrow="Journal"
          title="Science, sustainability, and wellness insights"
          subtitle="Field notes from our labs and partner farms, plus how to use our products with confidence."
        />
        {blogLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading articles...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard 
                key={post._id} 
                post={{
                  id: post._id,
                  title: post.title,
                  excerpt: post.excerpt,
                  image: post.image,
                  category: post.category,
                  publishedAt: post.publishedAt,
                  content: post.content,
                }}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Link to="/blog" className="btn-secondary">
            View all articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
