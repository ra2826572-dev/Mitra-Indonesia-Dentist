import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { Calendar } from 'lucide-react';

interface ContactPageProps {
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang, onNavigatePage }) => {
  const t = translations[currentLang].contact;

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description={t.subtitle}
        currentPageTitle={translations[currentLang].nav.contact}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-4">
        <ContactSection
          currentLang={currentLang}
        />
      </div>

      <section className="py-12 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Ingin Langsung Konsultasi dengan Dokter Gigi Kami?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-5">
            Pilih tanggal dan jam yang nyaman untuk Anda tanpa perlu menunggu antrean di klinik.
          </p>
          <button
            onClick={() => onNavigatePage('appointment')}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reservasi Janji Temu Online</span>
          </button>
        </div>
      </section>
    </div>
  );
};
