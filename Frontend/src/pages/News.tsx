import { useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import SectionHeader from '../components/SectionHeader';
import { useNewsItems } from '../hooks/useNews';
import { ProductSkeletonGrid } from '../components/Skeleton';

const News = () => {
  const { data: newsData, isLoading } = useNewsItems({ isPublished: true });

  useEffect(() => {
    document.title = 'News | Himalayan Pharma Works';
  }, []);

  const newsItems = newsData?.data || [];

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="News"
        title="Company updates"
        subtitle="Press releases, milestones, and community initiatives from Himalayan Pharma Works."
        align="center"
      />
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductSkeletonGrid count={3} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
