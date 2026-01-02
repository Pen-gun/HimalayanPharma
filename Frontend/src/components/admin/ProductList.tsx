import type { Product } from '../../lib/api';

interface ProductListProps {
  products: Product[];
  categories: Map<string, string>;
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const ProductList = ({ products, categories, isLoading, onEdit, onDelete, isDeleting }: ProductListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600 mb-3" />
          <p className="text-slate-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-slate-50 px-6 py-12 text-center">
        <p className="text-slate-600">No products yet. Create your first product above.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div key={product._id} className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                {typeof product.category === 'string'
                  ? categories.get(product.category) || product.category
                  : product.category?.name}
              </p>
              <h3 className="font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
            </div>
            {product.featured && (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">★</span>
            )}
          </div>

          <p className="mb-3 text-sm text-slate-600 line-clamp-2">{product.shortDescription}</p>

          {product.tags && product.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  {tag}
                </span>
              ))}
              {product.tags.length > 2 && (
                <span className="text-[11px] text-slate-500">+{product.tags.length - 2} more</span>
              )}
            </div>
          )}

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-emerald-700">
              {product.price ? `₹${product.price.toLocaleString()}` : 'No price'}
            </span>
            <span className="text-xs text-slate-400">{product._id.slice(-6)}</span>
          </div>

          <div className="flex gap-2 border-t border-slate-100 pt-3">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 rounded-lg bg-blue-50 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete "${product.name}"?`)) {
                  onDelete(product._id);
                }
              }}
              disabled={isDeleting}
              className="flex-1 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
