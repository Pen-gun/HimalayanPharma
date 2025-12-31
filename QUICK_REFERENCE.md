# 🚀 Quick Reference Card - Himalayan Pharma Backend

## 📌 Essential URLs & Credentials

### Server
```
Base URL: http://localhost:5000
API: http://localhost:5000/api/v1
Status: http://localhost:5000/api/v1/health
```

### Default Login Credentials
```
Email: admin@himalayanpharma.works
Password: admin123
```

---

## ⚡ Quick Commands

```bash
# Setup (first time only)
npm install
cp .env.example .env.local
npm run seed

# Development
npm run dev

# Production
npm start

# Reseed data
npm run seed
```

---

## 📍 API Endpoints Cheat Sheet

### Auth
```
POST   /auth/register          Register new admin
POST   /auth/login             Login & get token
GET    /auth/me                Get current user (requires token)
```

### Categories
```
GET    /categories             Get all
GET    /categories/:id         Get one
POST   /categories             Create (requires token)
PUT    /categories/:id         Update (requires token)
DELETE /categories/:id         Delete (requires token)
```

### Products
```
GET    /products               Get all (with filters)
GET    /products/:id           Get one
GET    /products/featured      Get featured products
POST   /products               Create (requires token)
PUT    /products/:id           Update (requires token)
DELETE /products/:id           Delete (requires token)
```

**Filters:** `?category=Name&search=keyword&page=1&limit=10`

### Blog
```
GET    /blog                   Get all
GET    /blog/:id               Get one
POST   /blog                   Create (requires token)
PUT    /blog/:id               Update (requires token)
DELETE /blog/:id               Delete (requires token)
```

**Filters:** `?category=Science&search=keyword&page=1&limit=10`

---

## 🔐 Authentication Pattern

### 1. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@himalayanpharma.works",
    "password": "admin123"
  }'
```

### 2. Save Token
```javascript
const token = response.data.token;
localStorage.setItem('token', token);
```

### 3. Use Token in Requests
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/v1/products
```

---

## 📋 Sample Data Created

**Categories:** 6 (Pharmaceuticals, Personal Care, Baby Care, Men's Health, Women's Health, Animal Health)

**Products:** 12 (Liv.52 DS, Ashwagandha+, Neem Face Wash, etc.)

**Blog Posts:** 3 (Science, Commitments, R&D)

**Admin User:** 1 (admin@himalayanpharma.works / admin123)

---

## 🔧 Environment Variables

```env
PORT=5000                                          # Server port
MONGO_URI=mongodb://localhost:27017/himalayanpharma  # Database
JWT_SECRET=your_super_secret_key                   # Token secret
JWT_EXPIRE=30d                                     # Token expiry
NODE_ENV=development                               # Environment
```

---

## 📁 Key Files

| File | What It Does |
|------|-------------|
| `src/app.js` | Express server setup |
| `src/index.js` | Server start point |
| `src/config/db.js` | MongoDB connection |
| `src/models/*.js` | Database schemas |
| `src/controllers/*.js` | Business logic |
| `src/routes/*.js` | API endpoints |
| `src/middleware/*.js` | Auth & errors |
| `src/seed/seedData.js` | Sample data |
| `.env.local` | Config (create from .env.example) |
| `package.json` | Dependencies |

---

## 🧪 Test With Frontend

### React/Vite Setup
```typescript
const API_URL = 'http://localhost:5000/api/v1';

// Get products
const res = await fetch(`${API_URL}/products`);
const data = await res.json();
```

### With Token
```typescript
const token = localStorage.getItem('token');
const res = await fetch(`${API_URL}/products`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not connecting | Run `mongod` or check MONGO_URI |
| Port 5000 in use | Change PORT in .env.local or kill process |
| CORS error | Frontend URL must be in cors list (src/app.js) |
| Token expired | Login again |
| 401 error | Include Authorization header with token |
| 403 error | User doesn't have admin role |
| 404 error | Endpoint not found or ID doesn't exist |

---

## 📚 Response Formats

### Success (200, 201)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Pagination
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

### Error (400, 401, 404, 500)
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["field error"]
}
```

---

## 🚀 Next Steps

1. ✅ Run `npm install`
2. ✅ Create `.env.local`
3. ✅ Run `npm run seed`
4. ✅ Run `npm run dev`
5. ✅ Test with Postman
6. ✅ Connect Frontend
7. ✅ Deploy to production

---

## 📖 Documentation Files

- **README.md** - Complete API documentation
- **SETUP_INSTRUCTIONS.md** - Detailed setup guide
- **COMPLETE_SUMMARY.md** - Full project overview
- **FRONTEND_INTEGRATION.md** - React integration guide
- **POSTMAN_COLLECTION.json** - Import to Postman for testing

---

## 🎯 Common Patterns

### Get Products by Category
```
GET /products?category=Pharmaceuticals
```

### Search Products
```
GET /products?search=ashwagandha
```

### Paginate
```
GET /products?page=2&limit=20
```

### Combine
```
GET /products?category=Pharmaceuticals&search=ashwagandha&page=1&limit=10
```

### Get Featured
```
GET /products/featured
```

---

## 💡 Pro Tips

- **Save responses** in Postman for quick reference
- **Use environment variables** in Postman for baseUrl and token
- **Test categories first** before creating products
- **Always include token** for protected routes
- **Check console logs** for debugging
- **Reseed data** if you mess up: `npm run seed`

---

## 🔗 Useful Links

- Postman: https://www.postman.com/downloads/
- Thunder Client (VSCode): Thunder Client extension
- MongoDB Compass: https://www.mongodb.com/products/compass
- JWT Decoder: https://jwt.io/

---

## 📞 Need Help?

- Check README.md for detailed API docs
- Read SETUP_INSTRUCTIONS.md for troubleshooting
- Review FRONTEND_INTEGRATION.md for React examples
- Look at POSTMAN_COLLECTION.json for request templates

---

**Happy coding! 🎉**

Built with ❤️ for Himalayan Pharma Works
