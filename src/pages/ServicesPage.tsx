import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';
import { DentalService, Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { HelpCircle, Phone, Calendar } from 'lucide-react';

interface ServicesPageProps {
  services: DentalService[];
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  currentLang,
  onNavigatePage,
  onSelectServiceForBooking,
}) => {
  const t = translations[currentLang].services;

  const handleSelectService = (serviceName: string) => {
    onSelectServiceForBooking(serviceName);
    onNavigatePage('appointment');
  };

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description={t.subtitle}
        currentPageTitle={translations[currentLang].nav.services}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-4">
        <ServicesSection
          services={services}
          currentLang={currentLang}
          onSelectServiceForBooking={handleSelectService}
        />
      </div>

      {/* Consultative Help Strip */}
      <section className="py-14 bg-white border-t border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Bingung Memilih Layanan yang Tepat untuk Keluhan Anda?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Diskusikan keluhan gigi Anda bersama dokter kami. Kami akan melakukan pemeriksaan menyeluruh dan memberikan rekomendasi perawatan terbaik.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => onNavigatePage('appointment')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Buat Janji Konsultasi</span>
              </button>
              <a
                href="https://wa.me/6282138823000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Chat Tanya Dokter</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
