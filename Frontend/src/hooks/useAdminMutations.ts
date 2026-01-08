import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type SiteContent } from '../lib/api';
import { notifyToast, formatError } from '../utils/admin';

/**
 * Hook for content mutations with unified error/success handling
 */
export const useContentMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: SiteContent) => api.content.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      queryClient.invalidateQueries({ queryKey: ['content'] });
      notifyToast('success', 'Content updated successfully');
    },
    onError: (error) => {
      const message = formatError(error);
      notifyToast('error', `Failed to update content: ${message}`);
    },
  });
};

export const useProductMutations = () => {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: unknown) => api.products.create(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      notifyToast('success', 'Product created successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to create product: ${formatError(error)}`);
    },
  });
  
  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: unknown }) => api.products.update(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      notifyToast('success', 'Product updated successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to update product: ${formatError(error)}`);
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.products.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      notifyToast('success', 'Product deleted successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to delete product: ${formatError(error)}`);
    },
  });
  
  return { createMutation, updateMutation, deleteMutation };
};

/**
 * Hook for blog CRUD mutations
 */
export const useBlogMutations = () => {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: unknown) => api.blog.create(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] });
      notifyToast('success', 'Blog post created successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to create blog post: ${formatError(error)}`);
    },
  });
  
  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: unknown }) => api.blog.update(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] });
      notifyToast('success', 'Blog post updated successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to update blog post: ${formatError(error)}`);
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.blog.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog'] });
      notifyToast('success', 'Blog post deleted successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to delete blog post: ${formatError(error)}`);
    },
  });
  
  return { createMutation, updateMutation, deleteMutation };
};

/**
 * Hook for news CRUD mutations
 */
export const useNewsMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: unknown) => api.news.create(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      notifyToast('success', 'News item created successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to create news item: ${formatError(error)}`);
    },
  });

  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: unknown }) => api.news.update(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      notifyToast('success', 'News item updated successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to update news item: ${formatError(error)}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.news.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      notifyToast('success', 'News item deleted successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to delete news item: ${formatError(error)}`);
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

/**
 * Hook for category CRUD mutations
 */
export const useCategoryMutations = () => {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: unknown) => api.categories.create(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      notifyToast('success', 'Category created successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to create category: ${formatError(error)}`);
    },
  });
  
  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: unknown }) => api.categories.update(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      notifyToast('success', 'Category updated successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to update category: ${formatError(error)}`);
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.categories.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      notifyToast('success', 'Category deleted successfully');
    },
    onError: (error) => {
      notifyToast('error', `Failed to delete category: ${formatError(error)}`);
    },
  });
  
  return { createMutation, updateMutation, deleteMutation };
};
