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
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';

// Manager Components
import { ProductManager } from '../../components/admin/ProductManager';
import { CategoryManager } from '../../components/admin/CategoryManager';
import { BlogManager } from '../../components/admin/BlogManager';

// UI Components
import { StatsCard, QuickActionCard } from '../../components/admin/ui/StatsCard';
import { LoadingSpinner } from '../../components/admin/ui/LoadingSpinner';

// Tab types
type AdminTab = 'dashboard' | 'products' | 'categories' | 'blog' | 'content';

// Icons
const DashboardIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ProductIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const BlogIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ContentIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

// Navigation tabs configuration
const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'products', label: 'Products', icon: <ProductIcon /> },
  { id: 'categories', label: 'Categories', icon: <CategoryIcon /> },
  { id: 'blog', label: 'Blog', icon: <BlogIcon /> },
  { id: 'content', label: 'Site Content', icon: <ContentIcon /> },
];

// Dashboard Component
const Dashboard = ({
  onNavigate,
  stats,
}: {
  onNavigate: (tab: AdminTab) => void;
  stats: {
    products: number;
    categories: number;
    blogs: number;
    featured: number;
  };
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="mt-2 text-emerald-100 max-w-2xl">
          Manage your products, categories, blog posts, and site content from one central location.
          All changes are saved automatically and reflected on your website instantly.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats.products}
          subtitle="Active listings"
          color="emerald"
          onClick={() => onNavigate('products')}
          icon={<ProductIcon />}
        />
        <StatsCard
          title="Categories"
          value={stats.categories}
          subtitle="Product groups"
          color="purple"
          onClick={() => onNavigate('categories')}
          icon={<CategoryIcon />}
        />
        <StatsCard
          title="Blog Posts"
          value={stats.blogs}
          subtitle="Published articles"
          color="blue"
          onClick={() => onNavigate('blog')}
          icon={<BlogIcon />}
        />
        <StatsCard
          title="Featured"
          value={stats.featured}
          subtitle="Highlighted products"
          color="amber"
          onClick={() => onNavigate('products')}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Add New Product"
            description="Create a new product listing"
            icon={<ProductIcon />}
            onClick={() => onNavigate('products')}
            color="emerald"
          />
          <QuickActionCard
            title="Write Blog Post"
            description="Share news and insights"
            icon={<BlogIcon />}
            onClick={() => onNavigate('blog')}
            color="blue"
          />
          <QuickActionCard
            title="Edit Site Content"
            description="Update homepage & pages"
            icon={<ContentIcon />}
            onClick={() => onNavigate('content')}
            color="purple"
          />
        </div>
      </div>

      {/* Recent Activity Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Management Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <ProductIcon />
              </div>
              <div>
                <p className="font-medium text-slate-900">Products Management</p>
                <p className="text-sm text-slate-500">{stats.products} products in inventory</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Manage →
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <CategoryIcon />
              </div>
              <div>
                <p className="font-medium text-slate-900">Categories Management</p>
                <p className="text-sm text-slate-500">{stats.categories} categories configured</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('categories')}
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Manage →
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <BlogIcon />
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
              Manage →
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
      <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        <ContentIcon />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Site Content Editor</h2>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        Edit your site's dynamic content including testimonials, statistics, highlights, job listings, and contact information.
      </p>
      <Link
        to="/admin/content"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors"
      >
        Open Content Editor
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

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

  useEffect(() => {
    document.title = 'Admin Dashboard | Himalayan Pharma Works';
  }, []);

  const isLoading = productsLoading || categoriesLoading || blogLoading;

  const stats = {
    products: productsRes?.data?.length || 0,
    categories: categoriesRes?.data?.length || 0,
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
      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'products' && stats.products > 0 && (
                  <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    {stats.products}
                  </span>
                )}
                {tab.id === 'blog' && stats.blogs > 0 && (
                  <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {stats.blogs}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} stats={stats} />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'content' && <ContentEditorRedirect />}
      </div>
    </div>
  );
};

export default AdminPanel;
