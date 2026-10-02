import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { MapPin, Clock, Calendar, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';

interface AboutPageProps {
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang, onNavigatePage }) => {
  const t = translations[currentLang].about;

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description="Mengenal lebih dekat komitmen Mitra Indonesia Dentist dalam menghadirkan pelayanan kesehatan gigi terpercaya, higienis, dan ramah di Jakarta Selatan."
        currentPageTitle={translations[currentLang].nav.about}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-4">
        <AboutSection
          currentLang={currentLang}
          onBookClick={() => onNavigatePage('appointment')}
        />
      </div>

      {/* Additional Clinic Values & Highlights */}
      <section className="py-16 bg-white border-t border-slate-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-700" />
                <span>Lokasi Strategis</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Berlokasi di Gg. Murni No.24, Pondok Pinang, Kebayoran Lama. Akses mudah dari kawasan Pondok Indah, Ciputat Raya, dan TB Simatupang dengan area parkir aman.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-700" />
                <span>Jadwal Buka Panjang</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Melayani setiap hari (Senin s/d Minggu) mulai pukul 09.00 hingga 21.00 WIB, memudahkan konsultasi sepulang kantor atau di akhir pekan bersama keluarga.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-teal-700" />
                <span>Tanpa Rasa Cemas</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pendekatan ramah dan komunikasi terbuka sebelum setiap tindakan. Dokter menjelaskan setiap opsi secara transparan tanpa tekanan prosedur berlebih.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigatePage('appointment')}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Buat Janji Temu Perawatan Gigi</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
