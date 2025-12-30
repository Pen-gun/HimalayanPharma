import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { blogPosts } from '../data/mockData';

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((item) => item.id === id);

  useEffect(() => {
    document.title = post ? `${post.title} | Himalayan Pharma Works` : 'Blog | Himalayan Pharma Works';
  }, [post]);

  if (!post) {
    return (
      <div className="section-shell space-y-4">
        <h1 className="text-2xl font-semibold text-emerald-900">Article not found</h1>
        <Link to="/blog" className="btn-secondary">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="section-shell space-y-8">
      <SectionHeader eyebrow={post.category} title={post.title} subtitle={post.publishedAt} />
      <div className="overflow-hidden rounded-3xl shadow-lg">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <article className="space-y-4 text-slate-700">
        <p>{post.content}</p>
        <p>
          These articles are provided for educational purposes. Clinical references and PDFs will be added soon as studies complete peer review.
        </p>
      </article>
    </div>
  );
};

export default BlogDetail;
