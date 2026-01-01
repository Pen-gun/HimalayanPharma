import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import type { BlogPost } from '../lib/api';

interface Props {
  post: BlogPost;
}

const BlogCard = memo(({ post }: Props) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 w-full overflow-hidden bg-emerald-50">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">{post.category}</span>
          <span className="flex items-center gap-1 text-slate-600">
            <CalendarDays className="h-4 w-4" />
            {post.publishedAt}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-emerald-900">{post.title}</h3>
        <p className="text-sm text-slate-600">{post.excerpt}</p>
        <Link
          to={`/blog/${post._id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:gap-3"
        >
          Read article
        </Link>
      </div>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';

export default BlogCard;
