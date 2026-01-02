import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type SiteContent } from '../lib/api';

export const useContent = () => {
  return useQuery({
    queryKey: ['content'],
    queryFn: () => api.content.get(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SiteContent) => api.content.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
    },
  });
};
