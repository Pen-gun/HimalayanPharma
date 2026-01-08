import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { ProductSkeletonGrid } from '../components/Skeleton.tsx';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  
  const { data: categoriesData } = useCategories();
  const { data: productsData, isLoading } = useProducts({
    category: activeCategory || undefined,
  });

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    document.title = 'Products | Himalayan Pharma Works';
  }, []);

  const categories = ['All', ...(categoriesData?.data.map(cat => cat.name) || [])];
  const products = productsData?.data || []
  const handleCategoryChange = (category: string) => {
    const newCategory = category === 'All' ? '' : category;
    setActiveCategory(newCategory);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category }, { replace: true });
    }
  };

  return (
    <div className="section-shell space-y-10">
      <SectionHeader
        eyebrow="Products"
        title="Formulations for holistic wellness"
        subtitle="Explore Ayurvedic, herbal, and science-backed products crafted for everyday vitality."
        align="center"
      />

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              (activeCategory === '' && category === 'All') || activeCategory === category
                ? 'border-emerald-700 bg-emerald-700 text-white shadow-md'
                : 'border-emerald-100 bg-white text-emerald-800 hover:border-emerald-400'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductSkeletonGrid count={6} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const category =
              typeof product.category === 'string'
                ? { _id: 'unknown', name: product.category }
                : product.category;
            const price = Number(product.price);
            return (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  category,
                  price,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
