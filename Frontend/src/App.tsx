import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load all pages except Home (load Home immediately for faster initial render)
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const Commitments = lazy(() => import('./pages/Commitments'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Products = lazy(() => import('./pages/Products'));
const Science = lazy(() => import('./pages/Science'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        } />
        <Route path="products" element={
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        } />
        <Route path="products/:id" element={
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        } />
        <Route path="science" element={
          <Suspense fallback={<PageLoader />}>
            <Science />
          </Suspense>
        } />
        <Route path="commitments" element={
          <Suspense fallback={<PageLoader />}>
            <Commitments />
          </Suspense>
        } />
        <Route path="blog" element={
          <Suspense fallback={<PageLoader />}>
            <Blog />
          </Suspense>
        } />
        <Route path="blog/:id" element={
          <Suspense fallback={<PageLoader />}>
            <BlogDetail />
          </Suspense>
        } />
        <Route path="careers" element={
          <Suspense fallback={<PageLoader />}>
            <Careers />
          </Suspense>
        } />
        <Route path="contact" element={
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        } />
        <Route path="privacy" element={
          <Suspense fallback={<PageLoader />}>
            <Privacy />
          </Suspense>
        } />
        <Route path="terms" element={
          <Suspense fallback={<PageLoader />}>
            <Terms />
          </Suspense>
        } />
        <Route path="disclaimer" element={
          <Suspense fallback={<PageLoader />}>
            <Disclaimer />
          </Suspense>
        } />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
