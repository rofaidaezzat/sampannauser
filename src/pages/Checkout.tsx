import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend API
    console.log('Order Data:', { ...formData, items, total: totalPrice });
    
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="section-heading mb-8">{t('checkout') || 'Checkout'}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
            Shipping Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t('name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-border bg-background focus:ring-1 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t('email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-border bg-background focus:ring-1 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-border bg-background focus:ring-1 focus:ring-ring outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  City *
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-border bg-background focus:ring-1 focus:ring-ring outline-none cursor-pointer"
                >
                  <option value="" disabled>Select a city</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="Giza">Giza</option>
                  <option value="Mansoura">Mansoura</option>
                  <option value="Port Said">Port Said</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-border bg-background focus:ring-1 focus:ring-ring outline-none"
                />
              </div>
            </div>
            <button type="submit" className="btn-shop w-full mt-6">
              Place Order
            </button>
          </form>
        </div>

        <div className="bg-card border border-border p-6 h-fit sticky top-24">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
            Order Summary
          </h3>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-muted-foreground">{item.size} / {item.color}</p>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-border pt-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground text-base">
              <span>{t('total')}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
