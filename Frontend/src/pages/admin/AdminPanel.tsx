/**
 * Professional Admin Panel - Production Grade
 * Complete dashboard with modular architecture
 * 
 * Features:
 * - Dashboard with real-time statistics
 * - Tab-based navigation for all management sections
 * - Product, Category, and Blog management
 * - Site Content editing
 * - Responsive design with professional UI
 */
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, FileText, Newspaper, Package, PencilRuler, Star, Tags } from 'lucide-react';
import { api } from '../../lib/api';

// Manager Components
import { ProductManager } from '../../components/admin/ProductManager';
import { CategoryManager } from '../../components/admin/CategoryManager';
import { BlogManager } from '../../components/admin/BlogManager';
import { NewsManager } from '../../components/admin/NewsManager';

// UI Components
import { StatsCard, QuickActionCard } from '../../components/admin/ui/StatsCard';
import { LoadingSpinner } from '../../components/admin/ui/LoadingSpinner';

// Tab types
type AdminTab = 'dashboard' | 'products' | 'categories' | 'news' | 'blog' | 'content';

// Dashboard Component
const Dashboard = ({
  onNavigate,
  stats,
}: {
  onNavigate: (tab: AdminTab) => void;
  stats: {
    products: number;
    categories: number;
    news: number;
    blogs: number;
    featured: number;
  };
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Admin Dashboard</h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          Manage your products, categories, news updates, blog posts, and site content from one central location.
          All changes are saved automatically and reflected on your website instantly.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats.products}
          subtitle="Active listings"
          onClick={() => onNavigate('products')}
          icon={<Package className="h-5 w-5" />}
        />
        <StatsCard
          title="Categories"
          value={stats.categories}
          subtitle="Product groups"
          onClick={() => onNavigate('categories')}
          icon={<Tags className="h-5 w-5" />}
        />
        <StatsCard
          title="Blog Posts"
          value={stats.blogs}
          subtitle="Published articles"
          onClick={() => onNavigate('blog')}
          icon={<FileText className="h-5 w-5" />}
        />
        <StatsCard
          title="News"
          value={stats.news}
          subtitle="Company updates"
          onClick={() => onNavigate('news')}
          icon={<Newspaper className="h-5 w-5" />}
        />
        <StatsCard
          title="Featured"
          value={stats.featured}
          subtitle="Highlighted products"
          onClick={() => onNavigate('products')}
          icon={<Star className="h-5 w-5" />}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Add New Product"
            description="Create a new product listing"
            icon={<Package className="h-5 w-5" />}
            onClick={() => onNavigate('products')}
          />
          <QuickActionCard
            title="Write Blog Post"
            description="Share news and insights"
            icon={<FileText className="h-5 w-5" />}
            onClick={() => onNavigate('blog')}
          />
          <QuickActionCard
            title="Publish News"
            description="Post company updates"
            icon={<Newspaper className="h-5 w-5" />}
            onClick={() => onNavigate('news')}
          />
          <QuickActionCard
            title="Edit Site Content"
            description="Update homepage & pages"
            icon={<PencilRuler className="h-5 w-5" />}
            onClick={() => onNavigate('content')}
          />
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Management Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Products Management</p>
                <p className="text-sm text-slate-500">{stats.products} products in inventory</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Manage &gt;
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Tags className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Categories Management</p>
                <p className="text-sm text-slate-500">{stats.categories} categories configured</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('categories')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Manage &gt;
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Blog Management</p>
                <p className="text-sm text-slate-500">{stats.blogs} posts published</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Manage &gt;
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Newspaper className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">News Management</p>
                <p className="text-sm text-slate-500">{stats.news} updates published</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Manage &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Editor Redirect Component
const ContentEditorRedirect = () => {
  return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <PencilRuler className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Site Content Editor</h2>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Edit your site's dynamic content including testimonials, statistics, highlights, job listings, and contact information.
        </p>
        <Link
          to="/admin/content/home"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Open Content Editor
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
  );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as AdminTab) || 'dashboard';
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);

  // Handle navigation from sidebar quick jump
  const handleNavigateEvent = useCallback((e: CustomEvent<{ tab: string }>) => {
    const tab = e.detail.tab as AdminTab;
    if (['dashboard', 'products', 'categories', 'news', 'blog', 'content'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('admin:navigate', handleNavigateEvent as EventListener);
    return () => {
      window.removeEventListener('admin:navigate', handleNavigateEvent as EventListener);
    };
  }, [handleNavigateEvent]);

  // Sync URL params when tab changes
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

    // Fetch all data for stats
  const { data: productsRes, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.products.getAll({ limit: 500 }),
  });

  const { data: categoriesRes, isLoading: categoriesLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => api.categories.getAll(),
  });

  const { data: blogRes, isLoading: blogLoading } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: () => api.blog.getAll({ limit: 500 }),
  });

  const { data: newsRes, isLoading: newsLoading } = useQuery({
    queryKey: ['admin-news'],
    queryFn: () => api.news.getAll({ limit: 500 }),
  });

  useEffect(() => {
    document.title = 'Admin Dashboard | Himalayan Pharma Works';
  }, []);

  const isLoading = productsLoading || categoriesLoading || blogLoading || newsLoading;

  const stats = {
    products: productsRes?.data?.length || 0,
    categories: categoriesRes?.data?.length || 0,
    news: newsRes?.data?.length || 0,
    blogs: blogRes?.data?.length || 0,
    featured: productsRes?.data?.filter((p) => p.featured).length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onNavigate={handleTabChange} stats={stats} />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'news' && <NewsManager />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'content' && <ContentEditorRedirect />}
      </div>
    </div>
  );
};

export default AdminPanel;

