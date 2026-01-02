import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, type Product, type Category, type BlogPost } from '../../lib/api';

const listFromText = (value: string) =>
  value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

type ProductInput = {
  name: string;
  category: string;
  price?: number;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  tags: string[];
  featured: boolean;
  scientificInfo?: string;
};

type BlogInput = {
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  image?: string;
  category?: string;
  tags: string[];
  publishedAt?: string;
};

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

type BlogFormState = {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  category: string;
  tags: string;
  publishedAt: string;
};

type CategoryFormState = {
  _id?: string;
  name: string;
  description: string;
};

const initialProductForm: ProductFormState = {
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

const initialBlogForm: BlogFormState = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  image: '',
  category: '',
  tags: '',
  publishedAt: '',
};

const initialCategoryForm: CategoryFormState = {
  name: '',
  description: '',
};

const AdminPanel = () => {
  const queryClient = useQueryClient();
  const [productForm, setProductForm] = useState<ProductFormState>(initialProductForm);
  const [blogForm, setBlogForm] = useState<BlogFormState>(initialBlogForm);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(initialCategoryForm);

  useEffect(() => {
    document.title = 'Admin | Himalayan Pharma Works';
  }, []);

  const { data: categoriesRes, isFetching: categoriesLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => api.categories.getAll(),
  });

  const { data: productsRes, isFetching: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.products.getAll({ limit: 200 }),
  });

  const { data: blogRes, isFetching: blogLoading } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: () => api.blog.getAll({ limit: 200 }),
  });

  const categories = useMemo(() => categoriesRes?.data || [], [categoriesRes]);
  const products = useMemo(() => productsRes?.data || [], [productsRes]);
  const posts = useMemo(() => blogRes?.data || [], [blogRes]);

  const resetProductForm = () => setProductForm(initialProductForm);
  const resetBlogForm = () => setBlogForm(initialBlogForm);
  const resetCategoryForm = () => setCategoryForm(initialCategoryForm);

  const productMutation = useMutation({
    mutationFn: (payload: { id?: string; data: ProductInput }) =>
      payload.id ? api.products.update(payload.id, payload.data) : api.products.create(payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      resetProductForm();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => api.products.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const blogMutation = useMutation({
    mutationFn: (payload: { id?: string; data: BlogInput }) =>
      payload.id ? api.blog.update(payload.id, payload.data) : api.blog.create(payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] });
      resetBlogForm();
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => api.blog.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-blog'] }),
  });

  const categoryMutation = useMutation({
    mutationFn: (payload: { id?: string; data: { name: string; description?: string } }) =>
      payload.id ? api.categories.update(payload.id, payload.data) : api.categories.create(payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      resetCategoryForm();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => api.categories.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-categories'] }),
  });

  const handleProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!productForm.name || !productForm.category) {
      alert('Name and category are required');
      return;
    }

    const payload: ProductInput = {
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

    productMutation.mutate({ id: productForm._id, data: payload });
  };

  const handleBlogSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blogForm.title || !blogForm.excerpt || !blogForm.content) {
      alert('Title, excerpt, and content are required');
      return;
    }

    const payload: BlogInput = {
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      author: blogForm.author.trim() || undefined,
      image: blogForm.image.trim() || undefined,
      category: blogForm.category.trim() || undefined,
      tags: listFromText(blogForm.tags),
      publishedAt: blogForm.publishedAt || undefined,
    };

    blogMutation.mutate({ id: blogForm._id, data: payload });
  };

  const handleCategorySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!categoryForm.name) {
      alert('Category name is required');
      return;
    }

    categoryMutation.mutate({ id: categoryForm._id, data: { name: categoryForm.name.trim(), description: categoryForm.description.trim() || undefined } });
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
  };

  const startEditBlog = (post: BlogPost) => {
    setBlogForm({
      _id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author || '',
      image: post.image || '',
      category: post.category || '',
      tags: (post.tags || []).join(', '),
      publishedAt: post.publishedAt ? post.publishedAt.slice(0, 10) : '',
    });
  };

  const startEditCategory = (category: Category) => {
    setCategoryForm({
      _id: category._id,
      name: category.name,
      description: category.description || '',
    });
  };

  return (
    <div className="space-y-10">
      <section id="overview" className="grid gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm sm:grid-cols-3">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase text-emerald-700">Products</p>
          <p className="text-3xl font-semibold text-emerald-900">{products.length}</p>
          <p className="text-xs text-emerald-700">Active items</p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase text-amber-700">Blog posts</p>
          <p className="text-3xl font-semibold text-amber-900">{posts.length}</p>
          <p className="text-xs text-amber-700">Published articles</p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="text-xs font-semibold uppercase text-sky-700">Categories</p>
          <p className="text-3xl font-semibold text-sky-900">{categories.length}</p>
          <p className="text-xs text-sky-700">Taxonomy entries</p>
        </div>
      </section>

      <section id="products" className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700">Products</p>
            <h2 className="text-xl font-semibold text-emerald-900">Create or edit products</h2>
          </div>
          <div className="text-xs text-slate-500">{productsLoading ? 'Loading...' : `${products.length} items`}</div>
        </div>
        <form className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4" onSubmit={handleProductSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Name
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Category
              <select
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                required
                disabled={categoriesLoading}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Price (Rs)
              <input
                type="number"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                min="0"
                step="0.01"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Image URL
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700 sm:col-span-2 lg:col-span-3">
              Short description
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.shortDescription}
                onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700 sm:col-span-2 lg:col-span-3">
              Full description
              <textarea
                className="min-h-[96px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Benefits (comma or line separated)
              <textarea
                className="min-h-[72px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.benefits}
                onChange={(e) => setProductForm({ ...productForm, benefits: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Ingredients (comma or line separated)
              <textarea
                className="min-h-[72px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.ingredients}
                onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Tags (comma separated)
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.tags}
                onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700 sm:col-span-2">
              Usage
              <textarea
                className="min-h-[72px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.usage}
                onChange={(e) => setProductForm({ ...productForm, usage: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700 sm:col-span-2">
              Scientific info / notes
              <textarea
                className="min-h-[72px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={productForm.scientificInfo}
                onChange={(e) => setProductForm({ ...productForm, scientificInfo: e.target.value })}
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={productForm.featured}
                onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
              />
              Featured
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="btn-primary"
              disabled={productMutation.isPending}
            >
              {productForm._id ? 'Update product' : 'Create product'}
            </button>
            <button type="button" className="btn-secondary" onClick={resetProductForm}>
              Clear form
            </button>
          </div>
        </form>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{typeof product.category === 'string' ? product.category : product.category?.name}</p>
                  <h3 className="text-lg font-semibold text-emerald-900">{product.name}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{product.shortDescription}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{product.price ? `Rs ${product.price}` : 'N/A'}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">{tag}</span>
                ))}
                {product.featured && <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-800">Featured</span>}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-secondary flex-1" onClick={() => startEditProduct(product)}>
                  Edit
                </button>
                <button
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                  onClick={() => {
                    if (window.confirm('Delete this product?')) {
                      deleteProductMutation.mutate(product._id);
                    }
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="blog" className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700">Blog</p>
            <h2 className="text-xl font-semibold text-emerald-900">Publish articles</h2>
          </div>
          <div className="text-xs text-slate-500">{blogLoading ? 'Loading...' : `${posts.length} posts`}</div>
        </div>
        <form className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4" onSubmit={handleBlogSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Title
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                required
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Author
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.author}
                onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Category
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.category}
                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Published date
              <input
                type="date"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.publishedAt}
                onChange={(e) => setBlogForm({ ...blogForm, publishedAt: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700 sm:col-span-2">
              Excerpt
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                required
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700 sm:col-span-2">
              Content
              <textarea
                className="min-h-[120px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                required
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Hero image URL
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.image}
                onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Tags (comma separated)
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={blogForm.tags}
                onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary" disabled={blogMutation.isPending}>
              {blogForm._id ? 'Update post' : 'Publish post'}
            </button>
            <button type="button" className="btn-secondary" onClick={resetBlogForm}>
              Clear form
            </button>
          </div>
        </form>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{post.category}</p>
                  <h3 className="text-lg font-semibold text-emerald-900 line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800">{tag}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-secondary flex-1" onClick={() => startEditBlog(post)}>
                  Edit
                </button>
                <button
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                  onClick={() => {
                    if (window.confirm('Delete this post?')) {
                      deleteBlogMutation.mutate(post._id);
                    }
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="space-y-4 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700">Categories</p>
            <h2 className="text-xl font-semibold text-emerald-900">Manage taxonomy</h2>
          </div>
          <div className="text-xs text-slate-500">{categoriesLoading ? 'Loading...' : `${categories.length} categories`}</div>
        </div>
        <form className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4" onSubmit={handleCategorySubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Name
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                required
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-slate-700">
              Description
              <input
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary" disabled={categoryMutation.isPending}>
              {categoryForm._id ? 'Update category' : 'Create category'}
            </button>
            <button type="button" className="btn-secondary" onClick={resetCategoryForm}>
              Clear form
            </button>
          </div>
        </form>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-900">{category.name}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">{category.description || 'No description'}</p>
              <div className="mt-4 flex gap-2">
                <button className="btn-secondary flex-1" onClick={() => startEditCategory(category)}>
                  Edit
                </button>
                <button
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                  onClick={() => {
                    if (window.confirm('Delete this category?')) {
                      deleteCategoryMutation.mutate(category._id);
                    }
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
