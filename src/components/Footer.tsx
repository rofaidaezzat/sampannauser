import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, MapPin, Phone } from 'lucide-react';
import footerLogo from '@/assets/sampanna.jpg';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img src={footerLogo} alt="Sampanna Footer Logo" className="h-20 w-auto object-contain mb-4 rounded-sm" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Curated fashion for the modern lifestyle. Quality, style, and comfort.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">{t('home')}</Link>
              <Link to="/categories" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">{t('categories')}</Link>
              <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">{t('about')}</Link>
              <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">{t('contact')}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2"><Mail size={14} /> evristclimber@gmail.com</span>
              <span className="flex items-center gap-2"><Phone size={14} /> 01111530022</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> الإسماعيلية</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm border-none focus:outline-none" />
              <button className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold uppercase tracking-wider">→</button>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/50">
          © 2026 LUXE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
