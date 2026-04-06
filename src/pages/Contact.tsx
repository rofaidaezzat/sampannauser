import { useLanguage } from '@/context/LanguageContext';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="section-heading text-center mb-12">{t('contactTitle')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <div className="space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            We'd love to hear from you. Whether you have a question about our products, sizing, or anything else — our team is ready to help.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <Mail size={20} className="text-secondary" />
              <span>info@luxe.com</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Phone size={20} className="text-secondary" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <MapPin size={20} className="text-secondary" />
              <span>123 Fashion Ave, New York, NY 10001</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t('name')}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary"
          />
          <input
            type="email"
            placeholder={t('email')}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary"
          />
          <textarea
            placeholder={t('message')}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full px-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary resize-none"
          />
          <button type="submit" className="btn-shop w-full">{t('sendMessage')}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
