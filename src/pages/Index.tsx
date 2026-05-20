import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

import heroBanner from '@/assets/hero-banner.jpg';
import { useEffect, useRef, useState } from 'react';
import { Product } from '@/context/CartContext';
import { getProducts, getSettings } from '@/lib/api';

interface HomeSettings {
  cover_title: string;
  cover_description: string;
  cover_image: string | string[];
}

interface CategorySettings {
  men_image: string;
  women_image: string;
  kids_image: string;
}

const Index = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [homeSettings, setHomeSettings] = useState<HomeSettings | null>(null);
  const [categorySettings, setCategorySettings] = useState<CategorySettings | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Normalise cover_image to always be an array
  const coverImages: string[] = (() => {
    if (!homeSettings?.cover_image) return [heroBanner];
    if (Array.isArray(homeSettings.cover_image)) {
      const arr = homeSettings.cover_image.filter((u) => u && u.startsWith('http'));
      return arr.length > 0 ? arr : [heroBanner];
    }
    return homeSettings.cover_image.startsWith('http')
      ? [homeSettings.cover_image]
      : [heroBanner];
  })();

  // Auto-advance carousel
  useEffect(() => {
    if (coverImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coverImages.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [coverImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // reset timer on manual navigation
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coverImages.length);
    }, 4000);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setHomeSettings(data.home);
        setCategorySettings(data.category);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
    loadSettings();
  }, []);

  const getCategoryImage = (catName: string, fallback: string): string => {
    if (!categorySettings) return fallback;
    const key = catName.toLowerCase();
    let apiImage = '';
    if (key === 'men' || key === 'man') apiImage = categorySettings.men_image;
    else if (key === 'women' || key === 'woman') apiImage = categorySettings.women_image;
    else if (key === 'kides' || key === 'kids' || key === 'kid') apiImage = categorySettings.kids_image;
    return apiImage && apiImage.startsWith('http') ? apiImage : fallback;
  };

  // Dynamically extract categories and count of items from loaded products
  const dynamicCategories = (() => {
    if (products.length === 0) return [];
    
    const counts: Record<string, number> = {};
    const firstProductImage: Record<string, string> = {};

    products.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
        if (!firstProductImage[p.category] && p.image) {
          firstProductImage[p.category] = p.image;
        }
      }
    });

    return Object.keys(counts).map((name) => ({
      name,
      count: counts[name],
      image: firstProductImage[name] || '',
    }));
  })();

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {coverImages.map((src, index) => (
          <div
            key={index}
            aria-label={`Hero slide ${index + 1}`}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              opacity: index === currentSlide ? 1 : 0,
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center space-y-6 animate-fade-in px-4">
            <p className="text-white/80 text-sm uppercase tracking-[0.3em] font-body">
              {t('newCollection')}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              {homeSettings?.cover_title ?? t('heroTitle')}
            </h1>
            <p className="text-white/80 text-lg font-body">
              {homeSettings?.cover_description ?? t('heroSubtitle')}
            </p>
            <Link to="/categories" className="btn-shop inline-block mt-4">
              {t('shopNow')}
            </Link>
          </div>
        </div>

        {/* Left Arrow */}
        {coverImages.length > 1 && (
          <button
            onClick={() => goToSlide((currentSlide - 1 + coverImages.length) % coverImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {coverImages.length > 1 && (
          <button
            onClick={() => goToSlide((currentSlide + 1) % coverImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        {/* Slide counter + Dots */}
        {coverImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <span className="text-white/70 text-xs tracking-widest">
              {currentSlide + 1} / {coverImages.length}
            </span>
            <div className="flex gap-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full">
              {coverImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="transition-all duration-300 rounded-full focus:outline-none"
                  style={{
                    width: index === currentSlide ? '24px' : '8px',
                    height: '8px',
                    background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.45)',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>


      {/* Categories */}
      {dynamicCategories.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <h2 className="section-heading text-center mb-12">{t('shopByCategory')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {dynamicCategories.map((cat) => (
              <Link
                key={cat.name}
                to={`/categories?cat=${cat.name}`}
                className="group relative overflow-hidden aspect-[3/4]"
              >
                <img
                  src={getCategoryImage(cat.name, cat.image)}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = cat.image;
                  }}
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-primary-foreground font-heading text-xl font-semibold uppercase">{cat.name}</h3>
                  <p className="text-primary-foreground/70 text-sm">{cat.count} {t('items')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trending */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="section-heading text-center mb-12">{t('trending')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;