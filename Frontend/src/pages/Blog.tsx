import { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import SectionHeader from '../components/SectionHeader';
import { blogPosts } from '../data/mockData';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog | Himalayan Pharma Works';
  }, []);

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Blog"
        title="Insights and stories"
        subtitle="Research highlights, sustainability updates, and guidance on herbal wellness."
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
