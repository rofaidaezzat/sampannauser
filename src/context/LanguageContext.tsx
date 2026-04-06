import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: { en: string; ar: string };
}

const translations: Translations = {
  home: { en: 'Home', ar: 'الرئيسية' },
  categories: { en: 'Categories', ar: 'الفئات' },
  about: { en: 'About', ar: 'من نحن' },
  contact: { en: 'Contact Us', ar: 'اتصل بنا' },
  shopNow: { en: 'Shop Now', ar: 'تسوق الآن' },
  addToCart: { en: 'Add to Cart', ar: 'أضف للسلة' },
  cart: { en: 'Cart', ar: 'السلة' },
  search: { en: 'Search...', ar: 'بحث...' },
  newCollection: { en: 'New Collection', ar: 'مجموعة جديدة' },
  heroTitle: { en: 'Discover Your Style', ar: 'اكتشف أسلوبك' },
  heroSubtitle: { en: 'Curated fashion for the modern you', ar: 'أزياء مختارة للعصر الحديث' },
  trending: { en: 'Trending Now', ar: 'الأكثر رواجاً' },
  shopByCategory: { en: 'Shop by Category', ar: 'تسوق حسب الفئة' },
  size: { en: 'Size', ar: 'المقاس' },
  color: { en: 'Color', ar: 'اللون' },
  description: { en: 'Description', ar: 'الوصف' },
  total: { en: 'Total', ar: 'المجموع' },
  checkout: { en: 'Checkout', ar: 'الدفع' },
  remove: { en: 'Remove', ar: 'إزالة' },
  emptyCart: { en: 'Your cart is empty', ar: 'سلتك فارغة' },
  continueShopping: { en: 'Continue Shopping', ar: 'متابعة التسوق' },
  aboutTitle: { en: 'Our Story', ar: 'قصتنا' },
  contactTitle: { en: 'Get in Touch', ar: 'تواصل معنا' },
  sendMessage: { en: 'Send Message', ar: 'إرسال' },
  name: { en: 'Name', ar: 'الاسم' },
  email: { en: 'Email', ar: 'البريد الإلكتروني' },
  message: { en: 'Message', ar: 'الرسالة' },
  items: { en: 'items', ar: 'عناصر' },
  allCategories: { en: 'All Categories', ar: 'جميع الفئات' },
  filterBy: { en: 'Filter by', ar: 'تصفية حسب' },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  const t = (key: string) => translations[key]?.[language] || key;
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
