# Himalayan Pharma Works

Full-stack e-commerce platform for Ayurvedic wellness products with an admin panel, content management, and a REST API.

## Overview

- Frontend: React + TypeScript + Vite + Tailwind
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT with refresh flow
- Admin: Products, categories, blog, news, and site content management

## Repository Structure

```
HimalayanPharma/
  Backend/
    src/
      controllers/
      models/
      routes/
      middleware/
      config/
      seed/
    package.json
    README.md
  Frontend/
    src/
      components/
      pages/
      hooks/
      layouts/
      lib/
    package.json
    README.md
```

## Requirements

- Node.js 18+
- MongoDB (local or Atlas)

## Quick Start

### Backend

```bash
cd Backend
npm install
npm run seed      # Seed site content defaults (safe merge)
npm run dev       # Dev server
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Environment Variables

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

## Seeding

The seed script populates the `SiteContent` document with defaults. It merges missing fields without overwriting existing data.

```bash
cd Backend
npm run seed
```

To overwrite existing site content:

```bash
cd Backend
npm run seed -- --force
```

## Scripts

### Backend

- `npm run dev` - start server with nodemon
- `npm start` - start server
- `npm run seed` - seed site content

### Frontend

- `npm run dev` - start Vite dev server
- `npm run build` - production build

## Deployment Notes

- Configure `MONGODB_URL`, `JWT_SECRET`, and `FRONTEND_URL` for production.
- Ensure the frontend `VITE_API_URL` points to your deployed backend.
- Run `npm run seed` once after first deploy to populate site content.

## Documentation

- `Backend/README.md` for API details
- `Frontend/README.md` for UI and dev notes
