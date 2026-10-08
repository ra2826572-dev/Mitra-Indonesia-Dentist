import React from 'react';
import { Hero } from '../components/Hero';
import { DentalService, DentistProfile, PatientReview, Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import {
  ArrowRight,
  Shield,
  HeartHandshake,
  Microscope,
  Sparkles,
  Star,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  currentLang: Language;
  services: DentalService[];
  dentist: DentistProfile | null;
  reviews: PatientReview[];
  onNavigatePage: (page: PageId) => void;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  services,
  dentist,
  reviews,
  onNavigatePage,
  onSelectServiceForBooking,
}) => {
  const tAbout = translations[currentLang].about;
  const tFeatures = translations[currentLang].features;
  const tServices = translations[currentLang].services;
  const tDentist = translations[currentLang].dentist;
  const tReviews = translations[currentLang].reviews;
  const tContact = translations[currentLang].contact;

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        currentLang={currentLang}
        onBookClick={() => onNavigatePage('appointment')}
        onExploreServices={() => onNavigatePage('services')}
      />

      {/* 2. Care Standards Bento Row */}
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{tFeatures.f1_title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tFeatures.f1_desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{tFeatures.f2_title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tFeatures.f2_desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{tFeatures.f3_title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tFeatures.f3_desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{tFeatures.f4_title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{tFeatures.f4_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Teaser Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 bg-slate-100">
                <img
                  src="/images/dental_consultation_1790943309754.jpg"
                  alt="Suasana Klinik Mitra Indonesia Dentist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-3 bg-teal-700 text-white p-4 rounded-xl shadow-xl max-w-xs text-left">
                <p className="text-2xl font-black tabular-nums">5.0 ★</p>
                <p className="text-xs text-teal-100 mt-0.5">518 Ulasan Pasien Terverifikasi</p>
              </div>
            </div>

            <div className="lg:col-span-6 text-left space-y-4">
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                {tAbout.sectionTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
                {tAbout.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {tAbout.p1}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tAbout.p2}
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigatePage('about')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <span>Pelajari Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigatePage('appointment')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Buat Janji Temu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Treatments Showcase */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 text-left">
            <div>
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                {tServices.sectionTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Layanan Dental Unggulan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Perawatan gigi komprehensif mulai dari scaling ultrasonik hingga estetika senyum.
              </p>
            </div>
            <button
              onClick={() => onNavigatePage('services')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline cursor-pointer"
            >
              <span>Lihat Semua 7 Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {services.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-teal-400 hover:bg-white transition-all shadow-2xs group"
              >
                <div>
                  {service.image && (
                    <div className="h-44 overflow-hidden bg-slate-200">
                      <img
                        src={service.image}
                        alt={service.nameId}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {currentLang === 'id' ? service.nameId : service.nameEn}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {currentLang === 'id' ? service.shortDescId : service.shortDescEn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => {
                      const name = currentLang === 'id' ? service.nameId : service.nameEn;
                      onSelectServiceForBooking(name);
                    }}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Pilih Layanan Ini
                  </button>
                  <button
                    onClick={() => onNavigatePage('services')}
                    className="py-2.5 px-3 text-xs font-medium text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Doctor Spotlight Banner */}
      {dentist && (
        <section className="py-20 bg-slate-50/70 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center gap-8 text-left">
              <div className="w-36 h-48 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-md">
                <img
                  src={dentist.image}
                  alt={dentist.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                  {tDentist.sectionTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {dentist.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-teal-800">
                  {currentLang === 'id' ? dentist.titleId : dentist.titleEn} · {dentist.sipNumber}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl line-clamp-3">
                  {currentLang === 'id' ? dentist.bioId : dentist.bioEn}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>Jadwal: {currentLang === 'id' ? dentist.scheduleId : dentist.scheduleEn}</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigatePage('dentist')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Lihat Profil Dokter
                </button>
                <button
                  onClick={() => onNavigatePage('appointment')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Buat Janji Kunjungan
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Reviews Preview Row */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-left">
            <div>
              <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
                {tReviews.sectionTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {tReviews.title}
              </h2>
            </div>
            <button
              onClick={() => onNavigatePage('reviews')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline cursor-pointer"
            >
              <span>Lihat Semua Ulasan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                    "{currentLang === 'id' ? rev.commentId : rev.commentEn}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{rev.author}</span>
                  <span className="text-teal-700 font-semibold">{tReviews.verifiedPatient}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Action Banner: Visit or Book */}
      <section className="py-16 bg-gradient-to-r from-teal-800 to-teal-900 text-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Jadwalkan Kunjungan Gigi Anda Sekarang
              </h2>
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                Buka setiap hari jam 09.00 – 21.00 WIB di Gg. Murni No.24, Pondok Pinang, Kebayoran Lama, Jakarta Selatan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigatePage('appointment')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-teal-900 bg-white hover:bg-teal-50 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Reservasi Jadwal Online
              </button>
              <button
                onClick={() => onNavigatePage('contact')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-teal-700/80 hover:bg-teal-700 border border-teal-500 rounded-xl transition-colors cursor-pointer"
              >
                Lihat Alamat & Peta
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
