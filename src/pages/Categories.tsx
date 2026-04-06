import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Categories = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);

  const filtered = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="section-heading text-center mb-8">{t('categories')}</h1>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${selectedCategory === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'}`}
        >
          {t('allCategories')}
        </button>
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${selectedCategory === cat.name ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No products found in this category.</p>
      )}
    </div>
  );
};

export default Categories;
