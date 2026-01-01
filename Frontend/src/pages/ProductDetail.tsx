import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = useProduct(id || '');
  
  const product = productData?.data;

  useEffect(() => {
    document.title = product
      ? `${product.name} | Himalayan Pharma Works`
      : 'Product not found | Himalayan Pharma Works';
  }, [product]);

  if (isLoading) {
    return (
      <div className="section-shell space-y-4">
        <p className="text-slate-600">Loading product...</p>
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
  console.log(product);

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
          {product.price && <div className="text-xl font-semibold text-emerald-800">${product.price}</div>}
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
                  <li key={benefit}>• {benefit}</li>
                ))}
              </ul>
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
            <button className="btn-primary">Add to cart</button>
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
