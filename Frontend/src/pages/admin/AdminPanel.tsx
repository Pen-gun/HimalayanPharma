/**
 * Professional-grade Admin Panel - Production Ready
 * Modular architecture with separated concerns
 */
import { useEffect, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type Product, type Category } from '../../lib/api';
import { useProductMutations } from '../../hooks/useAdminMutations';
import { ProductList } from '../../components/admin/ProductList';
import { notifyToast } from '../../utils/admin';

// Form state types
type ProductFormState = {
  _id?: string;
  name: string;
  category: string;
  price: string;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string;
  ingredients: string;
  usage: string;
  tags: string;
  featured: boolean;
  scientificInfo: string;
};

// Initial state constant
const INITIAL_PRODUCT: ProductFormState = {
  name: '',
  category: '',
  price: '',
  image: '',
  shortDescription: '',
  description: '',
  benefits: '',
  ingredients: '',
  usage: '',
  tags: '',
  featured: false,
  scientificInfo: '',
};

// Helper: Parse comma-separated values
const listFromText = (value: string) =>
  value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

/**
 * Stateless Product Form Component
 */
const ProductForm = ({
  form,
  categories,
  onChange,
  onSubmit,
  isSubmitting,
  isEditing,
}: {
  form: ProductFormState;
  categories: Category[];
  onChange: (updates: Partial<ProductFormState>) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Product Name *</label>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Category *</label>
          <select
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
            value={form.category}
            onChange={(e) => onChange({ category: e.target.value })}
            required
          >
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Price (₹)</label>
          <input
            type="number"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
            value={form.price}
            onChange={(e) => onChange({ price: e.target.value })}
            min="0"
            step="0.01"
            placeholder="0"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Image URL</label>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
            value={form.image}
            onChange={(e) => onChange({ image: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Short Description</label>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
            value={form.shortDescription}
            onChange={(e) => onChange({ shortDescription: e.target.value })}
            placeholder="Brief product overview"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Full Description</label>
          <textarea
            className="w-full min-h-[100px] rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-vertical"
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Detailed product description..."
          />
        </div>

        <div className="sm:col-span-1 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Benefits (comma separated)</label>
          <textarea
            className="w-full min-h-[80px] rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-vertical"
            value={form.benefits}
            onChange={(e) => onChange({ benefits: e.target.value })}
            placeholder="Benefit 1, Benefit 2, Benefit 3"
          />
        </div>

        <div className="sm:col-span-1 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Ingredients (comma separated)</label>
          <textarea
            className="w-full min-h-[80px] rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-vertical"
            value={form.ingredients}
            onChange={(e) => onChange({ ingredients: e.target.value })}
            placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
          />
        </div>

        <div className="sm:col-span-1 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Tags (comma separated)</label>
          <textarea
            className="w-full min-h-[80px] rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-vertical"
            value={form.tags}
            onChange={(e) => onChange({ tags: e.target.value })}
            placeholder="Tag 1, Tag 2, Tag 3"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Usage Instructions</label>
          <textarea
            className="w-full min-h-[80px] rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-vertical"
            value={form.usage}
            onChange={(e) => onChange({ usage: e.target.value })}
            placeholder="How to use this product..."
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3 space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Scientific Information (Optional)</label>
          <textarea
            className="w-full min-h-[80px] rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-vertical"
            value={form.scientificInfo}
            onChange={(e) => onChange({ scientificInfo: e.target.value })}
            placeholder="Research, studies, scientific details..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            className="h-4 w-4 rounded border-slate-300"
            checked={form.featured}
            onChange={(e) => onChange({ featured: e.target.checked })}
          />
          <label htmlFor="featured" className="text-xs font-semibold text-slate-700 cursor-pointer">
            Mark as featured
          </label>
        </div>
      </div>

      <div className="flex gap-3 border-t border-slate-200 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white hover:bg-emerald-700 active:scale-95 disabled:opacity-50 transition"
        >
          {isSubmitting ? '...' : isEditing ? '💾 Update Product' : '✚ Create Product'}
        </button>
        <button
          type="button"
          onClick={() => onChange(INITIAL_PRODUCT)}
          className="rounded-lg bg-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-400 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

/**
 * Main AdminPanel Component
 */
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products'>('overview');
  const [productForm, setProductForm] = useState<ProductFormState>(INITIAL_PRODUCT);

  // Mutations
  const { createMutation: createProduct, updateMutation: updateProduct, deleteMutation: deleteProduct } = useProductMutations();

  // Queries
  const { data: categoriesRes } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => api.categories.getAll(),
  });

  const { data: productsRes, isFetching: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.products.getAll({ limit: 200 }),
  });

  useEffect(() => {
    document.title = 'Admin Dashboard | Himalayan Pharma Works';
  }, []);

  const categories = categoriesRes?.data || [];
  const products = productsRes?.data || [];
  const categoryMap = new Map(categories.map((c) => [c._id, c.name]));

  // Product handlers
  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category) {
      notifyToast('warning', 'Product name and category are required');
      return;
    }

    const payload = {
      name: productForm.name.trim(),
      category: productForm.category,
      price: productForm.price ? Number(productForm.price) : undefined,
      image: productForm.image.trim(),
      shortDescription: productForm.shortDescription.trim(),
      description: productForm.description.trim(),
      benefits: listFromText(productForm.benefits),
      ingredients: listFromText(productForm.ingredients),
      usage: productForm.usage.trim(),
      tags: listFromText(productForm.tags),
      featured: productForm.featured,
      scientificInfo: productForm.scientificInfo?.trim() || undefined,
    };

    if (productForm._id) {
      updateProduct.mutate({ id: productForm._id, data: payload });
    } else {
      createProduct.mutate(payload);
    }
    setProductForm(INITIAL_PRODUCT);
  };

  const startEditProduct = (product: Product) => {
    setProductForm({
      _id: product._id,
      name: product.name,
      category: typeof product.category === 'string' ? product.category : product.category?._id || '',
      price: product.price ? String(product.price) : '',
      image: product.image || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      benefits: (product.benefits || []).join(', '),
      ingredients: (product.ingredients || []).join(', '),
      usage: product.usage || '',
      tags: (product.tags || []).join(', '),
      featured: !!product.featured,
      scientificInfo: product.scientificInfo || '',
    });
    setActiveTab('products');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      deleteProduct.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">Manage products, content, and business operations</p>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 border border-emerald-200">
            <p className="text-xs font-semibold text-emerald-700 uppercase">Products</p>
            <p className="text-2xl font-bold text-emerald-900">{products.length}</p>
            <p className="text-xs text-emerald-700">Active listings</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4 border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 uppercase">Categories</p>
            <p className="text-2xl font-bold text-purple-900">{categories.length}</p>
            <p className="text-xs text-purple-700">Taxonomies</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200">
        {['overview', 'products'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2.5 font-semibold capitalize transition border-b-2 ${
              activeTab === tab
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Access</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setActiveTab('products')}
                className="rounded-lg bg-emerald-50 p-4 text-left hover:bg-emerald-100 transition border border-emerald-200"
              >
                <p className="font-semibold text-emerald-900">📦 Manage Products</p>
                <p className="text-sm text-emerald-700">{products.length} total products</p>
              </button>
              <a
                href="/admin/content"
                className="rounded-lg bg-orange-50 p-4 text-left hover:bg-orange-100 transition border border-orange-200"
              >
                <p className="font-semibold text-orange-900">✏️ Content Editor</p>
                <p className="text-sm text-orange-700">Testimonials, jobs, locations</p>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Create or Edit Product</h2>
              <ProductForm
                form={productForm}
                categories={categories}
                onChange={(updates) => setProductForm({ ...productForm, ...updates })}
                onSubmit={handleProductSubmit}
                isSubmitting={createProduct.isPending || updateProduct.isPending}
                isEditing={!!productForm._id}
              />
            </div>

            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Product Inventory</h2>
              <ProductList
                products={products}
                categories={categoryMap}
                isLoading={productsLoading}
                onEdit={startEditProduct}
                onDelete={handleDeleteProduct}
                isDeleting={deleteProduct.isPending}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
