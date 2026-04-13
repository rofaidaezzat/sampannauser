import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="section-heading mb-4">{t('emptyCart')}</h1>
        <Link to="/categories" className="btn-shop inline-block mt-4">{t('continueShopping')}</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="section-heading mb-8">{t('cart')} ({totalItems} {t('items')})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-card border border-border">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-32 object-cover" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">{item.size} / {item.color}</p>
                <p className="font-semibold text-foreground mt-1">{item.product.price} EGP</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border border-border flex items-center justify-center text-foreground hover:bg-muted">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border border-border flex items-center justify-center text-foreground hover:bg-muted">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-6 h-fit sticky top-24">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground text-base">
              <span>{t('total')}</span>
              <span>{totalPrice.toFixed(2)} EGP</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-shop w-full mt-6 block text-center">{t('checkout')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
