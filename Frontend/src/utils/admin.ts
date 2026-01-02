/**
 * Admin utilities for production-grade admin panel
 */

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Simple in-memory toast queue (can be enhanced with proper toast library)
let toastListener: ((toast: Toast) => void) | null = null;

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export const notifyToast = (type: ToastType, message: string, duration = 4000) => {
  const id = `toast-${Date.now()}`;
  const toast: Toast = { id, type, message, duration };
  
  if (toastListener) {
    toastListener(toast);
  } else {
    // Fallback to console if no listener
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
};

export const setToastListener = (listener: (toast: Toast) => void) => {
  toastListener = listener;
};

// Common delete confirmation
export const confirmDelete = (itemName: string = 'this item'): boolean => {
  return window.confirm(`Are you sure you want to delete ${itemName}? This action cannot be undone.`);
};

// Format validation errors
export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

// Safe array update helper
export const updateArrayItem = <T>(array: T[], index: number, updates: Partial<T>): T[] => {
  const newArray = [...array];
  newArray[index] = { ...newArray[index], ...updates };
  return newArray;
};

// Safe array remove helper
export const removeArrayItem = <T>(array: T[], index: number): T[] => {
  return array.filter((_, i) => i !== index);
};

// Create empty item helpers
export const createEmptyStat = () => ({ label: '', value: '' });
export const createEmptyTestimonial = () => ({ name: '', title: '', quote: '', avatar: '' });
export const createEmptyHighlight = () => ({ title: '', description: '' });
export const createEmptyJob = () => ({ title: '', location: '', type: '', summary: '' });
export const createEmptyLocation = () => ({ office: '', address: '', phone: '', email: '' });

// Batch validators
export const validateStats = (stats: { label: string; value: string }[]): string | null => {
  const incomplete = stats.some(s => !s.label || !s.value);
  return incomplete ? 'All stats must have label and value' : null;
};

export const validateTestimonials = (testimonials: { name: string; quote: string; title?: string; avatar?: string }[]): string | null => {
  const incomplete = testimonials.some(t => !t.name || !t.quote);
  return incomplete ? 'All testimonials must have name and quote' : null;
};

export const validateHighlights = (highlights: { title: string; description: string }[]): string | null => {
  const incomplete = highlights.some(h => !h.title || !h.description);
  return incomplete ? 'All highlights must have title and description' : null;
};

export const validateJobs = (jobs: { title: string; location: string; type?: string; summary?: string }[]): string | null => {
  const incomplete = jobs.some(j => !j.title || !j.location);
  return incomplete ? 'All jobs must have title and location' : null;
};

export const validateLocations = (locations: { office: string; address: string; phone?: string; email?: string }[]): string | null => {
  const incomplete = locations.some(l => !l.office || !l.address);
  return incomplete ? 'All locations must have office and address' : null;
};
