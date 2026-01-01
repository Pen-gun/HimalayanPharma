import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

// Get all products with filters
export const useProducts = (params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => api.products.getAll(params),
  });
};

// Get featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.products.getFeatured(),
    staleTime: 5 * 60 * 1000, // 5 minutes - don't refetch featured products often
    select: (data) => data, // Ensure stable reference
  });
};

// Get single product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.products.getById(id),
    enabled: !!id, // Only run if id exists
  });
};
