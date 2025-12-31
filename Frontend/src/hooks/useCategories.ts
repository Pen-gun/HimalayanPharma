import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.categories.getAll(),
  });
};

// Get single category by ID
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => api.categories.getById(id),
    enabled: !!id,
  });
};
