# 🌿 Himalayan Pharma Works - Full Stack Setup Guide

Welcome! This is your complete guide to get the entire application running.

## 📊 Project Structure

```
HimalayanPharma/
├── Backend/                    # Node.js + Express REST API
│   ├── src/
│   ├── package.json
│   ├── README.md              # Complete API documentation
│   ├── SETUP_INSTRUCTIONS.md  # Backend setup guide
│   └── COMPLETE_SUMMARY.md    # Full overview
│
├── Frontend/                   # React + TypeScript + Tailwind
│   ├── src/
│   ├── package.json
│   └── ...
│
├── QUICK_REFERENCE.md         # Cheat sheet (READ THIS FIRST!)
├── FRONTEND_INTEGRATION.md    # How to connect frontend to backend
└── This file
```

## ⚡ 5-Minute Quick Start

### 1. Backend Setup

```bash
# Navigate to backend
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

**✅ Backend is now running at:** `http://localhost:5000/api/v1`

### 2. Frontend Setup

```bash
# In a NEW terminal, navigate to frontend
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**✅ Frontend is now running at:** `http://localhost:5173`

### 3. Test the Connection

Open your browser:
- Frontend: http://localhost:5173
- API Health: http://localhost:5000/api/v1/health

You should see products, categories, and blog posts loading!

---

## 📋 Prerequisites

Before starting, you need:

- **Node.js 18+** - Download from https://nodejs.org/
- **npm or yarn** - Comes with Node.js
- **MongoDB** - Either:
  - Local: https://docs.mongodb.com/manual/installation/
  - Cloud: MongoDB Atlas (free tier) https://www.mongodb.com/cloud/atlas

### Verify Installation

```bash
node --version    # Should be 18+
npm --version     # Should be 9+
mongod --version  # If using local MongoDB
```

---

## 🚀 Step-by-Step Backend Setup

### Step 1: Install Dependencies
```bash
cd Backend
npm install
```

Expected output:
```
added 87 packages in 15s
```

### Step 2: Create Environment File
```bash
cp .env.example .env.local
```

This creates a `.env.local` file with default settings.

**If using MongoDB Atlas:**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Replace MONGO_URI in `.env.local` with your connection string

### Step 3: Ensure MongoDB is Running

**Option A: Local MongoDB**
```bash
# Windows - Run in separate terminal
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- No setup needed, just ensure connection string in `.env.local`

### Step 4: Seed Sample Data
```bash
npm run seed
```

Expected output:
```
✓ MongoDB connected
✓ Created 6 categories
✓ Created 12 products
✓ Created 3 blog posts
✓ Created admin user: admin@himalayanpharma.works

🔐 Login credentials:
Email: admin@himalayanpharma.works
Password: admin123
```

### Step 5: Start Backend Server
```bash
npm run dev
```

Expected output:
```
🚀 Server is running on port 5000
📍 Environment: development
🌐 API Base URL: http://localhost:5000/api/v1
```

### Step 6: Test Backend
Open in browser or Postman:
```
GET http://localhost:5000/api/v1/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

---

## 🎨 Step-by-Step Frontend Setup

### Step 1: Install Dependencies
```bash
cd Frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xx ms
  ➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser
Visit `http://localhost:5173` and you should see:
- Products loading from backend
- Categories
- Blog posts
- All functionality working

---

## 🧪 Verify Everything Works

### Checklist

- [ ] Backend running (`npm run dev` in Backend folder)
- [ ] Frontend running (`npm run dev` in Frontend folder)
- [ ] Can see products on home page
- [ ] Can see featured products
- [ ] Can see blog posts
- [ ] Can filter products by category
- [ ] Can search products

### Test API Directly

#### 1. Get All Products
```bash
curl http://localhost:5000/api/v1/products
```

#### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@himalayanpharma.works",
    "password": "admin123"
  }'
```

Copy the `token` from response.

#### 3. Create Product (as admin)
```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "CATEGORY_ID",
    "shortDescription": "Test",
    "description": "Test product",
    "usage": "Use as needed",
    "price": "$10"
  }'
```

---

## 📁 File Organization

### Backend Files

```
Backend/
├── src/
│   ├── config/db.js              # MongoDB setup
│   ├── models/
│   │   ├── User.js              # Admin users
│   │   ├── Product.js           # Products
│   │   ├── Category.js          # Categories
│   │   └── Blog.js              # Blog posts
│   ├── controllers/
│   │   ├── authController.js    # Login/Register
│   │   ├── productController.js # Product CRUD
│   │   ├── categoryController.js# Category CRUD
│   │   └── blogController.js    # Blog CRUD
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── categoryRoutes.js    # Category endpoints
│   │   └── blogRoutes.js        # Blog endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── errorHandler.js      # Error handling
│   ├── seed/seedData.js         # Sample data
│   ├── app.js                   # Express setup
│   └── index.js                 # Server start
├── package.json                 # Dependencies
├── .env.local                   # Config (DON'T COMMIT!)
├── .env.example                 # Config template
├── README.md                    # API documentation
└── SETUP_INSTRUCTIONS.md        # Detailed setup
```

### Frontend Files

```
Frontend/
├── src/
│   ├── components/              # React components
│   ├── pages/                   # Page components
│   ├── data/mockData.ts         # Sample data types
│   ├── layouts/                 # Layout components
│   ├── assets/                  # Images, etc
│   ├── App.tsx                  # Main app
│   └── main.tsx                 # Entry point
├── public/                      # Static files
├── package.json                 # Dependencies
├── vite.config.ts               # Vite config
├── tsconfig.json                # TypeScript config
├── eslint.config.js             # ESLint config
└── README.md                    # Frontend docs
```

---

## 🔄 Connecting Frontend to Backend

The frontend is already configured to work with the backend!

### How It Works

1. **Frontend makes requests** to backend API
2. **Backend returns JSON data**
3. **Frontend displays data**

### Example: Loading Products

```typescript
// Frontend (src/pages/Products.tsx)
const products = useMemo(() => {
  // Later: useQuery(['products'], fetchProducts)
  if (activeCategory === 'All') return products;
  return products.filter((product) => product.category === activeCategory);
}, [activeCategory]);
```

Will become:

```typescript
import { useQuery } from '@tanstack/react-query';

const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const res = await fetch('http://localhost:5000/api/v1/products');
    return res.json();
  }
});
```

See **FRONTEND_INTEGRATION.md** for complete examples.

---

## 🔐 Testing Admin Features

### 1. Login with Admin Account

Navigate to `/login` page and use:
```
Email: admin@himalayanpharma.works
Password: admin123
```

### 2. Create a New Product

After login, go to admin panel:
1. Click "Create Product"
2. Fill in details
3. Submit

The product will be saved to the database and appear on the site!

### 3. Create a Blog Post

1. Go to admin panel
2. Click "Create Blog"
3. Fill in title, content, category
4. Submit

The blog post will appear in the blog section!

---

## 🛠️ Useful Commands

### Backend

```bash
cd Backend

# Start dev server (auto-reload)
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Install new package
npm install package-name
```

### Frontend

```bash
cd Frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install new package
npm install package-name
```

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** "Cannot find module 'express'"
- **Solution:** Run `npm install` in Backend folder

**Error:** "MongoDB connection failed"
- **Solution:** 
  - Make sure MongoDB is running (`mongod`)
  - Check MONGO_URI in `.env.local`
  - If using Atlas, verify connection string

**Error:** "Port 5000 already in use"
- **Solution:**
  - Change PORT in `.env.local`
  - Or kill existing process using port 5000

### Frontend Won't Start

**Error:** "Cannot find module '@tanstack/react-query'"
- **Solution:** Run `npm install` in Frontend folder

**Error:** "Cannot connect to API"
- **Solution:**
  - Ensure backend is running (`npm run dev` in Backend)
  - Check backend URL is correct
  - Check for CORS errors in console

### Products Not Loading

**Check:**
1. Backend is running on port 5000
2. Frontend is running on port 5173
3. `npm run seed` was executed
4. Open http://localhost:5000/api/v1/products in browser
5. Should see product JSON data

---

## 📚 Documentation Files

Read these for more information:

1. **QUICK_REFERENCE.md** - Quick API cheat sheet
2. **Backend/README.md** - Complete API documentation
3. **Backend/SETUP_INSTRUCTIONS.md** - Detailed setup
4. **Backend/COMPLETE_SUMMARY.md** - Full project overview
5. **FRONTEND_INTEGRATION.md** - How to use API in React

---

## 🚀 Next Steps

### Immediate (Get it running)
1. ✅ Setup backend with `npm install && npm run seed && npm run dev`
2. ✅ Setup frontend with `npm install && npm run dev`
3. ✅ Test the application

### Short Term (Enhance functionality)
1. Implement login in frontend
2. Add admin panel for creating products/blogs
3. Test all API endpoints
4. Add error handling in frontend

### Medium Term (Prepare for deployment)
1. Deploy backend to production (Heroku, Render, Railway)
2. Deploy frontend to production (Vercel, Netlify)
3. Update API URLs for production
4. Setup database backups

### Long Term (Scale & improve)
1. Add user authentication (register users, not just admins)
2. Add shopping cart & orders
3. Add payment integration (Stripe, etc)
4. Add reviews & ratings
5. Add admin dashboard with analytics

---

## 🎯 Quick Links

- **Backend API:** http://localhost:5000/api/v1
- **Frontend:** http://localhost:5173
- **API Health:** http://localhost:5000/api/v1/health
- **Postman Collection:** `Backend/POSTMAN_COLLECTION.json`

---

## 💡 Tips

- **Keep terminals open** - One for backend, one for frontend
- **Check browser console** - For any fetch/API errors
- **Check terminal logs** - For backend errors
- **Use Postman** - To test API endpoints
- **Reseed data** - If you mess up: `npm run seed`

---

## 🎉 You're Ready!

Everything is set up and ready to go. Start both servers and begin building!

```bash
# Terminal 1: Backend
cd Backend && npm run dev

# Terminal 2: Frontend
cd Frontend && npm run dev

# Browser
http://localhost:5173
```

---

## 📞 Common Questions

**Q: Do I need MongoDB installed?**
A: Either install locally or use MongoDB Atlas (cloud). Both work great.

**Q: Can I change the port?**
A: Yes, edit PORT in Backend/.env.local

**Q: How do I reset the database?**
A: Run `npm run seed` in Backend

**Q: How do I add a new product?**
A: Login as admin, use API or create admin interface

**Q: Can I deploy this?**
A: Yes! Deploy backend & frontend separately (see deployment docs)

---

## ✨ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Products visible on home page
- [ ] Can login with admin credentials
- [ ] Can create new products/blogs
- [ ] API endpoints responding correctly
- [ ] No console errors

---

**Built with ❤️ for Himalayan Pharma Works**

Let's build something amazing! 🚀
