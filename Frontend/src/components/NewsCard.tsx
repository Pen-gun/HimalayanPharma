import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import type { NewsItem } from '../lib/api';

interface Props {
  item: NewsItem;
}

const NewsCard = memo(({ item }: Props) => {
  const publishedLabel = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString()
    : 'Unpublished';

  return (
    <div className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 w-full overflow-hidden bg-emerald-50">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-emerald-700">
            No image available
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">News</span>
          <span className="flex items-center gap-1 text-slate-600">
            <CalendarDays className="h-4 w-4" />
            {publishedLabel}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-emerald-900">{item.title}</h3>
        <p className="text-sm text-slate-600">{item.summary}</p>
        <Link
          to={`/news/${item._id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:gap-3"
        >
          Read update
        </Link>
      </div>
    </div>
  );
});

NewsCard.displayName = 'NewsCard';

export default NewsCard;
