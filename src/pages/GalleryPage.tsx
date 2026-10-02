import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { GallerySection } from '../components/GallerySection';
import { GalleryItem, Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { Calendar } from 'lucide-react';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  galleryItems,
  currentLang,
  onNavigatePage,
}) => {
  const t = translations[currentLang].gallery;

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description={t.subtitle}
        currentPageTitle={translations[currentLang].nav.gallery}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-4">
        <GallerySection
          galleryItems={galleryItems}
          currentLang={currentLang}
        />
      </div>

      <section className="py-14 bg-white border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Ingin Mengunjungi Klinik Secara Langsung?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Klinik kami berlokasi di Pondok Pinang, Kebayoran Lama, Jakarta Selatan dan buka setiap hari pukul 09.00 – 21.00 WIB.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigatePage('appointment')}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Buat Janji Temu</span>
            </button>
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            >
              <span>Petunjuk Lokasi & Peta</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
