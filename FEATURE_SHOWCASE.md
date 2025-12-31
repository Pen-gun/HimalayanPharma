# 🌟 Feature Showcase - Himalayan Pharma API

## What You Can Do With This API

---

## 🔐 Authentication System

### 1. Register a New Admin
```bash
POST /api/v1/auth/register
{
  "name": "New Admin",
  "email": "admin@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "New Admin", "email": "admin@example.com", "role": "admin" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login & Get Token
```bash
POST /api/v1/auth/login
{
  "email": "admin@himalayanpharma.works",
  "password": "admin123"
}
```

**Response:** Returns JWT token valid for 30 days

### 3. Access Protected Routes
Include token in header:
```bash
curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/v1/products
```

---

## 📦 Product Management

### 1. View All Products
```bash
GET /api/v1/products
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "total": 12,
  "pages": 2,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "name": "Liv.52 DS",
      "category": { "_id": "...", "name": "Pharmaceuticals" },
      "price": "$18",
      "image": "https://...",
      "shortDescription": "Clinically studied liver support formula",
      "description": "...",
      "benefits": ["Supports liver function", ...],
      "ingredients": ["Capers", "Chicory", ...],
      "usage": "2 tablets twice daily...",
      "tags": ["Clinically tested", "Vegan"],
      "featured": true,
      "createdAt": "...",
      "updatedAt": "..."
    },
    ...
  ]
}
```

### 2. Get Featured Products Only
```bash
GET /api/v1/products/featured
```

Returns only products with `featured: true`

### 3. Search Products
```bash
GET /api/v1/products?search=ashwagandha
```

Searches in:
- Product name
- Description
- Short description

### 4. Filter by Category
```bash
GET /api/v1/products?category=Pharmaceuticals
```

Shows only products in that category

### 5. Advanced Filtering
```bash
GET /api/v1/products?category=Pharmaceuticals&search=ashwagandha&page=1&limit=10
```

Combines:
- Category filtering
- Search
- Pagination

### 6. Create a New Product (Admin Only)
```bash
POST /api/v1/products
Authorization: Bearer {token}
{
  "name": "Turmeric Plus",
  "category": "60b5a3c2f1d2e3f4g5h6i7j8",
  "price": "$22",
  "image": "https://images.unsplash.com/...",
  "shortDescription": "Golden inflammation support",
  "description": "A comprehensive curcumin blend with piperine for absorption enhancement...",
  "benefits": ["Reduces inflammation", "Supports joint health", "Golden spice"],
  "ingredients": ["Turmeric Root", "Piperine", "Ginger"],
  "usage": "1-2 capsules daily with meals",
  "tags": ["Anti-inflammatory", "Turmeric"],
  "featured": true
}
```

### 7. Update a Product (Admin Only)
```bash
PUT /api/v1/products/{productId}
Authorization: Bearer {token}
{
  "price": "$24",
  "featured": false
}
```

### 8. Get Product Details
```bash
GET /api/v1/products/{productId}
```

### 9. Delete a Product (Admin Only)
```bash
DELETE /api/v1/products/{productId}
Authorization: Bearer {token}
```

---

## 🏷️ Category Management

### 1. View All Categories
```bash
GET /api/v1/categories
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    { "_id": "...", "name": "Pharmaceuticals", "description": "..." },
    { "_id": "...", "name": "Personal Care", "description": "..." },
    ...
  ]
}
```

### 2. Get Category Details
```bash
GET /api/v1/categories/{categoryId}
```

### 3. Create New Category (Admin Only)
```bash
POST /api/v1/categories
Authorization: Bearer {token}
{
  "name": "Sports & Fitness",
  "description": "Performance and recovery products"
}
```

### 4. Update Category (Admin Only)
```bash
PUT /api/v1/categories/{categoryId}
Authorization: Bearer {token}
{
  "name": "Sports & Athletic Performance",
  "description": "Updated description"
}
```

### 5. Delete Category (Admin Only)
```bash
DELETE /api/v1/categories/{categoryId}
Authorization: Bearer {token}
```

---

## 📝 Blog Management

### 1. View All Blog Posts
```bash
GET /api/v1/blog?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "pages": 1,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "title": "The Science of Ashwagandha: Adaptogens Explained",
      "excerpt": "How adaptogens help the body respond to stress...",
      "content": "Full blog content here...",
      "author": "Dr. Priya Sharma",
      "image": "https://...",
      "category": "Science",
      "tags": ["Ashwagandha", "Science", "Adaptogens"],
      "publishedAt": "2025-11-18T00:00:00Z",
      "createdAt": "...",
      "updatedAt": "..."
    },
    ...
  ]
}
```

### 2. Filter Posts by Category
```bash
GET /api/v1/blog?category=Science
```

Categories: `Science`, `Commitments`, `R&D`, `Wellness`, `News`

### 3. Search Blog Posts
```bash
GET /api/v1/blog?search=ashwagandha
```

Searches in title, content, and excerpt

### 4. Get Single Blog Post
```bash
GET /api/v1/blog/{blogId}
```

### 5. Create Blog Post (Admin Only)
```bash
POST /api/v1/blog
Authorization: Bearer {token}
{
  "title": "Neem: Nature's Skin Solution",
  "excerpt": "Discover how neem has been used for centuries in Ayurveda...",
  "content": "Neem is a powerful botanical that has been utilized in Ayurvedic medicine for over 5000 years. This comprehensive guide explores...",
  "author": "Dr. Rajesh Kumar",
  "image": "https://images.unsplash.com/...",
  "category": "Science",
  "tags": ["Neem", "Skincare", "Ayurveda"]
}
```

### 6. Update Blog Post (Admin Only)
```bash
PUT /api/v1/blog/{blogId}
Authorization: Bearer {token}
{
  "title": "Updated Title",
  "excerpt": "Updated excerpt"
}
```

### 7. Delete Blog Post (Admin Only)
```bash
DELETE /api/v1/blog/{blogId}
Authorization: Bearer {token}
```

---

## 🔍 Real-World Scenarios

### Scenario 1: Customer Browsing Products

```bash
# 1. Get all categories
GET /api/v1/categories

# 2. Get featured products for homepage
GET /api/v1/products/featured

# 3. Browse by category
GET /api/v1/products?category=Pharmaceuticals

# 4. Search for specific product
GET /api/v1/products?search=ashwagandha

# 5. Get product details
GET /api/v1/products/ashwagandha_id
```

### Scenario 2: Reading Blog

```bash
# 1. Get all blog posts
GET /api/v1/blog

# 2. Filter by category
GET /api/v1/blog?category=Science

# 3. Read specific post
GET /api/v1/blog/science-of-ashwagandha_id

# 4. Search for topic
GET /api/v1/blog?search=sustainability
```

### Scenario 3: Admin Creating Products

```bash
# 1. Login
POST /api/v1/auth/login
← Get token

# 2. Create category
POST /api/v1/categories
Authorization: Bearer token
← Category created

# 3. Create product
POST /api/v1/products
Authorization: Bearer token
← Product created in category

# 4. Update product
PUT /api/v1/products/{id}
Authorization: Bearer token
← Product updated

# 5. Create blog post
POST /api/v1/blog
Authorization: Bearer token
← Blog post created
```

### Scenario 4: Advanced Product Discovery

```bash
# Find Ayurvedic personal care products
GET /api/v1/products?category=Personal Care&search=ayurvedic

# Get paginated results
GET /api/v1/products?page=2&limit=20

# Combine filters
GET /api/v1/products?category=Pharmaceuticals&search=stress&page=1&limit=10
```

---

## 📊 Data Structure Examples

### Product Object
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ashwagandha+ Restore",
  "category": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Pharmaceuticals"
  },
  "price": "$16",
  "image": "https://images.unsplash.com/...",
  "shortDescription": "Stress resilience and restful sleep support.",
  "description": "A potent KSM-66 grade ashwagandha root extract...",
  "benefits": [
    "Supports cortisol balance",
    "Promotes calm focus",
    "Aids restorative sleep"
  ],
  "ingredients": [
    "Ashwagandha Root Extract",
    "Pippali",
    "Ginger"
  ],
  "usage": "1 capsule twice daily with water.",
  "tags": ["Adaptogen", "Non-drowsy"],
  "featured": true,
  "scientificInfo": "Standardized to 5% withanolides...",
  "createdAt": "2025-12-01T10:00:00Z",
  "updatedAt": "2025-12-01T10:00:00Z"
}
```

### Blog Post Object
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "The Science of Ashwagandha: Adaptogens Explained",
  "excerpt": "How adaptogens help the body respond to stress through the HPA axis.",
  "content": "We explore peer-reviewed findings...",
  "author": "Dr. Priya Sharma",
  "image": "https://images.unsplash.com/...",
  "category": "Science",
  "tags": ["Ashwagandha", "Science", "Adaptogens"],
  "publishedAt": "2025-11-18T00:00:00Z",
  "createdAt": "2025-11-18T10:00:00Z",
  "updatedAt": "2025-11-18T10:00:00Z"
}
```

---

## 🎯 Use Cases

### For E-commerce Sites
- Display featured products
- Search and filter products
- Manage inventory
- Publish product updates

### For Wellness Blogs
- Publish health articles
- Categorize content
- Search functionality
- Archive management

### For Admin Panels
- Create/edit/delete products
- Manage categories
- Write blog posts
- View all content

### For Mobile Apps
- List products with pagination
- Search functionality
- Filter by category
- Read blog posts

### For Marketing
- Feature bestselling products
- Publish wellness tips
- Manage brand categories
- Track product performance

---

## 🔒 Security Features

### Protected Operations (Require Admin Token)
- ✅ Create product
- ✅ Update product
- ✅ Delete product
- ✅ Create category
- ✅ Update category
- ✅ Delete category
- ✅ Create blog post
- ✅ Update blog post
- ✅ Delete blog post
- ✅ Register new admin

### Public Operations (No Token Needed)
- ✅ View all products
- ✅ View product details
- ✅ View featured products
- ✅ View all categories
- ✅ View category details
- ✅ View all blog posts
- ✅ View blog post details
- ✅ Search products
- ✅ Filter products
- ✅ Login

---

## 📈 Performance Features

### Pagination
```bash
GET /api/v1/products?page=2&limit=20
```
- Reduces data transfer
- Faster loading
- Better UX

### Search
```bash
GET /api/v1/products?search=keyword
```
- Case-insensitive
- Searches multiple fields
- Instant results

### Filtering
```bash
GET /api/v1/products?category=Pharmaceuticals
```
- Category-based filtering
- Organized browsing
- Focused results

---

## 🚀 API Response Standards

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### List Response with Pagination
```json
{
  "success": true,
  "count": 10,
  "total": 100,
  "pages": 10,
  "currentPage": 1,
  "data": [ ... ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ "field error" ]
}
```

---

## 💡 Integration Examples

### React Component
```typescript
import { useQuery } from '@tanstack/react-query';

function Products() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/v1/products');
      return res.json();
    }
  });

  return (
    <div>
      {data?.data?.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Vue Component
```vue
<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:5000/api/v1/products')
  const data = await res.json()
  products.value = data.data
})
</script>

<template>
  <div v-for="product in products" :key="product._id">
    {{ product.name }}
  </div>
</template>
```

---

## 🎉 Summary

This API provides everything needed to:
- ✅ Display products dynamically
- ✅ Search and filter content
- ✅ Manage admin functions
- ✅ Publish blog content
- ✅ Scale with your business
- ✅ Maintain data security

Ready to build amazing things! 🚀
