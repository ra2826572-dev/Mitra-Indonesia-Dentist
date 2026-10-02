import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { AppointmentSection } from '../components/AppointmentSection';
import { DentalService, Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { HelpCircle, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AppointmentPageProps {
  services: DentalService[];
  currentLang: Language;
  preselectedTreatment?: string;
  onNavigatePage: (page: PageId) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({
  services,
  currentLang,
  preselectedTreatment,
  onNavigatePage,
}) => {
  const t = translations[currentLang].appointment;

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description={t.subtitle}
        currentPageTitle={translations[currentLang].nav.bookAppointment}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-6">
        <AppointmentSection
          services={services}
          currentLang={currentLang}
          preselectedTreatment={preselectedTreatment}
        />
      </div>

      {/* Booking Guidelines & FAQs */}
      <section className="py-14 bg-white border-t border-slate-200 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-700" />
            <span>Petunjuk & Informasi Reservasi Jadwal</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Waktu Kehadiran Pasien</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Kami menyarankan pasien untuk hadir 10-15 menit sebelum jam janji temu untuk pendaftaran awal dan sterilisasi instrumen.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Konfirmasi via WhatsApp</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Staf resepsionis kami akan mengirimkan pesan konfirmasi ketersediaan jadwal ke nomor WhatsApp yang Anda daftarkan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Privasi & Keamanan Data</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Data pribadi dan riwayat keluhan Anda terjaga kerahasiaannya dan hanya digunakan untuk keperluan pelayanan medis klinik kami.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Perubahan / Pembatalan Jadwal</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Jika Anda berhalangan hadir, mohon informasikan kepada resepsionis melalui WhatsApp setidaknya 2 jam sebelum jadwal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
