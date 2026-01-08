import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export const useNewsItems = (params?: {
  search?: string;
  tag?: string;
  page?: number;
  limit?: number;
  isPublished?: boolean;
}) => {
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => api.news.getAll(params),
    staleTime: 5 * 60 * 1000,
    select: (data) => data,
  });
};

export const useNewsItem = (id: string) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => api.news.getById(id),
    enabled: !!id,
  });
};
