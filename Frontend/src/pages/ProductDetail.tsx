import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart } from 'lucide-react';
import { ProductSkeletonGrid } from '../components/Skeleton.tsx';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, isLoading } = useProduct(id || '');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  
  const product = productData?.data;

  useEffect(() => {
    document.title = product
      ? `${product.name} | Himalayan Pharma Works`
      : 'Product not found | Himalayan Pharma Works';
  }, [product]);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProductSkeletonGrid count={3} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section-shell space-y-4">
        <h1 className="text-2xl font-semibold text-emerald-900">Product not found</h1>
        <Link to="/products" className="btn-secondary">
          Back to products
        </Link>
      </div>
    );
  }

  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setAdding(true);
    try {
      await addToCart(product._id, quantity);
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart' + (error instanceof Error ? `: ${error.message}` : ''));
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="section-shell space-y-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="space-y-4">
          <span className="pill bg-emerald-50 text-emerald-800">{categoryName}</span>
          <h1 className="text-3xl font-semibold text-emerald-900 sm:text-4xl">{product.name}</h1>
          <p className="text-lg text-slate-700">{product.description}</p>
          {product.price && <div className="text-xl font-semibold text-emerald-800">Rs {product.price}</div>}
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                {tag}
              </span>
            ))}
          </div>
          <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-emerald-900">Benefits</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {product.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-slate-100"
              >
                -
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-slate-100"
              >
                +
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-900">Ingredients</h3>
              <p className="mt-2 text-sm text-slate-700">{product.ingredients.join(', ')}.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-900">How to use</h3>
              <p className="mt-2 text-sm text-slate-700">{product.usage}</p>
            </div>
            <p className="text-xs text-slate-500">
              Always consult your physician before use. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary" onClick={handleAddToCart} disabled={adding}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {adding ? 'Adding...' : 'Add to cart'}
              </button>
            <Link to="/contact" className="btn-secondary">
              Talk to an expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
