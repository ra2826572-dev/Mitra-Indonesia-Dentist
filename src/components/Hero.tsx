import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Star, Clock, MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onBookClick, onExploreServices }) => {
  const t = translations[currentLang].hero;

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F0FDF9]/80 via-white to-white">
      {/* Background architectural aura */}
      <div
        className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-teal-100/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-0 -translate-x-1/4 w-[450px] h-[450px] rounded-full bg-teal-50/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Social Proof Claim adjacent to headline: Zero-Pill Discipline */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 mb-4 bg-teal-50/70 border border-teal-200/60 rounded-lg px-3 py-1.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-800 tabular-nums">5.0</span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="text-slate-700">{t.ratingCount}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5 [text-wrap:balance]">
              {t.headline}
            </h1>

            {/* Subheadline description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              {t.subheadline}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md shadow-teal-900/10 hover:shadow-lg transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 whitespace-nowrap active:scale-[0.99]"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookCta}</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 whitespace-nowrap"
              >
                <span>{t.servicesCta}</span>
                <ArrowRight className="w-4 h-4 text-teal-700" />
              </button>
            </div>

            {/* Trust Metadata Strip (Clean unboxed text with separators) */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.scheduleNotice}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">|</span>
              <div className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{t.locationShort}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">|</span>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>100% Sterilisasi Autoklaf</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-950/10 border border-slate-200/90 bg-slate-100 aspect-16/11 group">
              <img
                src="/images/hero_dental_clinic_1790943270925.jpg"
                alt="Mitra Indonesia Dentist - Ruang Perawatan dan Klinik Modern di Pondok Pinang"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Verified Trust Label on visual */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between gap-3 text-left">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-teal-800">
                    Mitra Indonesia Dentist
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Gg. Murni No.24, Pondok Pinang, Kebayoran Lama
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Buka Sekarang</span>
                  </div>
                  <span className="text-[11px] text-slate-500">09.00 – 21.00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
