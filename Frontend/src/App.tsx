import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import Commitments from './pages/Commitments';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Science from './pages/Science';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="science" element={<Science />} />
        <Route path="commitments" element={<Commitments />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
