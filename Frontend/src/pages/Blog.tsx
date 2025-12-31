import { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import SectionHeader from '../components/SectionHeader';
import { useBlogPosts } from '../hooks/useBlog';

const Blog = () => {
  const { data: blogData, isLoading } = useBlogPosts();

  useEffect(() => {
    document.title = 'Blog | Himalayan Pharma Works';
  }, []);

  const blogPosts = blogData?.data || [];

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Blog"
        title="Insights and stories"
        subtitle="Research highlights, sustainability updates, and guidance on herbal wellness."
        align="center"
      />
      {isLoading ? (
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
    </div>
  );
};

export default Blog;
