/**
 * Product Manager Component
 * Complete product CRUD with search, filter, table view, and modal form
 */
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MoreVertical, Plus } from 'lucide-react';
import { api, type Product, type Category } from '../../lib/api';
import { useProductMutations } from '../../hooks/useAdminMutations';
import { notifyToast } from '../../utils/admin';

// UI Components
import { Modal } from './ui/Modal';
import { DataTable, type Column } from './ui/DataTable';
import { FormField, FormTextArea, FormSelect, FormCheckbox } from './ui/FormFields';
import { SearchFilter, Pagination } from './ui/SearchFilter';
import { PageHeader, Button } from './ui/PageHeader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Badge, TagList } from './ui/Badge';

// Types
interface ProductFormState {
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
}

const INITIAL_FORM: ProductFormState = {
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
const parseList = (value: string): string[] =>
  value.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);

// Product Form Modal
const ProductFormModal = ({
  isOpen,
  onClose,
  form,
  onChange,
  onSubmit,
  categories,
  isSubmitting,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  form: ProductFormState;
  onChange: (updates: Partial<ProductFormState>) => void;
  onSubmit: (e: FormEvent) => void;
  categories: Category[];
  isSubmitting: boolean;
  isEditing: boolean;
}) => {
  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Product' : 'Create New Product'}
      size="xl"
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Basics</h3>
            <p className="text-xs text-slate-500">Core details used across listings.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
              label="Product Name"
              value={form.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Enter product name"
              required
            />
            <FormSelect
              label="Category"
              value={form.category}
              onChange={(e) => onChange({ category: e.target.value })}
              options={categoryOptions}
              placeholder="Select category"
              required
            />
            <FormField
              label="Price (Rs)"
              type="number"
              value={form.price}
              onChange={(e) => onChange({ price: e.target.value })}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Media</h3>
            <p className="text-xs text-slate-500">Add an image for product cards.</p>
          </div>
          <FormField
            label="Image URL"
            value={form.image}
            onChange={(e) => onChange({ image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            helpText="Enter a valid image URL"
          />

          {form.image && (
            <div className="mt-3 flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <img
                src={form.image}
                alt="Preview"
                className="h-16 w-16 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Invalid';
                }}
              />
              <span className="text-sm text-slate-600">Image preview</span>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Descriptions</h3>
            <p className="text-xs text-slate-500">Short and full product descriptions.</p>
          </div>
          <FormField
            label="Short Description"
            value={form.shortDescription}
            onChange={(e) => onChange({ shortDescription: e.target.value })}
            placeholder="Brief product overview (shown in cards)"
            helpText="Max 200 characters recommended"
          />
          <FormTextArea
            label="Full Description"
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Detailed product description..."
            rows={4}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Attributes</h3>
            <p className="text-xs text-slate-500">Benefits, ingredients, and tags.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormTextArea
              label="Benefits"
              value={form.benefits}
              onChange={(e) => onChange({ benefits: e.target.value })}
              placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
              helpText="One per line or comma-separated"
              rows={3}
            />
            <FormTextArea
              label="Ingredients"
              value={form.ingredients}
              onChange={(e) => onChange({ ingredients: e.target.value })}
              placeholder="Ingredient 1&#10;Ingredient 2"
              helpText="One per line or comma-separated"
              rows={3}
            />
            <FormTextArea
              label="Tags"
              value={form.tags}
              onChange={(e) => onChange({ tags: e.target.value })}
              placeholder="tag1, tag2, tag3"
              helpText="Comma-separated tags"
              rows={3}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Usage & Research</h3>
            <p className="text-xs text-slate-500">How to use and scientific references.</p>
          </div>
          <FormTextArea
            label="Usage Instructions"
            value={form.usage}
            onChange={(e) => onChange({ usage: e.target.value })}
            placeholder="How to use this product..."
            rows={3}
          />
          <FormTextArea
            label="Scientific Information"
            value={form.scientificInfo}
            onChange={(e) => onChange({ scientificInfo: e.target.value })}
            placeholder="Research, studies, scientific details..."
            helpText="Optional - Add any scientific backing or research"
            rows={3}
          />
        </div>

        <FormCheckbox
          label="Featured Product"
          checked={form.featured}
          onChange={(e) => onChange({ featured: e.target.checked })}
          description="Show this product in the featured section on homepage"
        />
        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Main Product Manager Component
export const ProductManager = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ProductFormState>(INITIAL_FORM);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 10;

  // Queries
  const { data: categoriesRes } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => api.categories.getAll(),
  });

  const { data: productsRes, isFetching } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.products.getAll({ limit: 500 }),
  });

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useProductMutations();

  const categories = useMemo(() => categoriesRes?.data || [], [categoriesRes?.data]);
  const allProducts = useMemo(() => productsRes?.data || [], [productsRes?.data]);

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.shortDescription?.toLowerCase().includes(searchLower) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((p) => {
        const catId = typeof p.category === 'string' ? p.category : p.category?._id;
        return catId === filters.category;
      });
    }

    // Featured filter
    if (filters.featured === 'true') {
      result = result.filter((p) => p.featured);
    } else if (filters.featured === 'false') {
      result = result.filter((p) => !p.featured);
    }

    return result;
  }, [allProducts, search, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  useEffect(() => {
    if (!openMenuId) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-action-menu]')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [openMenuId]);

  // Form handlers
  const openCreateModal = () => {
    setForm(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setForm({
      _id: product._id,
      name: product.name,
      category: typeof product.category === 'string' ? product.category : product.category?._id || '',
      price: product.price ? String(product.price) : '',
      image: product.image || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      benefits: (product.benefits || []).join('\n'),
      ingredients: (product.ingredients || []).join('\n'),
      usage: product.usage || '',
      tags: (product.tags || []).join(', '),
      featured: !!product.featured,
      scientificInfo: product.scientificInfo || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.category) {
      notifyToast('warning', 'Product name and category are required');
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price: form.price ? Number(form.price) : undefined,
      image: form.image.trim(),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      benefits: parseList(form.benefits),
      ingredients: parseList(form.ingredients),
      usage: form.usage.trim(),
      tags: parseList(form.tags),
      featured: form.featured,
      scientificInfo: form.scientificInfo?.trim() || undefined,
    };

    if (form._id) {
      updateMutation.mutate(
        { id: form._id, data: payload },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setForm(INITIAL_FORM);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
          setForm(INITIAL_FORM);
        },
      });
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget._id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  // Table columns
  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product',
      render: (product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image || 'https://via.placeholder.com/40'}
            alt={product.name}
            className="h-10 w-10 rounded-lg object-cover border border-slate-200"
          />
          <div>
            <p className="font-medium text-slate-900 line-clamp-1">{product.name}</p>
            <p className="text-xs text-slate-500 line-clamp-1">{product.shortDescription}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (product) => {
        const catId = typeof product.category === 'string' ? product.category : product.category?._id;
        const catName = typeof product.category === 'string'
          ? categories.find((c) => c._id === catId)?.name
          : product.category?.name;
        return <Badge variant="info">{catName || 'Unknown'}</Badge>;
      },
    },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      render: (product) => (
        <span className="font-medium text-slate-900">
          {product.price ? `Rs. ${product.price.toLocaleString()}` : '-'}
        </span>
      ),
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (product) =>
        product.tags?.length ? (
          <TagList tags={product.tags} maxVisible={2} variant="success" />
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      key: 'featured',
      header: 'Status',
      align: 'center',
      render: (product) =>
        product.featured ? (
          <Badge variant="warning" dot>
            Featured
          </Badge>
        ) : (
          <Badge variant="default">Standard</Badge>
        ),
    },
  ];

  const filterOptions = [
    {
      key: 'category',
      label: 'All Categories',
      options: categories.map((c) => ({ value: c._id, label: c.name })),
    },
    {
      key: 'featured',
      label: 'All Status',
      options: [
        { value: 'true', label: 'Featured' },
        { value: 'false', label: 'Standard' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description={`${allProducts.length} products in inventory`}
        actions={
          <Button onClick={openCreateModal} icon={<Plus className="h-4 w-4" />}>
            Add Product
          </Button>
        }
      />

      {/* Search and Filters */}
      <SearchFilter
        searchValue={search}
        onSearchChange={handleSearch}
        placeholder="Search products by name, description, or tags..."
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
      />

      {/* Results Summary */}
      {(search || Object.values(filters).some(Boolean)) && (
        <p className="text-sm text-slate-600">
          Found <strong>{filteredProducts.length}</strong> products
          {search && <> matching "{search}"</>}
        </p>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedProducts}
        keyExtractor={(p) => p._id}
        isLoading={isFetching}
        emptyTitle="No products found"
        emptyDescription={search ? 'Try adjusting your search or filters' : 'Create your first product to get started'}
        actions={(product, index) => {
          const openUp = index >= paginatedProducts.length - 2;
          const menuPosition = openUp ? 'bottom-full mb-2' : 'top-full mt-2';
          return (
          <div className="relative" data-action-menu>
            <button
              type="button"
              onClick={() => setOpenMenuId((prev) => (prev === product._id ? null : product._id))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
              aria-haspopup="menu"
              aria-expanded={openMenuId === product._id}
            >
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
            </button>
            {openMenuId === product._id && (
              <div className={`absolute right-0 z-20 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg ${menuPosition}`}>
                <button
                  type="button"
                  onClick={() => {
                    openEditModal(product);
                    setOpenMenuId(null);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(product);
                    setOpenMenuId(null);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
        }}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filteredProducts.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setForm(INITIAL_FORM);
        }}
        form={form}
        onChange={(updates) => setForm((prev) => ({ ...prev, ...updates }))}
        onSubmit={handleSubmit}
        categories={categories}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        isEditing={!!form._id}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ProductManager;
