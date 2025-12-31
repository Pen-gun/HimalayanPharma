# Himalayan Pharma Works - Backend API

A comprehensive REST API for the Himalayan Pharma Works wellness and pharmaceutical company website. Built with Node.js, Express, MongoDB, and featuring JWT-based authentication.

## 🚀 Features

- **Complete REST API** for products, categories, and blog management
- **JWT Authentication** for secure admin access
- **MongoDB with Mongoose** for robust data modeling
- **Express.js** for lightweight, scalable server
- **Input Validation** with express-validator
- **Password Hashing** with bcryptjs
- **CORS** enabled for cross-origin requests
- **Morgan** logging middleware
- **Error Handling** with global error handler middleware
- **Database Seeding** script with sample data

## 📋 Tech Stack

- **Node.js** 18+
- **Express.js** 5.x
- **MongoDB** 4.0+
- **Mongoose** 9.x
- **JWT (jsonwebtoken)** 9.x
- **bcryptjs** 2.x
- **Express-validator** 7.x
- **Morgan** 1.x
- **CORS** 2.x
- **Nodemon** (dev dependency)

## 📁 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── categoryController.js    # Category CRUD
│   │   ├── productController.js     # Product CRUD with filtering
│   │   └── blogController.js        # Blog CRUD
│   ├── models/
│   │   ├── User.js                  # User model (admin)
│   │   ├── Category.js              # Category model
│   │   ├── Product.js               # Product model
│   │   └── Blog.js                  # Blog model
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── categoryRoutes.js        # Category endpoints
│   │   ├── productRoutes.js         # Product endpoints
│   │   └── blogRoutes.js            # Blog endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorHandler.js          # Global error handler
│   ├── seed/
│   │   └── seedData.js              # Database seeding
│   ├── app.js                       # Express app setup
│   └── index.js                     # Server entry point
├── public/
│   └── temp/
├── .env.example                     # Environment variables template
├── package.json
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Update .env.local with your configuration:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/himalayanpharma
   JWT_SECRET=your_strong_secret_key
   JWT_EXPIRE=30d
   ```

4. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Or start production server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000/api/v1`

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints (`/auth`)

#### Register (Admin only)
```
POST /auth/register
Body: {
  "name": "John Admin",
  "email": "admin@example.com",
  "password": "securepassword123"
}
Response: {
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id", "name", "email", "role" },
    "token": "jwt_token_here"
  }
}
```

#### Login
```
POST /auth/login
Body: {
  "email": "admin@himalayanpharma.works",
  "password": "admin123"
}
Response: {
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id", "name", "email", "role" },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```
GET /auth/me
Headers: { "Authorization": "Bearer {token}" }
Response: {
  "success": true,
  "data": {
    "user": { "id", "name", "email", "role" }
  }
}
```

### Categories Endpoints (`/categories`)

#### Get All Categories
```
GET /categories
Response: {
  "success": true,
  "count": 6,
  "data": [
    { "_id", "name", "description", "createdAt", "updatedAt" },
    ...
  ]
}
```

#### Get Category by ID
```
GET /categories/:id
Response: {
  "success": true,
  "data": { "_id", "name", "description", ... }
}
```

#### Create Category (Protected)
```
POST /categories
Headers: { "Authorization": "Bearer {token}" }
Body: {
  "name": "New Category",
  "description": "Category description"
}
Response: {
  "success": true,
  "message": "Category created successfully",
  "data": { "_id", "name", "description", ... }
}
```

#### Update Category (Protected)
```
PUT /categories/:id
Headers: { "Authorization": "Bearer {token}" }
Body: {
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Category (Protected)
```
DELETE /categories/:id
Headers: { "Authorization": "Bearer {token}" }
```

### Products Endpoints (`/products`)

#### Get All Products (with filters and pagination)
```
GET /products?category=Pharmaceuticals&search=ashwagandha&page=1&limit=10
Response: {
  "success": true,
  "count": 2,
  "total": 2,
  "pages": 1,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "name": "Ashwagandha+ Restore",
      "category": { "_id", "name", ... },
      "price": "$16",
      "image": "url",
      "shortDescription": "...",
      "description": "...",
      "benefits": [...],
      "ingredients": [...],
      "usage": "...",
      "tags": [...],
      "featured": true,
      "createdAt": "...",
      "updatedAt": "..."
    },
    ...
  ]
}
```

#### Get Product by ID
```
GET /products/:id
Response: {
  "success": true,
  "data": { ... product object ... }
}
```

#### Get Featured Products
```
GET /products/featured
Response: {
  "success": true,
  "count": 6,
  "data": [ ... featured products ... ]
}
```

#### Create Product (Protected)
```
POST /products
Headers: { "Authorization": "Bearer {token}" }
Body: {
  "name": "Product Name",
  "category": "category_id",
  "price": "$20",
  "image": "image_url",
  "shortDescription": "Short description",
  "description": "Full description",
  "benefits": ["benefit1", "benefit2"],
  "ingredients": ["ingredient1", "ingredient2"],
  "usage": "Usage instructions",
  "tags": ["tag1", "tag2"],
  "featured": true,
  "scientificInfo": "Scientific information (optional)"
}
```

#### Update Product (Protected)
```
PUT /products/:id
Headers: { "Authorization": "Bearer {token}" }
Body: { ...same as create... }
```

#### Delete Product (Protected)
```
DELETE /products/:id
Headers: { "Authorization": "Bearer {token}" }
```

### Blog Endpoints (`/blog`)

#### Get All Blog Posts (with pagination)
```
GET /blog?page=1&limit=10&category=Science&search=keyword
Response: {
  "success": true,
  "count": 3,
  "total": 3,
  "pages": 1,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "title": "Blog Title",
      "excerpt": "Short excerpt",
      "content": "Full blog content",
      "author": "Author Name",
      "image": "image_url",
      "category": "Science",
      "tags": ["tag1", "tag2"],
      "publishedAt": "2025-11-18T...",
      "createdAt": "...",
      "updatedAt": "..."
    },
    ...
  ]
}
```

#### Get Blog Post by ID
```
GET /blog/:id
Response: {
  "success": true,
  "data": { ... blog object ... }
}
```

#### Create Blog Post (Protected)
```
POST /blog
Headers: { "Authorization": "Bearer {token}" }
Body: {
  "title": "Blog Title",
  "excerpt": "Short excerpt (max 300 chars)",
  "content": "Full blog content",
  "author": "Author Name (optional, defaults to 'Himalayan Pharma Works')",
  "image": "image_url (optional)",
  "category": "Science|Commitments|R&D|Wellness|News",
  "tags": ["tag1", "tag2"],
  "publishedAt": "2025-12-31T00:00:00Z (optional)"
}
```

#### Update Blog Post (Protected)
```
PUT /blog/:id
Headers: { "Authorization": "Bearer {token}" }
Body: { ...same as create... }
```

#### Delete Blog Post (Protected)
```
DELETE /blog/:id
Headers: { "Authorization": "Bearer {token}" }
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require:

```
Authorization: Bearer {token}
```

**How to authenticate:**

1. Login or register to get a token
2. Include the token in the `Authorization` header for protected endpoints
3. Token expires in 30 days by default

**Token payload:**
```json
{
  "id": "user_id",
  "role": "admin|editor"
}
```

## 📊 Database Models

### User
- `name` (String, required)
- `email` (String, unique, required)
- `password` (String, hashed, required)
- `role` (String: admin|editor, default: admin)
- `createdAt`, `updatedAt` (Dates)

### Category
- `name` (String, unique, required)
- `description` (String)
- `createdAt`, `updatedAt` (Dates)

### Product
- `name` (String, required)
- `category` (ObjectId, ref: Category, required)
- `price` (String)
- `image` (String, URL)
- `shortDescription` (String, required)
- `description` (String, required)
- `benefits` (Array of Strings)
- `ingredients` (Array of Strings)
- `usage` (String, required)
- `tags` (Array of Strings)
- `featured` (Boolean, default: false)
- `scientificInfo` (String, optional)
- `createdAt`, `updatedAt` (Dates)

### Blog
- `title` (String, required)
- `excerpt` (String, required)
- `content` (String, required)
- `author` (String, default: 'Himalayan Pharma Works')
- `image` (String, URL)
- `category` (String: Science|Commitments|R&D|Wellness|News)
- `tags` (Array of Strings)
- `publishedAt` (Date, default: now)
- `createdAt`, `updatedAt` (Dates)

## 🔌 Sample Data

The seeding script (`npm run seed`) creates:

- **6 Categories:** Pharmaceuticals, Personal Care, Baby Care, Men's Health, Women's Health, Animal Health
- **12 Products:** Including Liv.52 DS, Ashwagandha+ Restore, Neem Face Wash, Rumalaya Gel, etc.
- **3 Blog Posts:** Science, Commitments, and R&D focused
- **1 Admin User:**
  - Email: `admin@himalayanpharma.works`
  - Password: `admin123`

## 📝 Query Parameters

### Products Endpoint

```
GET /products?category=Pharmaceuticals&search=ashwagandha&page=2&limit=5
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | String | All | Filter by category name |
| `search` | String | - | Search by name, description, or short description |
| `page` | Number | 1 | Page number for pagination |
| `limit` | Number | 10 | Number of items per page |

### Blog Endpoint

```
GET /blog?category=Science&search=ashwagandha&page=1&limit=10
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | String | - | Filter by category |
| `search` | String | - | Search by title, content, or excerpt |
| `page` | Number | 1 | Page number for pagination |
| `limit` | Number | 10 | Number of items per page |

## 🛠️ Scripts

```bash
# Development server with hot reload
npm run dev

# Production server
npm start

# Seed database with sample data
npm run seed
```

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Vite frontend default)
- `http://localhost:3000` (React dev server default)
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`

To add more origins, update the `cors` configuration in `src/app.js`.

## 🐛 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["field-specific errors (if validation fails)"]
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 📚 Integration with Frontend

### Setup React Query (or TanStack Query)

```javascript
// Example fetch for products
const { data: products } = useQuery(['products'], async () => {
  const response = await fetch('http://localhost:5000/api/v1/products');
  return response.json();
});

// Example fetch with filters
const { data: products } = useQuery(
  ['products', { category, page }],
  async () => {
    const params = new URLSearchParams({ category, page });
    const response = await fetch(`http://localhost:5000/api/v1/products?${params}`);
    return response.json();
  }
);

// Example authenticated request
const { data: user } = useQuery(['user'], async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
});
```

## 🚀 Deployment

### Environment Variables for Production

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/himalayanpharma
JWT_SECRET=very_long_and_secure_secret_key_minimum_32_characters
JWT_EXPIRE=30d
```

### Deploy to Heroku, Render, or Railway

Make sure to set environment variables in the hosting platform's dashboard.

## 📖 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Validator](https://express-validator.github.io/docs/)

## 📄 License

MIT License - feel free to use this template for your projects.

## 👥 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for Himalayan Pharma Works**
