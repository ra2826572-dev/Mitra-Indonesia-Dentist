import React, { useState } from 'react';
import { DentalService, Language } from '../types';
import { translations } from '../i18n/translations';
import {
  Sparkles,
  Sun,
  ShieldCheck,
  ClipboardList,
  HeartPulse,
  Activity,
  Smile,
  Clock,
  Check,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';

interface ServicesSectionProps {
  services: DentalService[];
  currentLang: Language;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  currentLang,
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<DentalService | null>(null);
  const t = translations[currentLang].services;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'Sun':
        return Sun;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'ClipboardList':
        return ClipboardList;
      case 'HeartPulse':
        return HeartPulse;
      case 'Smile':
        return Smile;
      default:
        return Activity;
    }
  };

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: t.allServices },
    { id: 'preventive', label: currentLang === 'id' ? 'Pencegahan & Scaling' : 'Preventive & Scaling' },
    { id: 'cosmetic', label: currentLang === 'id' ? 'Estetika & Bleaching' : 'Cosmetic & Whitening' },
    { id: 'restorative', label: currentLang === 'id' ? 'Restorasi & Tambal' : 'Restorative & Fillings' },
    { id: 'pediatric', label: currentLang === 'id' ? 'Gigi Anak' : 'Pediatric Care' },
    { id: 'general', label: currentLang === 'id' ? 'Umum & Konsultasi' : 'General & Urgent Care' },
  ];

  const handleBookService = (service: DentalService) => {
    setSelectedServiceModal(null);
    const serviceName = currentLang === 'id' ? service.nameId : service.nameEn;
    onSelectServiceForBooking(serviceName);
  };

  return (
    <section id="services" className="py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {t.sectionTitle}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3 [text-wrap:balance]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">{t.subtitle}</p>
          </div>

          {/* Interactive Filter Control Segmented Bar */}
          <div className="flex flex-wrap gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-xs self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredServices.map((service) => {
            const Icon = getIcon(service.iconName);
            const title = currentLang === 'id' ? service.nameId : service.nameEn;
            const desc = currentLang === 'id' ? service.shortDescId : service.shortDescEn;
            const benefits = currentLang === 'id' ? service.benefitsId : service.benefitsEn;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                {/* Service Card Top / Image / Header */}
                <div>
                  {service.image && (
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={service.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1.5 font-medium bg-slate-950/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5 text-teal-300" />
                          <span>~{service.durationMinutes} menit</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {desc}
                    </p>

                    {/* Key Benefits Preview */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => handleBookService(service)}
                    className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors text-center shadow-xs"
                  >
                    {t.bookThisService}
                  </button>
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    title="Detail Layanan"
                    aria-label="Detail Layanan"
                    className="p-2.5 text-slate-500 hover:text-teal-700 border border-slate-200 hover:border-teal-300 rounded-xl transition-colors bg-slate-50 hover:bg-white"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-depth Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left border border-slate-200">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Tutup detail modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                {React.createElement(getIcon(selectedServiceModal.iconName), { className: 'w-5 h-5' })}
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                  Mitra Indonesia Dentist
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {currentLang === 'id' ? selectedServiceModal.nameId : selectedServiceModal.nameEn}
                </h3>
              </div>
            </div>

            {selectedServiceModal.image && (
              <div className="rounded-xl overflow-hidden h-48 mb-5 border border-slate-200">
                <img
                  src={selectedServiceModal.image}
                  alt={selectedServiceModal.nameId}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 text-sm text-slate-700 mb-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Deskripsi Prosedur</h4>
                <p className="text-slate-600 leading-relaxed">
                  {currentLang === 'id'
                    ? selectedServiceModal.fullDescId
                    : selectedServiceModal.fullDescEn}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Manfaat & Keunggulan</h4>
                <ul className="space-y-2">
                  {(currentLang === 'id'
                    ? selectedServiceModal.benefitsId
                    : selectedServiceModal.benefitsEn
                  ).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-teal-50/70 border border-teal-200/60 rounded-xl text-xs text-teal-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  Estimasi durasi perawatan: ~{selectedServiceModal.durationMinutes} menit. Konsultasi transparan sebelum tindakan.
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleBookService(selectedServiceModal)}
                className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.bookThisService}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="py-3 px-4 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
