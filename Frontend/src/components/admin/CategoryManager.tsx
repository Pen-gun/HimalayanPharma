/**
 * Category Manager Component
 * Full CRUD for product categories with inline editing
 */
import { useEffect, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type Category } from '../../lib/api';
import { useCategoryMutations } from '../../hooks/useAdminMutations';
import { notifyToast } from '../../utils/admin';

// UI Components
import { Modal } from './ui/Modal';
import { DataTable, type Column } from './ui/DataTable';
import { FormField, FormTextArea } from './ui/FormFields';
import { SearchFilter } from './ui/SearchFilter';
import { PageHeader, Button } from './ui/PageHeader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Badge } from './ui/Badge';

// Types
interface CategoryFormState {
  _id?: string;
  name: string;
  description: string;
}

const INITIAL_FORM: CategoryFormState = {
  name: '',
  description: '',
};

// Category Form Modal
const CategoryFormModal = ({
  isOpen,
  onClose,
  form,
  onChange,
  onSubmit,
  isSubmitting,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  form: CategoryFormState;
  onChange: (updates: Partial<CategoryFormState>) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Category' : 'Create New Category'}
      size="md"
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          label="Category Name"
          value={form.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g., Herbal Supplements"
          required
          helpText="Max 50 characters, must be unique"
        />

        <FormTextArea
          label="Description"
          value={form.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Brief description of this category..."
          rows={3}
          helpText="Optional - Helps customers understand what products belong here"
        />

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditing ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Main Category Manager Component
export const CategoryManager = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<CategoryFormState>(INITIAL_FORM);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Queries
  const { data: categoriesRes, isFetching } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => api.categories.getAll(),
  });

  // Get product count per category
  const { data: productsRes } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => api.products.getAll({ limit: 500 }),
  });

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useCategoryMutations();

  const categories = categoriesRes?.data || [];
  const products = productsRes?.data || [];

  // Count products per category
  const productCounts = products.reduce((acc, product) => {
    const catId = typeof product.category === 'string' ? product.category : product.category?._id;
    if (catId) {
      acc[catId] = (acc[catId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Filter categories by search
  const filteredCategories = search
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description?.toLowerCase().includes(search.toLowerCase())
      )
    : categories;

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

  const openEditModal = (category: Category) => {
    setForm({
      _id: category._id,
      name: category.name,
      description: category.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      notifyToast('warning', 'Category name is required');
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
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

    // Check if category has products
    const count = productCounts[deleteTarget._id] || 0;
    if (count > 0) {
      notifyToast('error', `Cannot delete category with ${count} products. Move or delete products first.`);
      setDeleteTarget(null);
      return;
    }

    deleteMutation.mutate(deleteTarget._id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  // Table columns
  const columns: Column<Category>[] = [
    {
      key: 'name',
      header: 'Category Name',
      render: (category) => (
        <div>
          <p className="font-semibold text-slate-900">{category.name}</p>
          {category.description && (
            <p className="text-sm text-slate-500 line-clamp-1">{category.description}</p>
          )}
        </div>
      ),
    },
    {
      key: 'products',
      header: 'Products',
      align: 'center',
      render: (category) => {
        const count = productCounts[category._id] || 0;
        return (
          <Badge variant={count > 0 ? 'success' : 'default'}>
            {count} {count === 1 ? 'product' : 'products'}
          </Badge>
        );
      },
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (category) => (
        <span className="text-sm text-slate-600">
          {new Date(category.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description={`${categories.length} categories organizing your products`}
        actions={
          <Button
            onClick={openCreateModal}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Category
          </Button>
        }
      />

      {/* Search */}
      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search categories..."
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        keyExtractor={(c) => c._id}
        isLoading={isFetching}
        emptyTitle="No categories found"
        emptyDescription={search ? 'Try a different search term' : 'Create your first category to organize products'}
        actions={(category, index) => {
          const openUp = index >= filteredCategories.length - 2;
          const menuPosition = openUp ? 'bottom-full mb-2' : 'top-full mt-2';
          return (
          <div className="relative" data-action-menu>
            <button
              type="button"
              onClick={() => setOpenMenuId((prev) => (prev === category._id ? null : category._id))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
              aria-haspopup="menu"
              aria-expanded={openMenuId === category._id}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>
            {openMenuId === category._id && (
              <div className={`absolute right-0 z-20 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg ${menuPosition}`}>
                <button
                  type="button"
                  onClick={() => {
                    openEditModal(category);
                    setOpenMenuId(null);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(category);
                    setOpenMenuId(null);
                  }}
                  disabled={(productCounts[category._id] || 0) > 0}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
        }}
      />

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setForm(INITIAL_FORM);
        }}
        form={form}
        onChange={(updates) => setForm((prev) => ({ ...prev, ...updates }))}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        isEditing={!!form._id}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={
          (productCounts[deleteTarget?._id || ''] || 0) > 0
            ? `This category has ${productCounts[deleteTarget?._id || '']} products. You must move or delete them first.`
            : `Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`
        }
        confirmText="Delete Category"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default CategoryManager;
