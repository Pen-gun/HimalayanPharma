# Himalayan Pharma Works

Full-stack e-commerce platform for Ayurvedic wellness products.

## 🏗️ Project Structure

```
HimalayanPharma/
├── Backend/          # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── seed/
│   ├── PRODUCTION_CHECKLIST.md
│   └── package.json
│
└── Frontend/         # React + TypeScript + Vite
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── layouts/
    │   └── lib/
    └── package.json
```

## 🚀 Quick Start

### Backend Setup
```bash
cd Backend
npm install
npm run seed      # Seed database
npm run dev       # Development mode
npm start         # Production mode
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev       # Development mode
npm run build     # Production build
```

## 📚 Documentation

- [Backend README](Backend/README.md) - API documentation
- [Frontend README](Frontend/README.md) - Frontend documentation
- [Production Checklist](Backend/PRODUCTION_CHECKLIST.md) - Deployment guide
- [Postman Collection](Backend/POSTMAN_COLLECTION.json) - API testing

## 🔐 Environment Variables

### Backend (.env.local)
```env
PORT=3000
NODE_ENV=development
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🛠️ Tech Stack

### Backend
- Node.js + Express 4
- MongoDB + Mongoose
- JWT Authentication
- Helmet, Rate Limiting, Compression
- Express Validator

### Frontend
- React 18 + TypeScript
- Vite
- React Router
- Tailwind CSS

## 📝 License

MIT
