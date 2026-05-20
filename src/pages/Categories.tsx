import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@/context/CartContext';
import { getProducts } from '@/lib/api';

const Categories = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync selectedCategory with search params if the URL changes
  useEffect(() => {
    const cat = searchParams.get('cat') || 'All';
    setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setAllProducts(data);
        
        // Extract unique categories from backend products
        const uniqueCats = Array.from(
          new Set(data.map((p) => p.category).filter(Boolean))
        );
        setCategoriesList(uniqueCats);
      } catch (error) {
        console.error('Failed to load products and categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFiltered(allProducts);
    } else {
      setFiltered(allProducts.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, allProducts]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="section-heading text-center mb-8">{t('categories')}</h1>

      {/* Filter */}
      {!loading && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${selectedCategory === 'All' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'}`}
          >
            {t('allCategories')}
          </button>
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No products found in this category.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;

