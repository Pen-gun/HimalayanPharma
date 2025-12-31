import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

// Get all blog posts with filters
export const useBlogPosts = (params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['blog', params],
    queryFn: () => api.blog.getAll(params),
  });
};

// Get single blog post by ID
export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => api.blog.getById(id),
    enabled: !!id,
  });
};
