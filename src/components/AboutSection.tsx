import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sparkles, Shield, HeartHandshake, Microscope, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang].about;
  const f = translations[currentLang].features;

  const keyStandards = [
    {
      icon: Shield,
      title: f.f1_title,
      desc: f.f1_desc,
    },
    {
      icon: HeartHandshake,
      title: f.f2_title,
      desc: f.f2_desc,
    },
    {
      icon: Microscope,
      title: f.f3_title,
      desc: f.f3_desc,
    },
    {
      icon: Sparkles,
      title: f.f4_title,
      desc: f.f4_desc,
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {t.sectionTitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4 [text-wrap:balance]">
            {t.title}
          </h2>
          <div className="h-1 w-16 bg-teal-600 rounded-full" />
        </div>

        {/* Narrative & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 aspect-4/3 bg-slate-100">
              <img
                src="/src/assets/images/dental_consultation_1790943309754.jpg"
                alt="Lobi Konsultasi Pasien Mitra Indonesia Dentist"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <p className="text-sm font-semibold">Suasana Nyaman & Ramah Pasien</p>
                <p className="text-xs text-slate-200">
                  Desain interior tenang di Pondok Pinang untuk meredakan rasa cemas Anda
                </p>
              </div>
            </div>

            {/* Quick Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-teal-700 text-white p-4 rounded-xl shadow-xl max-w-xs text-left">
              <p className="text-2xl font-black tabular-nums">5.0 ★</p>
              <p className="text-xs text-teal-100 mt-1">
                518 Ulasan Pasien Terverifikasi di Google Maps
              </p>
            </div>
          </div>

          {/* Editorial Narrative */}
          <div className="lg:col-span-6 space-y-4 text-slate-600 text-base leading-relaxed text-left">
            <p className="font-medium text-slate-800 text-lg leading-relaxed">{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onBookClick}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors"
              >
                Konsultasikan Kondisi Gigi Anda
              </button>
              <div className="text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Tanpa antrean panjang dengan sistem reservasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Clinical Standards (Bento-like Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {keyStandards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 hover:bg-white transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
