import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Link to="/categories" className="btn-shop inline-block mt-4">{t('continueShopping')}</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    addToCart(product, size, color);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft size={16} /> {t('continueShopping')}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <h1 className="font-heading text-4xl font-bold text-foreground">{product.name}</h1>
          <p className="text-2xl font-semibold text-foreground">${product.price}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Size */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">{t('size')}</p>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 text-sm font-medium border transition-all ${selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-foreground'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">{t('color')}</p>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm border transition-all ${selectedColor === color ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:border-foreground'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} className="btn-shop flex items-center justify-center gap-2 w-full mt-4">
            <ShoppingBag size={18} />
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
