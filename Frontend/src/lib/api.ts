import axios, { AxiosError,type InternalAxiosRequestConfig } from 'axios';

// API Base URL - Use environment variable or fallback
const API_BASE_URL = import.meta.env.VITE_API_URL;

// ============================================
// Token Management (in-memory for security)
// ============================================
let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

export const setAccessToken = (token: string | null, expiresIn?: number) => {
  accessToken = token;
  if (token && expiresIn) {
    // Set expiry time with 30 second buffer before actual expiry
    tokenExpiresAt = Date.now() + (expiresIn * 1000) - 30000;
  } else {
    tokenExpiresAt = null;
  }
};

export const getAccessToken = () => accessToken;
export const clearAccessToken = () => {
  accessToken = null;
  tokenExpiresAt = null;
};

export const isTokenExpiringSoon = () => {
  if (!tokenExpiresAt) return true;
  return Date.now() >= tokenExpiresAt;
};

// ============================================
// Refresh Token Queue Management
// ============================================
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// ============================================
// Axios Instance Configuration
// ============================================
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
  withCredentials: true, // CRITICAL: Send cookies with requests (for refresh token)
});

// ============================================
// Request Interceptor
// ============================================
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip auth for public endpoints
    const publicEndpoints = ['/auth/login', '/auth/register', '/auth/refresh'];
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url?.includes(endpoint)
    );
    
    if (!isPublicEndpoint && accessToken) {
      // Check if token is expiring soon and proactively refresh
      if (isTokenExpiringSoon() && !config.url?.includes('/auth/refresh')) {
        try {
          await refreshAccessToken();
        } catch (error) {
          // Refresh failed, continue with existing token
          // The response interceptor will handle 401
        }
      }
      
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================
// Response Interceptor with Token Refresh
// ============================================
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if this is a refresh request failing
      if (originalRequest.url?.includes('/auth/refresh')) {
        // Refresh token is invalid - clear everything and redirect
        clearAccessToken();
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }
      
      // Start refreshing
      isRefreshing = true;
      
      try {
        const newToken = await refreshAccessToken();
        onTokenRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

// ============================================
// Token Refresh Function
// ============================================
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true } // Send refresh token cookie
    );
    
    const { accessToken: newToken, expiresIn } = response.data.data;
    setAccessToken(newToken, expiresIn);
    return newToken;
  } catch (error) {
    clearAccessToken();
    throw error;
  }
};

// Types matching backend responses
export interface Contact{
    fullName: string;
    email: string;
    message: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Testimonial {
  id?: string;
  _id?: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface JobListing {
  title: string;
  location: string;
  type: string;
  summary: string;
}

export interface ContactLocation {
  office: string;
  address: string;
  phone: string;
  email: string;
}

export interface SiteContent {
  _id: string;
  testimonials: Testimonial[];
  stats: Stat[];
  scienceHighlights: Highlight[];
  commitments: Highlight[];
  jobs: JobListing[];
  contactLocations: ContactLocation[];
  createdAt?: string;
  updatedAt?: string;
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

    create: async (payload: Partial<Product> & { name: string; category: string }) => {
      const { data } = await apiClient.post<ApiResponse<Product>>('/products', payload);
      return data;
    },

    update: async (id: string, payload: Partial<Product> & { name: string; category: string }) => {
      const { data } = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, payload);
      return data;
    },

    delete: async (id: string) => {
      const { data } = await apiClient.delete<ApiResponse<Product>>(`/products/${id}`);
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

    create: async (payload: { name: string; description?: string }) => {
      const { data } = await apiClient.post<ApiResponse<Category>>('/categories', payload);
      return data;
    },

    update: async (id: string, payload: { name: string; description?: string }) => {
      const { data } = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, payload);
      return data;
    },

    delete: async (id: string) => {
      const { data } = await apiClient.delete<ApiResponse<Category>>(`/categories/${id}`);
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

    create: async (payload: Partial<BlogPost> & { title: string; excerpt: string; content: string }) => {
      const { data } = await apiClient.post<ApiResponse<BlogPost>>('/blog', payload);
      return data;
    },

    update: async (id: string, payload: Partial<BlogPost> & { title: string; excerpt: string; content: string }) => {
      const { data } = await apiClient.put<ApiResponse<BlogPost>>(`/blog/${id}`, payload);
      return data;
    },

    delete: async (id: string) => {
      const { data } = await apiClient.delete<ApiResponse<BlogPost>>(`/blog/${id}`);
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
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken, data.data.expiresIn);
      }
      return data;
    },
    
    login: async (credentials: { email: string; password: string }) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken, data.data.expiresIn);
      }
      return data;
    },
    
    getMe: async () => {
      const { data } = await apiClient.get('/auth/me');
      return data;
    },
    
    refresh: async () => {
      const { data } = await apiClient.post('/auth/refresh');
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken, data.data.expiresIn);
      }
      return data;
    },
    
    logout: async () => {
      try {
        await apiClient.post('/auth/logout');
      } catch (error) {
        // Ignore errors on logout
      } finally {
        clearAccessToken();
      }
    },
    
    logoutAll: async () => {
      try {
        await apiClient.post('/auth/logout-all');
      } catch (error) {
        // Ignore errors on logout
      } finally {
        clearAccessToken();
      }
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

  // Site content
  content: {
    get: async () => {
      const { data } = await apiClient.get<ApiResponse<SiteContent>>('/content');
      return data;
    },

    update: async (payload: SiteContent) => {
      const { data } = await apiClient.put<ApiResponse<SiteContent>>('/content', payload);
      return data;
    },
  },
};

