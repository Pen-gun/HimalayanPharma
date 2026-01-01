import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import type { Product } from '../lib/api';

interface Props {
  product: Product;
}

const ProductCard = memo(({ product }: Props) => {
  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 w-full overflow-hidden bg-emerald-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          <Leaf className="h-4 w-4" />
          {typeof product.category === 'string' ? product.category : product.category.name}
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-emerald-900">{product.name}</h3>
          {product.price && <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{product.price}</span>}
        </div>
        <p className="text-sm text-slate-600">{product.shortDescription}</p>
        {product.tags && (
          <div className="flex flex-wrap gap-2 text-xs font-medium text-emerald-700">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/products/${product._id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:gap-3"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
