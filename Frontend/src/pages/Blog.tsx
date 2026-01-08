import { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import SectionHeader from '../components/SectionHeader';
import { useBlogPosts } from '../hooks/useBlog';
import { ProductSkeletonGrid } from '../components/Skeleton.tsx';

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
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <ProductSkeletonGrid count={3} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
