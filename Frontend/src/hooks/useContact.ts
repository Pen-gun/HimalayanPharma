import { useMutation} from '@tanstack/react-query';
import { api } from '../lib/api';

// Send contact message

export const useContact = () => {
  return useMutation({
    mutationKey: ['contact', 'sendMessage'],
    mutationFn: (data: { fullName: string; email: string; message: string }) => api.contact.sendMessage(data),
  });
};