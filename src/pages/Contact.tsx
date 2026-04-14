import { useLanguage } from '@/context/LanguageContext';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import ContactBg from '@/assets/contact-bg.png';
import { createContact } from '@/lib/api';

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await createContact(form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="section-heading text-center mb-12">{t('contactTitle')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-10 flex flex-col justify-center space-y-8 min-h-[400px] shadow-lg">
          <div className="absolute inset-0 z-0">
            <img src={ContactBg} alt="Contact Background" className="w-full h-full object-cover brightness-50" />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 text-white space-y-8">
            <p className="text-white/90 leading-relaxed text-lg">
              We'd love to hear from you. Whether you have a question about our products, sizing, or anything else — our team is ready to help.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Mail size={22} className="text-secondary" />
                </div>
                <span className="text-lg font-medium">evristclimber@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Phone size={22} className="text-secondary" />
                </div>
                <span className="text-lg font-medium">01111530022</span>
              </div>
              <div className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <MapPin size={22} className="text-secondary" />
                </div>
                <span className="text-lg font-medium">الإسماعيلية</span>
              </div>
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
          <button type="submit" disabled={isSubmitting} className="btn-shop w-full disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? 'Sending...' : t('sendMessage')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
