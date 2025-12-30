import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { productCategories, products } from '../data/mockData';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    document.title = 'Products | Himalayan Pharma Works';
  }, []);

  // Later: useQuery(['products'], fetchProducts)

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
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
        {productCategories.map((category) => (
          <button
            key={category}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeCategory === category
                ? 'border-emerald-700 bg-emerald-700 text-white shadow-md'
                : 'border-emerald-100 bg-white text-emerald-800 hover:border-emerald-400'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
