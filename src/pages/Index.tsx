import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] overflow-hidden">
        <img src={heroBanner} alt="Fashion collection" className="w-full h-full object-cover" width={1920} height={800} />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 animate-fade-in">
            <p className="text-primary-foreground/80 text-sm uppercase tracking-[0.3em] font-body">{t('newCollection')}</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground">{t('heroTitle')}</h1>
            <p className="text-primary-foreground/80 text-lg font-body">{t('heroSubtitle')}</p>
            <Link to="/categories" className="btn-shop inline-block mt-4">{t('shopNow')}</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="section-heading text-center mb-12">{t('shopByCategory')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/categories?cat=${cat.name}`} className="group relative overflow-hidden aspect-[3/4]">
              <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-primary-foreground font-heading text-xl font-semibold">{cat.name}</h3>
                <p className="text-primary-foreground/70 text-sm">{cat.count} {t('items')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="section-heading text-center mb-12">{t('trending')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
