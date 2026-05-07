import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getSettings } from '@/lib/api';

interface AboutSettings {
  title: string;
  description_1: string;
  description_2: string;
  image: string;
  analytics: Array<{ label: string; value: string }>;
}

const About = () => {
  const { t } = useLanguage();
  const [about, setAbout] = useState<AboutSettings | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSettings();
        setAbout(data.about_us);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="section-heading text-center mb-6">
        {about?.title ?? t('aboutTitle')}
      </h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="aspect-video overflow-hidden">
          <img
            src={about?.image ?? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop'}
            alt="Our store"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg text-center">
          {about?.description_1}
        </p>

        {/* Analytics grid — only shown when data exists from API */}
        {about?.analytics && about.analytics.length > 0 && (
          <div className="grid grid-cols-3 gap-8 text-center py-8">
            {about.analytics.map((item) => (
              <div key={item.label}>
                <p className="font-heading text-4xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Fallback static stats when analytics array is empty */}
        {(!about?.analytics || about.analytics.length === 0) && (
          <div className="grid grid-cols-3 gap-8 text-center py-8">
            <div>
              <p className="font-heading text-4xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Products</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-bold text-foreground">15+</p>
              <p className="text-sm text-muted-foreground mt-1">Countries</p>
            </div>
          </div>
        )}

        <p className="text-muted-foreground leading-relaxed text-center">
          {about?.description_2}
        </p>
      </div>
    </div>
  );
};

export default About;