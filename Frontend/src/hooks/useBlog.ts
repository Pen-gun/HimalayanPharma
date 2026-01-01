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
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data, // Ensure stable reference
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
