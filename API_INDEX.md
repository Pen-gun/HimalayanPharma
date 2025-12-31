# 🏥 Himalayan Pharma Works - Complete Backend REST API

> A production-ready REST API for the Himalayan Pharma Works wellness and pharmaceutical company website

## 📖 Documentation Index

### Getting Started (Start Here!)
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Complete setup guide for both backend and frontend
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick API cheat sheet and troubleshooting

### Backend Documentation
- **[Backend/README.md](./Backend/README.md)** - Complete API documentation with all endpoints
- **[Backend/SETUP_INSTRUCTIONS.md](./Backend/SETUP_INSTRUCTIONS.md)** - Detailed backend setup guide
- **[Backend/COMPLETE_SUMMARY.md](./Backend/COMPLETE_SUMMARY.md)** - Full project overview and features

### Integration & Development
- **[FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)** - How to connect React frontend to the API
- **[Backend/POSTMAN_COLLECTION.json](./Backend/POSTMAN_COLLECTION.json)** - Postman collection for testing

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Setup Backend
cd Backend
npm install
cp .env.example .env.local
npm run seed
npm run dev

# 2. In new terminal, setup Frontend
cd Frontend
npm install
npm run dev

# 3. Open browser
# Frontend: http://localhost:5173
# API: http://localhost:5000/api/v1
```

---

## 📁 What's Included

### Backend API (Node.js + Express)
- ✅ Complete REST API with 4 main resources
- ✅ JWT authentication & role-based access
- ✅ MongoDB with Mongoose ORM
- ✅ Input validation with express-validator
- ✅ Password hashing with bcryptjs
- ✅ Global error handling
- ✅ CORS enabled for frontend
- ✅ Database seeding with 12 sample products
- ✅ Request logging with Morgan
- ✅ Development hot-reload with Nodemon

### Features
- 🔐 **Authentication** - Register, login, JWT tokens
- 📦 **Products** - Full CRUD with filtering, search, pagination
- 🏷️ **Categories** - Organize products
- 📝 **Blog** - Publish wellness articles
- 👤 **Admin Panel** - Manage all content
- 🔄 **Real-time** - Updates reflected instantly
- 📊 **Pagination** - Handle large datasets efficiently
- 🔍 **Search & Filter** - Find products quickly

---

## 🌐 API Endpoints

### Auth (`/auth`)
- `POST /auth/register` - Create admin account
- `POST /auth/login` - Get JWT token
- `GET /auth/me` - Get current user

### Categories (`/categories`)
- `GET /categories` - List all
- `GET /categories/:id` - Get one
- `POST /categories` - Create (protected)
- `PUT /categories/:id` - Update (protected)
- `DELETE /categories/:id` - Delete (protected)

### Products (`/products`)
- `GET /products` - List with filters: `?category=&search=&page=&limit=`
- `GET /products/:id` - Get one
- `GET /products/featured` - Get featured only
- `POST /products` - Create (protected)
- `PUT /products/:id` - Update (protected)
- `DELETE /products/:id` - Delete (protected)

### Blog (`/blog`)
- `GET /blog` - List with pagination: `?page=&limit=&category=&search=`
- `GET /blog/:id` - Get one
- `POST /blog` - Create (protected)
- `PUT /blog/:id` - Update (protected)
- `DELETE /blog/:id` - Delete (protected)

---

## 📊 Sample Data

The `npm run seed` command creates:

| Resource | Count | Examples |
|----------|-------|----------|
| **Categories** | 6 | Pharmaceuticals, Personal Care, Baby Care, etc. |
| **Products** | 12 | Liv.52 DS, Ashwagandha+, Neem Wash, Rumalaya, etc. |
| **Blog Posts** | 3 | Science, Commitments, R&D topics |
| **Admin User** | 1 | admin@himalayanpharma.works / admin123 |

---

## 🔧 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | 5.x |
| **Database** | MongoDB | 4.0+ |
| **ODM** | Mongoose | 9.x |
| **Authentication** | JWT | - |
| **Password** | bcryptjs | 2.x |
| **Validation** | express-validator | 7.x |
| **CORS** | cors | 2.x |
| **Logging** | Morgan | 1.x |
| **Dev Tool** | Nodemon | 3.x |

---

## 📋 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── db.js                    ← MongoDB connection
│   ├── models/                      ← Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Blog.js
│   ├── controllers/                 ← Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── blogController.js
│   ├── routes/                      ← API endpoints
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── blogRoutes.js
│   ├── middleware/                  ← Auth & error handling
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── seed/
│   │   └── seedData.js              ← Sample data
│   ├── app.js                       ← Express setup
│   └── index.js                     ← Server entry
├── public/                          ← Static files
├── .env.example                     ← Config template
├── .env.local                       ← Config (create copy)
├── package.json                     ← Dependencies
├── README.md                        ← Full docs
├── SETUP_INSTRUCTIONS.md            ← Setup guide
├── COMPLETE_SUMMARY.md              ← Overview
└── POSTMAN_COLLECTION.json          ← API tests
```

---

## 🔐 Authentication Flow

```
1. User sends email + password
   ↓
2. Server validates credentials
   ↓
3. Server creates JWT token
   ↓
4. User stores token in localStorage
   ↓
5. User includes token in Authorization header
   ↓
6. Server validates token, allows access to protected routes
```

**Default Admin Credentials (after seeding):**
```
Email: admin@himalayanpharma.works
Password: admin123
```

---

## 🧪 Testing the API

### Option 1: Postman (Recommended)
1. Download [Postman](https://www.postman.com/downloads/)
2. Open `Backend/POSTMAN_COLLECTION.json`
3. Set variables: `baseUrl` and `token`
4. Test all endpoints

### Option 2: Thunder Client (VS Code)
1. Install Thunder Client extension
2. Import `Backend/POSTMAN_COLLECTION.json`
3. Test directly in VS Code

### Option 3: cURL
```bash
# Test health endpoint
curl http://localhost:5000/api/v1/health

# Get all products
curl http://localhost:5000/api/v1/products

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@himalayanpharma.works","password":"admin123"}'
```

---

## 🎯 Common Tasks

### Create a New Product
```bash
POST /api/v1/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "category": "category_id",
  "price": "$25",
  "image": "url",
  "shortDescription": "Short desc",
  "description": "Full description",
  "benefits": ["benefit1"],
  "ingredients": ["ingredient1"],
  "usage": "Instructions",
  "featured": true
}
```

### Search Products
```bash
GET /api/v1/products?search=ashwagandha
```

### Filter by Category
```bash
GET /api/v1/products?category=Pharmaceuticals
```

### Get Featured Products
```bash
GET /api/v1/products/featured
```

### Create Blog Post
```bash
POST /api/v1/blog
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Blog Title",
  "excerpt": "Short summary",
  "content": "Full content here",
  "category": "Science",
  "author": "Author Name"
}
```

---

## 📚 Environment Variables

Create `.env.local` based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database - Local MongoDB
MONGO_URI=mongodb://localhost:27017/himalayanpharma

# Database - MongoDB Atlas (Cloud)
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/himalayanpharma

# Authentication
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=30d
```

---

## 🚀 Commands

```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Install new package
npm install package-name

# Remove package
npm uninstall package-name
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection failed | Run `mongod` or check MONGO_URI in .env.local |
| Port 5000 in use | Change PORT in .env.local or kill process |
| Module not found | Run `npm install` again |
| CORS error in frontend | Ensure frontend URL is in cors origins (src/app.js) |
| Token expired | Login again to get new token |

See **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** for more troubleshooting.

---

## 📖 Additional Resources

### API Documentation
- [Backend README.md](./Backend/README.md) - Complete API reference
- [Backend SETUP_INSTRUCTIONS.md](./Backend/SETUP_INSTRUCTIONS.md) - Installation guide

### Integration
- [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) - Connect React to API
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Full stack setup

### Quick Help
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - API cheat sheet
- [Backend COMPLETE_SUMMARY.md](./Backend/COMPLETE_SUMMARY.md) - Project overview

### Testing
- [Backend POSTMAN_COLLECTION.json](./Backend/POSTMAN_COLLECTION.json) - Test endpoints

---

## ✨ Key Features

### For End Users
- 📱 Responsive design on all devices
- 🔍 Search and filter products easily
- 📖 Read wellness blog articles
- ⚡ Fast, optimized loading

### For Administrators
- 🔐 Secure login system
- ➕ Create/Edit/Delete products
- 📝 Manage blog posts
- 🏷️ Organize categories
- 📊 Clean, organized dashboard

### For Developers
- 📚 Well-documented API
- 🧪 Ready-to-use test collection
- 🔄 Clean MVC architecture
- 🛡️ Input validation & error handling
- 🔑 JWT authentication
- 📦 Modular, scalable code

---

## 🎯 Getting Started

### 1. Read This
Start with **[GETTING_STARTED.md](./GETTING_STARTED.md)** for complete setup instructions.

### 2. Quick Reference
Bookmark **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** for API cheat sheet.

### 3. Install & Run
```bash
cd Backend && npm install && npm run seed && npm run dev
cd Frontend && npm install && npm run dev
```

### 4. Test
Open `http://localhost:5173` in browser.

---

## 🤝 Contributing

This project is ready for:
- Feature additions
- Performance optimization
- Security enhancements
- UI/UX improvements

---

## 📄 License

MIT License - Free to use and modify

---

## 💡 Pro Tips

1. **Keep Postman handy** - Test API endpoints before frontend integration
2. **Check logs** - Terminal shows useful debug info
3. **Reseed if needed** - `npm run seed` resets database
4. **Use token variable** - Save time with Postman token variable
5. **Read docs first** - Save debugging time with proper documentation

---

## 🎉 Success!

You now have a complete, production-ready REST API for a wellness/pharmacy e-commerce platform!

### Next Steps
1. ✅ Complete backend setup
2. ✅ Test all API endpoints
3. ✅ Connect frontend to API
4. ✅ Create admin dashboard
5. ✅ Deploy to production

---

**Built with ❤️ for Himalayan Pharma Works**

*A complete, modern REST API for wellness commerce*

Questions? See the documentation files above! 📚
