import axios from 'axios';

// API Base URL - Use environment variable or fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Validate API URL in production
if (import.meta.env.PROD && API_BASE_URL.includes('localhost')) {
  // Using localhost API URL in production build
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Add auth token if exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types matching backend responses
export interface Contact{
    fullName: string;
    email: string;
    message: string;
}

export interface Product {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  tags: string[];
  featured?: boolean;
  scientificInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  category: 'Science' | 'Commitments' | 'R&D' | 'Wellness' | 'News';
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  pages: number;
  currentPage: number;
  data: T[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// API Methods
export const api = {
  // Products
  products: {
    getAll: async (params?: {
      category?: string;
      search?: string;
      page?: number;
      limit?: number;
    }) => {
      const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', { params });
      return data;
    },
    
    getFeatured: async () => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>('/products/featured');
      return data;
    },
    
    getById: async (id: string) => {
      const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
      return data;
    },
  },

  // Categories
  categories: {
    getAll: async () => {
      const { data } = await apiClient.get<ApiResponse<Category[]>>('/categories');
      return data;
    },
    
    getById: async (id: string) => {
      const { data } = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
      return data;
    },
  },

  // Blog
  blog: {
    getAll: async (params?: {
      category?: string;
      search?: string;
      page?: number;
      limit?: number;
    }) => {
      const { data } = await apiClient.get<PaginatedResponse<BlogPost>>('/blog', { params });
      return data;
    },
    
    getById: async (id: string) => {
      const { data } = await apiClient.get<ApiResponse<BlogPost>>(`/blog/${id}`);
      return data;
    },
  },
    // Contact
    contact: {
    sendMessage: async (messageData: { fullName: string; email: string; message: string }) => {
      const { data } = await apiClient.post<ApiResponse<null>>('/contact', messageData);
      return data;
    },
  },

  // Auth
  auth: {
    register: async (userData: { name: string; email: string; password: string }) => {
      const { data } = await apiClient.post('/auth/register', userData);
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data;
    },
    
    login: async (credentials: { email: string; password: string }) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      if (data.data?.token) {
        localStorage.setItem('token', data.data.token);
      }
      return data;
    },
    
    getMe: async () => {
      const { data } = await apiClient.get('/auth/me');
      return data;
    },
    
    logout: () => {
      localStorage.removeItem('token');
    },
  },

  // Cart
  cart: {
    get: async () => {
      const { data } = await apiClient.get('/cart');
      return data;
    },

    add: async (productId: string, quantity: number) => {
      const { data } = await apiClient.post('/cart/add', { productId, quantity });
      return data;
    },

    remove: async (productId: string) => {
      const { data } = await apiClient.post('/cart/remove', { productId });
      return data;
    },

    clear: async () => {
      const { data } = await apiClient.delete('/cart/clear');
      return data;
    },
  },
};

