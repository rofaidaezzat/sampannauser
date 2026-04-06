import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="section-heading text-center mb-6">{t('aboutTitle')}</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="aspect-video overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
            alt="Our store"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg text-center">
          At LUXE, we believe that fashion is more than just clothing — it's a form of self-expression. Founded in 2020, we've been curating collections that blend timeless elegance with contemporary trends.
        </p>
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
        <p className="text-muted-foreground leading-relaxed text-center">
          Every piece in our collection is carefully selected for quality, comfort, and style. We work with sustainable materials and ethical manufacturers to bring you fashion that feels good in every way.
        </p>
      </div>
    </div>
  );
};

export default About;
