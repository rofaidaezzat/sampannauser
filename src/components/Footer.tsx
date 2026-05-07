import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import footerLogo from '@/assets/sampanna.jpg';
import { getSettings } from '@/lib/api';

interface FooterData {
  logo_description: string;
  phone: string;
  email: string;
  address: string;
  rights_reserved: string;
  social_media: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

const Footer = () => {
  const { t } = useLanguage();
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();

        setFooterData({
          logo_description: data.footer.logo_description,
          phone: data.contact.phone,
          email: data.contact.email,
          address: data.contact.address,
          rights_reserved: data.rights_reserved,
          social_media: data.social_media,
        });
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo + Description + Social */}
          <div>
            <img
              src={footerLogo}
              alt="Sampanna Footer Logo"
              className="h-20 w-auto object-contain mb-4 rounded-sm"
            />

            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {footerData?.logo_description ??
                'Curated fashion for the modern lifestyle. Quality, style, and comfort.'}
            </p>

            {/* Social Media */}
            <div className="flex gap-4 mt-4">
              {footerData?.social_media?.facebook && (
                <a
                  href={footerData.social_media.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Facebook size={16} />
                </a>
              )}

              {footerData?.social_media?.twitter && (
                <a
                  href={footerData.social_media.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Twitter size={16} />
                </a>
              )}

              {footerData?.social_media?.instagram && (
                <a
                  href={footerData.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Instagram size={16} />
                </a>
              )}

              {footerData?.social_media?.linkedin && (
                <a
                  href={footerData.social_media.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                {t('home')}
              </Link>

              <Link
                to="/categories"
                className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                {t('categories')}
              </Link>

              <Link
                to="/about"
                className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                {t('about')}
              </Link>

              <Link
                to="/contact"
                className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                {t('contact')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>

            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2">
                <Mail size={14} />
                {footerData?.email ?? 'evristclimber@gmail.com'}
              </span>

              <span className="flex items-center gap-2">
                <Phone size={14} />
                {footerData?.phone ?? '01111530022'}
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={14} />
                {footerData?.address ?? 'online & الإسماعيلية'}
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h4>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm border-none focus:outline-none"
              />

              <button className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold uppercase tracking-wider">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/50">
          © 2026{' '}
          {footerData?.rights_reserved ??
            'sampanna. All rights reserved.'}
        </div>
      </div>
    </footer>
  );
};

export default Footer;