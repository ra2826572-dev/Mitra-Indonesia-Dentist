import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ReviewsSection } from '../components/ReviewsSection';
import { PatientReview, Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { Star, ExternalLink, Calendar, HeartHandshake } from 'lucide-react';

interface ReviewsPageProps {
  reviews: PatientReview[];
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  currentLang,
  onNavigatePage,
}) => {
  const t = translations[currentLang].reviews;

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description={t.subtitle}
        currentPageTitle={translations[currentLang].nav.reviews}
        onNavigateHome={() => onNavigatePage('home')}
      />

      {/* Rating Proof Marquee Summary */}
      <section className="py-8 bg-teal-50/40 border-b border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-700 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-amber-500 tabular-nums">5.0 / 5.0</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="font-semibold text-slate-800">
              518 Pasien Telah Memberikan Ulasan Bintang 5 di Google
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-teal-800 font-medium">
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              <span>100% Kepuasan & Kenyamanan Pasien</span>
            </div>
          </div>
        </div>
      </section>

      <div className="py-4">
        <ReviewsSection
          reviews={reviews}
          currentLang={currentLang}
        />
      </div>

      <section className="py-14 bg-slate-50/70 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Ingin Merasakan Perawatan Gigi Nyaman Seperti Mereka?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Jadwalkan kunjungan Anda tanpa antrean panjang melalui reservasi online mudah kami.
          </p>
          <button
            onClick={() => onNavigatePage('appointment')}
            className="px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Buat Janji Temu Sekarang</span>
          </button>
        </div>
      </section>
    </div>
  );
};
