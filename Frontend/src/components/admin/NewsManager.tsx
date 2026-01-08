/**
 * News Manager Component
 * Full CRUD for company news items
 */
import { useState, useMemo, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type NewsItem } from '../../lib/api';
import { useNewsMutations } from '../../hooks/useAdminMutations';
import { notifyToast } from '../../utils/admin';

// UI Components
import { Modal } from './ui/Modal';
import { DataTable, ActionButton, type Column } from './ui/DataTable';
import { FormField, FormTextArea, FormCheckbox } from './ui/FormFields';
import { SearchFilter, Pagination } from './ui/SearchFilter';
import { PageHeader, Button } from './ui/PageHeader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Badge, TagList } from './ui/Badge';

// Types
interface NewsFormState {
  _id?: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  coverImage: string;
  tags: string;
  isPublished: boolean;
  publishedAt: string;
}

const INITIAL_FORM: NewsFormState = {
  title: '',
  summary: '',
  content: '',
  author: 'Himalayan Pharma Works',
  coverImage: '',
  tags: '',
  isPublished: true,
  publishedAt: '',
};

const parseList = (value: string): string[] =>
  value.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);

const toDateInputValue = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

const NewsFormModal = ({
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
  form: NewsFormState;
  onChange: (updates: Partial<NewsFormState>) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit News Item' : 'Create News Item'}
      size="xl"
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          label="Title"
          value={form.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Enter news title"
          required
          helpText="Max 200 characters"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Author"
            value={form.author}
            onChange={(e) => onChange({ author: e.target.value })}
            placeholder="Author name"
            required
          />
          <FormField
            label="Published Date"
            type="date"
            value={form.publishedAt}
            onChange={(e) => onChange({ publishedAt: e.target.value })}
            helpText="Optional: set the visible publish date"
          />
        </div>

        <FormField
          label="Cover Image URL"
          value={form.coverImage}
          onChange={(e) => onChange({ coverImage: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />

        {form.coverImage && (
          <div className="p-3 bg-slate-50 rounded-lg">
            <img
              src={form.coverImage}
              alt="Preview"
              className="h-32 w-full rounded-lg object-cover border border-slate-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
              }}
            />
          </div>
        )}

        <FormTextArea
          label="Summary"
          value={form.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          placeholder="Short summary shown in listings..."
          rows={2}
          required
          helpText="Max 500 characters"
        />

        <FormTextArea
          label="Content"
          value={form.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Full news content..."
          rows={10}
          required
        />

        <FormField
          label="Tags"
          value={form.tags}
          onChange={(e) => onChange({ tags: e.target.value })}
          placeholder="press, regulatory, csr"
          helpText="Comma-separated tags"
        />

        <FormCheckbox
          label="Published"
          checked={form.isPublished}
          onChange={(e) => onChange({ isPublished: e.target.checked })}
          description="Unpublished items stay hidden from the public site"
        />

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditing ? 'Update News' : 'Publish News'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export const NewsManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<NewsFormState>(INITIAL_FORM);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  const ITEMS_PER_PAGE = 10;

  const { data: newsRes, isFetching } = useQuery({
    queryKey: ['admin-news'],
    queryFn: () => api.news.getAll({ limit: 500 }),
  });

  const { createMutation, updateMutation, deleteMutation } = useNewsMutations();

  const allItems = useMemo(() => newsRes?.data || [], [newsRes?.data]);

  const filteredItems = useMemo(() => {
    let result = allItems;

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(searchLower) ||
          n.summary?.toLowerCase().includes(searchLower) ||
          n.author?.toLowerCase().includes(searchLower) ||
          n.tags?.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    if (filters.status) {
      result = result.filter((n) =>
        filters.status === 'published' ? n.isPublished : !n.isPublished
      );
    }

    return result;
  }, [allItems, search, filters]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const openCreateModal = () => {
    setForm(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setForm({
      _id: item._id,
      title: item.title,
      summary: item.summary,
      content: item.content,
      author: item.author || 'Himalayan Pharma Works',
      coverImage: item.coverImage || '',
      tags: (item.tags || []).join(', '),
      isPublished: item.isPublished,
      publishedAt: toDateInputValue(item.publishedAt || null),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      notifyToast('warning', 'Title, summary, and content are required');
      return;
    }

    const payload = {
      title: form.title.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
      author: form.author.trim() || 'Himalayan Pharma Works',
      coverImage: form.coverImage.trim(),
      tags: parseList(form.tags),
      isPublished: form.isPublished,
      publishedAt: form.isPublished && form.publishedAt
        ? new Date(form.publishedAt).toISOString()
        : null,
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

  const columns: Column<NewsItem>[] = [
    {
      key: 'title',
      header: 'News',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.coverImage && (
            <img
              src={item.coverImage}
              alt={item.title}
              className="h-12 w-16 rounded-lg object-cover border border-slate-200 hidden sm:block"
            />
          )}
          <div>
            <p className="font-medium text-slate-900 line-clamp-1">{item.title}</p>
            <p className="text-xs text-slate-500 line-clamp-1">{item.summary}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <Badge variant={item.isPublished ? 'success' : 'warning'}>
          {item.isPublished ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      render: (item) => <span className="text-sm text-slate-600">{item.author}</span>,
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (item) =>
        item.tags?.length ? (
          <TagList tags={item.tags} maxVisible={2} />
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      key: 'publishedAt',
      header: 'Published',
      render: (item) => (
        <span className="text-sm text-slate-600">
          {new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      key: 'status',
      label: 'All Statuses',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="News"
        description={`${allItems.length} items total`}
        actions={
          <Button
            onClick={openCreateModal}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            New Item
          </Button>
        }
      />

      <SearchFilter
        searchValue={search}
        onSearchChange={handleSearch}
        placeholder="Search news by title, summary, author, or tags..."
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
      />

      {(search || Object.values(filters).some(Boolean)) && (
        <p className="text-sm text-slate-600">
          Found <strong>{filteredItems.length}</strong> items
          {search && <> matching "{search}"</>}
        </p>
      )}

      <DataTable
        columns={columns}
        data={paginatedItems}
        keyExtractor={(n) => n._id}
        isLoading={isFetching}
        emptyTitle="No news items found"
        emptyDescription={search ? 'Try adjusting your search or filters' : 'Create your first company update'}
        actions={(item) => (
          <>
            <ActionButton onClick={() => openEditModal(item)}>Edit</ActionButton>
            <ActionButton variant="danger" onClick={() => setDeleteTarget(item)}>
              Delete
            </ActionButton>
          </>
        )}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filteredItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}

      <NewsFormModal
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

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete News Item"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Item"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default NewsManager;
