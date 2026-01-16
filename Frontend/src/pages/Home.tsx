import { useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import TestimonialCard from '../components/TestimonialCard';
import SectionHeader from '../components/SectionHeader';
import StatsBar from '../components/StatsBar';
import MediaGallery from '../components/MediaGallery';
import { useFeaturedProducts } from '../hooks/useProducts';
import { useBlogPosts } from '../hooks/useBlog';
import { useContent } from '../hooks/useContent';
import { ProductSkeletonGrid } from '../components/Skeleton';
import type { Product } from '../lib/api';

const Home = () => {
  const { data: featuredData, isLoading: productsLoading } = useFeaturedProducts();
  const { data: contentData, isLoading: contentLoading } = useContent();
  const content = contentData?.data;
  const journalLimitCandidate = content?.home?.journal?.limit;
  const journalLimitFromContent =
    typeof journalLimitCandidate === 'number' && Number.isFinite(journalLimitCandidate) && journalLimitCandidate > 0
      ? journalLimitCandidate
      : 3;
  const { data: blogData, isLoading: blogLoading } = useBlogPosts({ limit: journalLimitFromContent });

  useEffect(() => {
    document.title = 'Himalayan Pharma Works | Wellness Rooted in Nature';
  }, []);

  const featuredProducts = useMemo(() => {
    return featuredData?.data || [];
  }, [featuredData]);

  const blogPosts = useMemo(() => {
    return blogData?.data || [];
  }, [blogData]);

  const contentStats = content?.stats || [];
  const contentTestimonials = content?.testimonials || [];
  const mediaItems = content?.mediaItems || [];
  const home = content?.home;

  const renderProductCard = useCallback((product: Product) => {
    const category =
      typeof product.category === 'string'
        ? { _id: 'unknown', name: product.category }
        : product.category;
    return (
      <ProductCard
        key={product._id}
        product={{
          ...product,
          category,
          price: product.price,
        }}
      />
    );
  }, []);

  if (!home) {
    return (
      <div className="section-shell py-16">
        <p className="text-slate-600">Loading content...</p>
      </div>
    );
  }

  const { hero, featured, about, stories, journal } = home;
  const aboutBullets = Array.isArray(about.bullets) ? about.bullets : [];
  const aboutHighlights = Array.isArray(about.highlights) ? about.highlights : [];

  const featuredLimitCandidate = featured.limit;
  const journalLimitCandidateFromHome = journal.limit;
  const featuredLimit =
    Number.isFinite(featuredLimitCandidate) && featuredLimitCandidate > 0 ? featuredLimitCandidate : 6;
  const journalLimit =
    Number.isFinite(journalLimitCandidateFromHome) && journalLimitCandidateFromHome > 0 ? journalLimitCandidateFromHome : 3;

  return (
    <div className="space-y-16">
      <Hero
        heading={hero.heading}
        subheading={hero.subheading}
        primaryText={hero.primaryText}
        primaryLink={hero.primaryLink}
        secondaryText={hero.secondaryText}
        secondaryLink={hero.secondaryLink}
      />

      <section className="section-shell space-y-8">
        <SectionHeader
          eyebrow={featured.eyebrow}
          title={featured.title}
          subtitle={featured.subtitle}
        />
        {productsLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProductSkeletonGrid count={featuredLimit} />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.slice(0, featuredLimit).map(renderProductCard)}
          </div>
        )}
        <div className="flex justify-center">
          <Link to={featured.ctaLink} className="btn-secondary">
            {featured.ctaText}
          </Link>
        </div>
      </section>

      <section className="section-shell space-y-6">
        <StatsBar stats={contentStats} />
      </section>

      <section className="section-shell grid gap-8 rounded-3xl bg-white/90 p-8 shadow-sm lg:grid-cols-2">
        <div className="space-y-4">
          <SectionHeader
            eyebrow={about.eyebrow}
            title={about.title}
            subtitle={about.subtitle}
          />
          <ul className="space-y-3 text-sm text-slate-700">
            {aboutBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link to={about.ctaLink} className="btn-primary">
            {about.ctaText}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {aboutHighlights.map((item) => (
            <div key={item} className="glass-panel rounded-2xl p-4 text-center text-emerald-900">
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell space-y-8">
        <SectionHeader
          eyebrow={stories.eyebrow}
          title={stories.title}
          subtitle={stories.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(contentLoading && contentTestimonials.length === 0) && (
            <p className="text-slate-600">{stories.loadingText}</p>
          )}
          {contentTestimonials.map((t) => (
            <TestimonialCard key={t.id || t._id || t.name} testimonial={t} />
          ))}
        </div>
      </section>

      <MediaGallery items={mediaItems} />

      <section className="section-shell space-y-8">
        <SectionHeader
          eyebrow={journal.eyebrow}
          title={journal.title}
          subtitle={journal.subtitle}
        />
        {blogLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProductSkeletonGrid count={journalLimit} />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, journalLimit).map((post) => (
              <BlogCard
                key={post._id}
                post={post}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Link to={journal.ctaLink} className="btn-secondary">
            {journal.ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
