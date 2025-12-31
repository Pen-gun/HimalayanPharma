# 🚀 Backend Setup & Run Instructions

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# MongoDB should be running (either locally or Atlas)
```

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd Backend
npm install
```

Expected output:
```
added 87 packages in 15s
```

### Step 2: Setup Environment Variables

Create `.env.local` file in the Backend directory:

```bash
# Option A: Copy the example file
cp .env.example .env.local

# Option B: Create manually with this content:
```

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/himalayanpharma
JWT_SECRET=your_super_secret_key_change_this_in_production_12345
JWT_EXPIRE=30d
```

### Step 3: Ensure MongoDB is Running

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**

Replace `MONGO_URI` in `.env.local` with:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/himalayanpharma
```

### Step 4: Seed Sample Data

```bash
npm run seed
```

Expected output:
```
✓ MongoDB connected
🧹 Cleared existing data
✓ Created 6 categories
✓ Created 12 products
✓ Created 3 blog posts
✓ Created admin user: admin@himalayanpharma.works

✓ Database seeding completed successfully!

📊 Summary:
  - Categories: 6
  - Products: 12
  - Blog Posts: 3
  - Admin User: admin@himalayanpharma.works

🔐 Login credentials for testing:
  Email: admin@himalayanpharma.works
  Password: admin123

✓ Database connection closed
```

### Step 5: Start Development Server

```bash
npm run dev
```

Expected output:
```
[nodemon] 3.1.0
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: js,json

🚀 Server is running on port 5000
📍 Environment: development
🌐 API Base URL: http://localhost:5000/api/v1
```

### Step 6: Test the API

Open your browser or use Postman/Thunder Client:

#### Health Check
```
GET http://localhost:5000/api/v1/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-31T12:00:00.000Z"
}
```

#### Get All Products
```
GET http://localhost:5000/api/v1/products
```

#### Login to Get Token
```
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@himalayanpharma.works",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Admin User",
      "email": "admin@himalayanpharma.works",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## API Testing with Postman

### 1. Import Collection

Download the collection template at the end of this file, or manually create these requests:

### 2. Setup Base URL Variable

In Postman:
- Set Variable: `baseUrl` = `http://localhost:5000/api/v1`
- Set Variable: `token` = (paste your JWT token from login response)

### 3. Sample Requests

#### Get All Categories
```
GET {{baseUrl}}/categories
```

#### Create New Category (Protected)
```
POST {{baseUrl}}/categories
Headers:
  Authorization: Bearer {{token}}

Body (JSON):
{
  "name": "Sports & Fitness",
  "description": "Wellness for athletes"
}
```

#### Get Featured Products
```
GET {{baseUrl}}/products/featured
```

#### Search Products
```
GET {{baseUrl}}/products?search=ashwagandha&category=Pharmaceuticals&page=1&limit=10
```

#### Get Blog Posts
```
GET {{baseUrl}}/blog?page=1&limit=10&category=Science
```

## Troubleshooting

### Issue: "MongoDB connection failed"
**Solution:**
- Ensure MongoDB is running: `mongod` (local) or check Atlas connection
- Verify `MONGO_URI` in `.env.local`
- Check MongoDB credentials for Atlas

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env.local
PORT=5001
```

### Issue: "Module not found" errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Token expired" errors
**Solution:**
- Get a new token by logging in again
- Increase `JWT_EXPIRE` in `.env.local` (e.g., `90d`)

## Development Workflow

### 1. Auto-Reload Changes
```bash
npm run dev
```
Code changes automatically reload the server (using nodemon).

### 2. Reseed Database (if needed)
```bash
npm run seed
```
This clears and repopulates the database with sample data.

### 3. Debug Mode
Add console logs in your code, they'll show in the terminal.

### 4. Check Logs
```
dev: GET /api/v1/products 200 5ms
dev: POST /api/v1/auth/login 200 45ms
dev: Error: 404 Not Found
```

## Database Structure

After seeding, your MongoDB has:

```
Database: himalayanpharma
├── categories (6 documents)
│   └── Pharmaceuticals, Personal Care, Baby Care, Men's Health, Women's Health, Animal Health
├── products (12 documents)
│   └── Each with category reference, images, benefits, ingredients, etc.
├── blogs (3 documents)
│   └── Blog posts with content, author, category, tags
└── users (1 document)
    └── Admin user for testing
```

## API Rate Limiting (Optional)

For production, consider adding rate limiting:

```javascript
// Add to app.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Production Deployment Checklist

- [ ] Change `JWT_SECRET` to a strong, random string
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas instead of local MongoDB
- [ ] Enable HTTPS (use a service like Heroku, Railway, or Render)
- [ ] Add environment variables to hosting platform
- [ ] Test all API endpoints in production
- [ ] Setup monitoring and error tracking
- [ ] Enable rate limiting
- [ ] Backup MongoDB regularly

## Next Steps

1. **Connect Frontend**: Update React app to use `http://localhost:5000/api/v1`
2. **Add Authentication UI**: Create login/register pages in frontend
3. **Add More Features**: Products filtering, user profiles, etc.
4. **Deploy**: Choose a hosting platform (Heroku, Render, Railway, Vercel + serverless backend)

## Useful Commands

```bash
# Start dev server
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Install new package
npm install package-name

# Remove package
npm uninstall package-name

# Update packages
npm update
```

## File Structure Created

```
Backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── categoryController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Blog.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   ├── seed/
│   │   └── seedData.js
│   ├── app.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## Common API Patterns

### Fetch with Error Handling
```javascript
async function apiCall(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Usage
const products = await apiCall('http://localhost:5000/api/v1/products');
```

## Support & Resources

- API Documentation: See [README.md](./README.md)
- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- JWT Guide: https://jwt.io/introduction

---

**Happy coding! 🎉**
