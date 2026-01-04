/**
 * Blog Manager Component
 * Full CRUD for blog posts with rich content editing
 */
import { useState, useMemo, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, type BlogPost } from '../../lib/api';
import { useBlogMutations } from '../../hooks/useAdminMutations';
import { notifyToast } from '../../utils/admin';

// UI Components
import { Modal } from './ui/Modal';
import { DataTable, ActionButton, type Column } from './ui/DataTable';
import { FormField, FormTextArea, FormSelect } from './ui/FormFields';
import { SearchFilter, Pagination } from './ui/SearchFilter';
import { PageHeader, Button } from './ui/PageHeader';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { Badge, TagList } from './ui/Badge';

// Types
interface BlogFormState {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  category: BlogPost['category'] | '';
  tags: string;
}

const INITIAL_FORM: BlogFormState = {
  title: '',
  excerpt: '',
  content: '',
  author: 'Himalayan Pharma Works',
  image: '',
  category: '',
  tags: '',
};

const BLOG_CATEGORIES: BlogPost['category'][] = ['Science', 'Commitments', 'R&D', 'Wellness', 'News'];

// Helper
const parseList = (value: string): string[] =>
  value.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);

// Blog Form Modal
const BlogFormModal = ({
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
  form: BlogFormState;
  onChange: (updates: Partial<BlogFormState>) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}) => {
  const categoryOptions = BLOG_CATEGORIES.map((c) => ({ value: c, label: c }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
      size="xl"
    >
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title */}
        <FormField
          label="Title"
          value={form.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Enter blog post title"
          required
          helpText="Max 200 characters"
        />

        {/* Meta Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormSelect
            label="Category"
            value={form.category}
            onChange={(e) => onChange({ category: e.target.value as BlogPost['category'] })}
            options={categoryOptions}
            placeholder="Select category"
          />
          <FormField
            label="Author"
            value={form.author}
            onChange={(e) => onChange({ author: e.target.value })}
            placeholder="Author name"
          />
        </div>

        {/* Image URL */}
        <FormField
          label="Featured Image URL"
          value={form.image}
          onChange={(e) => onChange({ image: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />

        {/* Preview if image exists */}
        {form.image && (
          <div className="p-3 bg-slate-50 rounded-lg">
            <img
              src={form.image}
              alt="Preview"
              className="h-32 w-full rounded-lg object-cover border border-slate-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
              }}
            />
          </div>
        )}

        {/* Excerpt */}
        <FormTextArea
          label="Excerpt"
          value={form.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          placeholder="Brief summary shown in blog listings..."
          rows={2}
          required
          helpText="Max 300 characters"
        />

        {/* Content */}
        <FormTextArea
          label="Content"
          value={form.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Full blog post content... (Markdown supported)"
          rows={12}
          required
          helpText="Write your full blog post content. Markdown formatting is supported."
        />

        {/* Tags */}
        <FormField
          label="Tags"
          value={form.tags}
          onChange={(e) => onChange({ tags: e.target.value })}
          placeholder="health, wellness, ayurveda"
          helpText="Comma-separated tags for better discoverability"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditing ? 'Update Post' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Main Blog Manager Component
export const BlogManager = () => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<BlogFormState>(INITIAL_FORM);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const ITEMS_PER_PAGE = 10;

  // Queries
  const { data: blogRes, isFetching } = useQuery({
    queryKey: ['admin-blog'],
    queryFn: () => api.blog.getAll({ limit: 500 }),
  });

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useBlogMutations();

  const allPosts = useMemo(() => blogRes?.data || [], [blogRes?.data]);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let result = allPosts;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.excerpt?.toLowerCase().includes(searchLower) ||
          p.author?.toLowerCase().includes(searchLower) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    return result;
  }, [allPosts, search, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Handlers
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

  const openEditModal = (post: BlogPost) => {
    setForm({
      _id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author || 'Himalayan Pharma Works',
      image: post.image || '',
      category: post.category || '',
      tags: (post.tags || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      notifyToast('warning', 'Title, excerpt, and content are required');
      return;
    }

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      author: form.author.trim() || 'Himalayan Pharma Works',
      image: form.image.trim(),
      category: form.category || undefined,
      tags: parseList(form.tags),
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

  // Category badge colors
  const categoryColors: Record<string, 'info' | 'success' | 'purple' | 'warning' | 'danger'> = {
    Science: 'info',
    Commitments: 'success',
    'R&D': 'purple',
    Wellness: 'warning',
    News: 'danger',
  };

  // Table columns
  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      header: 'Post',
      render: (post) => (
        <div className="flex items-center gap-3">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="h-12 w-16 rounded-lg object-cover border border-slate-200 hidden sm:block"
            />
          )}
          <div>
            <p className="font-medium text-slate-900 line-clamp-1">{post.title}</p>
            <p className="text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (post) =>
        post.category ? (
          <Badge variant={categoryColors[post.category] || 'default'}>{post.category}</Badge>
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      key: 'author',
      header: 'Author',
      render: (post) => <span className="text-sm text-slate-600">{post.author}</span>,
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (post) =>
        post.tags?.length ? (
          <TagList tags={post.tags} maxVisible={2} />
        ) : (
          <span className="text-slate-400">-</span>
        ),
    },
    {
      key: 'publishedAt',
      header: 'Published',
      render: (post) => (
        <span className="text-sm text-slate-600">
          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
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
      key: 'category',
      label: 'All Categories',
      options: BLOG_CATEGORIES.map((c) => ({ value: c, label: c })),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog Posts"
        description={`${allPosts.length} articles published`}
        actions={
          <Button
            onClick={openCreateModal}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            New Post
          </Button>
        }
      />

      {/* Search and Filters */}
      <SearchFilter
        searchValue={search}
        onSearchChange={handleSearch}
        placeholder="Search posts by title, excerpt, author, or tags..."
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
      />

      {/* Results Summary */}
      {(search || Object.values(filters).some(Boolean)) && (
        <p className="text-sm text-slate-600">
          Found <strong>{filteredPosts.length}</strong> posts
          {search && <> matching "{search}"</>}
        </p>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedPosts}
        keyExtractor={(p) => p._id}
        isLoading={isFetching}
        emptyTitle="No blog posts found"
        emptyDescription={search ? 'Try adjusting your search or filters' : 'Create your first blog post to share news and insights'}
        actions={(post) => (
          <>
            <ActionButton onClick={() => openEditModal(post)}>Edit</ActionButton>
            <ActionButton variant="danger" onClick={() => setDeleteTarget(post)}>
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
          totalItems={filteredPosts.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}

      {/* Blog Form Modal */}
      <BlogFormModal
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
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Post"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default BlogManager;
