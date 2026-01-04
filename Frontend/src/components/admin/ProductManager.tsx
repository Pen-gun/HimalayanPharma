/**
 * Product Manager Component
 * Complete product CRUD with search, filter, table view, and modal form
 */
import { useState, useMemo, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type Product, type Category } from '../../lib/api';
import { useProductMutations } from '../../hooks/useAdminMutations';
import { notifyToast } from '../../utils/admin';

// UI Components
import { Modal } from './ui/Modal';
import { DataTable, ActionButton, type Column } from './ui/DataTable';
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
        {/* Basic Info */}
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
            label="Price (₹)"
            type="number"
            value={form.price}
            onChange={(e) => onChange({ price: e.target.value })}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>

        {/* Image URL */}
        <FormField
          label="Image URL"
          value={form.image}
          onChange={(e) => onChange({ image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          helpText="Enter a valid image URL"
        />

        {/* Preview if image exists */}
        {form.image && (
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
            <img
              src={form.image}
              alt="Preview"
              className="h-16 w-16 rounded-lg object-cover border border-slate-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Invalid';
              }}
            />
            <span className="text-sm text-slate-600">Image preview</span>
          </div>
        )}

        {/* Descriptions */}
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

        {/* Lists */}
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

        {/* Usage & Scientific Info */}
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

        {/* Featured Toggle */}
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
        return <Badge variant="purple">{catName || 'Unknown'}</Badge>;
      },
    },
    {
      key: 'price',
      header: 'Price',
      align: 'right',
      render: (product) => (
        <span className="font-medium text-slate-900">
          {product.price ? `₹${product.price.toLocaleString()}` : '-'}
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
          <Button onClick={openCreateModal} icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
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
        actions={(product) => (
          <>
            <ActionButton onClick={() => openEditModal(product)}>Edit</ActionButton>
            <ActionButton variant="danger" onClick={() => setDeleteTarget(product)}>
              Delete
            </ActionButton>
          </>
        )}
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
