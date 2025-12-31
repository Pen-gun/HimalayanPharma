# Himalayan Pharma Works - Frontend

Modern, production-ready React + TypeScript frontend for the Himalayan Pharma e-commerce platform.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better DX
- **Vite 7** - Lightning-fast build tool
- **React Router 7** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client with interceptors
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Beautiful icon library

## 📦 Bundle Size

- **Total Gzipped**: ~114 KB
- **Vendor Chunk**: 16.72 KB (React, React Router)
- **Utils Chunk**: 24.46 KB (Axios, TanStack Query)
- **Main Bundle**: 67.36 KB
- **CSS**: 5.49 KB

## 🏃‍♂️ Quick Start

### Development
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and set VITE_API_URL

# Start dev server
npm run dev
# Open http://localhost:5173
```

### Production Build
```bash
# Type check
npm run type-check

# Build
npm run build

# Preview production build
npm run preview
```

## 🔐 Environment Variables

Create `.env.local` (not committed to git):

```env
# Development
VITE_API_URL=http://localhost:3000/api/v1

# Production (use your actual API URL)
# VITE_API_URL=https://api.yourdomain.com/api/v1
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/          # Route pages
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Blog.tsx
│   └── ...
├── hooks/          # Custom React hooks
│   ├── useProducts.ts
│   ├── useBlog.ts
│   └── useCategories.ts
├── layouts/        # Layout components
│   └── MainLayout.tsx
├── lib/            # Core utilities
│   └── api.ts      # Axios instance & API methods
├── data/           # Mock/static data
├── assets/         # Images, fonts, etc.
├── App.tsx         # Router setup
└── main.tsx        # App entry point
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## 🔌 API Integration

The app uses Axios with interceptors for:
- Automatic JWT token attachment
- Global error handling
- 401 auto-logout
- 10s request timeout

See [src/lib/api.ts](src/lib/api.ts) for API methods.

## 🎨 Styling

Using **Tailwind CSS 4** with custom configuration:
- Custom color palette
- Typography system
- Responsive breakpoints
- Component classes

## 📱 Pages

1. **Home** - Hero, featured products, testimonials
2. **Products** - Product listing with filters
3. **Product Detail** - Individual product page
4. **Blog** - Blog post listing
5. **Blog Detail** - Individual blog post
6. **About** - Company information
7. **Science** - Research & science content
8. **Commitments** - Sustainability & values
9. **Careers** - Job opportunities
10. **Contact** - Contact form

## 🚀 Deployment

See [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) for complete deployment guide.

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel
# Set VITE_API_URL in Vercel dashboard
vercel --prod
```

### Build Optimization
- ✅ Code splitting (vendor/utils chunks)
- ✅ Tree shaking
- ✅ Minification (esbuild)
- ✅ Asset optimization
- ✅ No source maps in production

## 🔒 Security

- No API keys in frontend code
- JWT stored in localStorage (HttpOnly cookies recommended for production)
- Automatic token cleanup on 401
- CORS handled by backend

## 📊 Performance

- Lazy loading with React Router
- Optimized bundle splitting
- Image optimization via Vite
- CSS purging via Tailwind

## 🧪 Testing

Add testing setup:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## 📝 License

MIT

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
