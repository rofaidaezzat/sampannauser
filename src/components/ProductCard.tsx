import { Link } from 'react-router-dom';
import { Product } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const ProductCard = ({ product }: ProductCardProps) => {
  const images: string[] =
    product.images && product.images.length > 0
      ? Array.from(new Set(product.images))
      : [product.image];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  return (
    <Link to={`/product/${product.id}`} className="group product-card-hover block">
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Arrows — only shown when there are multiple images */}
        {images.length > 1 && (
          <>
            {/* Left */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>

            {/* Right */}
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight />
            </button>

            {/* Image counter */}
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              {currentIndex + 1} / {images.length}
            </span>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              {images.map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? '14px' : '6px',
                    height: '6px',
                    background: i === currentIndex ? 'white' : 'rgba(255,255,255,0.55)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="font-body text-sm font-medium text-foreground">{product.name}</h3>
        <p className="text-sm font-semibold text-foreground">{product.price} EGP</p>
      </div>
    </Link>
  );
};

export default ProductCard;
