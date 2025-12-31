# Frontend-Backend Integration Guide

## Setup

### 1. Install Dependencies in Frontend

```bash
cd Frontend
npm install
```

### 2. Setup API Client (Optional but recommended)

Create a utility file for API calls:

**`Frontend/src/utils/api.ts`**

```typescript
const API_BASE_URL = 'http://localhost:5000/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  count?: number;
  total?: number;
  pages?: number;
  currentPage?: number;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      (headers as any)['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
```

### 3. Update Frontend Configuration (if needed)

If running on a different port, update `API_BASE_URL`:

```typescript
// Development
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Production (update with your backend URL)
const API_BASE_URL = 'https://api.himalayanpharma.works/api/v1';
```

## Usage Examples

### Fetching Products

```typescript
import { useEffect, useState } from 'react';
import { apiClient } from '../utils/api';
import { Product } from '../data/mockData';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>('/products?page=1&limit=10');
        setProducts(response.data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Filtering Products

```typescript
// Search products
const response = await apiClient.get<Product[]>(
  '/products?search=ashwagandha'
);

// Filter by category
const response = await apiClient.get<Product[]>(
  '/products?category=Pharmaceuticals'
);

// Pagination
const response = await apiClient.get<Product[]>(
  '/products?page=2&limit=20'
);

// Combined
const response = await apiClient.get<Product[]>(
  '/products?category=Pharmaceuticals&search=ashwagandha&page=1&limit=10'
);
```

### Fetching Featured Products

```typescript
const response = await apiClient.get<Product[]>('/products/featured');
const featuredProducts = response.data || [];
```

### Fetching Blog Posts

```typescript
// Get all blog posts
const response = await apiClient.get<BlogPost[]>('/blog?page=1&limit=10');

// Filter by category
const response = await apiClient.get<BlogPost[]>('/blog?category=Science');

// Search
const response = await apiClient.get<BlogPost[]>('/blog?search=ashwagandha');
```

### Authentication (Login/Register)

```typescript
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (response.data?.token) {
        apiClient.setToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Creating Products (Protected)

```typescript
const response = await apiClient.post('/products', {
  name: 'New Product',
  category: 'category_id',
  price: '$25',
  image: 'https://example.com/image.jpg',
  shortDescription: 'Short description',
  description: 'Full description',
  benefits: ['benefit1', 'benefit2'],
  ingredients: ['ingredient1', 'ingredient2'],
  usage: 'Usage instructions',
  tags: ['tag1', 'tag2'],
  featured: true,
});

const newProduct = response.data;
```

## Using React Query (Recommended)

Install React Query:

```bash
npm install @tanstack/react-query
```

Setup in `main.tsx`:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Example with React Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../utils/api';
import { Product } from '../data/mockData';

export function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.get<Product[]>('/products');
      return response.data || [];
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Filtered Products with React Query

```typescript
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const page = searchParams.get('page') || '1';

  const { data: response, isLoading } = useQuery({
    queryKey: ['products', category, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== 'All') {
        params.append('category', category);
      }
      params.append('page', page);
      params.append('limit', '10');

      return apiClient.get<Product[]>(`/products?${params}`);
    },
  });

  return (
    <div>
      {response?.data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div>
        Page {response?.currentPage} of {response?.pages}
      </div>
    </div>
  );
}
```

## Error Handling

```typescript
async function fetchWithErrorHandling() {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        // Unauthorized - clear token and redirect to login
        apiClient.clearToken();
        // Redirect to login page
      } else if (error.message.includes('404')) {
        // Not found
        console.error('Resource not found');
      } else {
        console.error('API Error:', error.message);
      }
    }
  }
}
```

## Implementing Admin Panel Features

### Create/Edit Product Form

```typescript
import { useState } from 'react';
import { apiClient } from '../utils/api';

export function ProductForm({ productId }: { productId?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    shortDescription: '',
    description: '',
    benefits: [],
    ingredients: [],
    usage: '',
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (productId) {
        // Update
        await apiClient.put(`/products/${productId}`, formData);
      } else {
        // Create
        await apiClient.post('/products', formData);
      }
      alert('Product saved successfully');
    } catch (error) {
      alert('Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">
        {productId ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
}
```

## Token Management

```typescript
// Check if user is logged in
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Get stored user data
function getStoredUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Logout
function logout() {
  apiClient.clearToken();
  localStorage.removeItem('user');
  // Redirect to login page
}

// Protected Route Component
export function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
```

## Environment Variables

Create `Frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Update API client to use it:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
```

## Testing the Integration

1. **Start Backend**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Test Endpoints**
   - Open http://localhost:5173
   - Check browser console for any errors
   - Verify products are loading from API

## Deployment Considerations

### Update API Base URL for Production

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.himalayanpharma.works/api/v1'
  : 'http://localhost:5000/api/v1';
```

### Add Request Timeout

```typescript
async request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    // ... rest of code
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

**Happy integrating! 🚀**
