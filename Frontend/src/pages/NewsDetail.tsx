import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useNewsItem } from '../hooks/useNews';
import { ProductSkeletonGrid } from '../components/Skeleton';

const NewsDetail = () => {
  const { id } = useParams();
  const { data: newsData, isLoading } = useNewsItem(id || '');

  const item = newsData?.data;

  useEffect(() => {
    document.title = item ? `${item.title} | Himalayan Pharma Works` : 'News | Himalayan Pharma Works';
  }, [item]);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProductSkeletonGrid count={3} />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="section-shell space-y-4">
        <h1 className="text-2xl font-semibold text-emerald-900">News item not found</h1>
        <Link to="/news" className="btn-secondary">
          Back to news
        </Link>
      </div>
    );
  }

  const publishedLabel = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString()
    : 'Unpublished';

  return (
    <div className="section-shell space-y-8">
      <SectionHeader
        eyebrow={item.author}
        title={item.title}
        subtitle={publishedLabel}
      />
      <div className="overflow-hidden rounded-3xl shadow-lg h-96 w-full bg-emerald-50">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-emerald-700">
            No image available
          </div>
        )}
      </div>
      <article className="space-y-4 text-slate-700">
        <p>{item.content}</p>
      </article>
    </div>
  );
};

export default NewsDetail;
