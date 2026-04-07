import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Globe, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import logo from '@/assets/sampanna-removebg-preview.png';

const Navbar = () => {
  const { totalItems } = useCart();
  const { t, toggleLanguage, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center -ml-4 md:-ml-8">
            <img src={logo} alt="Sampanna Logo" className="h-20 sm:h-28 w-auto object-contain scale-125 transform origin-left" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider">
              {t('home')}
            </Link>
            <Link to="/categories" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider">
              {t('categories')}
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider">
              {t('about')}
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider">
              {t('contact')}
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-foreground hover:text-muted-foreground transition-colors">
              <Search size={20} />
            </button>
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors text-sm font-medium">
              <Globe size={20} />
              <span className="hidden sm:inline">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <Link to="/cart" className="relative text-foreground hover:text-muted-foreground transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-foreground">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-3 border-t border-border animate-fade-in">
            <input
              type="text"
              placeholder={t('search')}
              className="w-full px-4 py-2 bg-muted rounded-none border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-foreground uppercase tracking-wider">{t('home')}</Link>
              <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-foreground uppercase tracking-wider">{t('categories')}</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-foreground uppercase tracking-wider">{t('about')}</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-foreground uppercase tracking-wider">{t('contact')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
