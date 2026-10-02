import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { DentistProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { Award, CheckCircle2, Clock, Calendar, ShieldCheck, Stethoscope } from 'lucide-react';

interface DentistPageProps {
  dentist: DentistProfile;
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const DentistPage: React.FC<DentistPageProps> = ({
  dentist,
  currentLang,
  onNavigatePage,
}) => {
  const t = translations[currentLang].dentist;

  return (
    <div>
      <PageHeader
        category={t.sectionTitle}
        title={t.title}
        description={t.subtitle}
        currentPageTitle={translations[currentLang].nav.dentist}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-6 sm:p-10 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Doctor Portrait & Legal Badges */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
                <div className="relative w-full max-w-sm rounded-2xl overflow-hidden aspect-3/4 bg-slate-200 shadow-md border border-slate-200">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-1">
                      <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{t.verifiedDoctor}</span>
                    </div>
                    <p className="text-xs text-slate-200">Pondok Pinang, Kebayoran Lama</p>
                  </div>
                </div>

                {/* Verified Legal Registrations (STR & SIP) */}
                <div className="mt-5 w-full bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">{t.sipLabel}</span>
                    <span className="font-mono text-teal-800 font-medium">{dentist.sipNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">{t.strLabel}</span>
                    <span className="font-mono text-slate-800 font-medium">{dentist.strNumber}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Biography & Clinical Focus */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {dentist.name}
                    </h2>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
                      {dentist.experienceYears}+ Tahun Pengalaman Klinis
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-teal-800 mb-4">
                    {currentLang === 'id' ? dentist.titleId : dentist.titleEn}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {currentLang === 'id' ? dentist.bioId : dentist.bioEn}
                  </p>

                  {/* Qualifications & Certifications */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-teal-600" />
                      <span>{t.credentialsHeading}</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                      {(currentLang === 'id' ? dentist.qualificationsId : dentist.qualificationsEn).map(
                        (q, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{q}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Clinical Focus / Specialties */}
                  <div className="mb-6 pt-4 border-t border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
                      <Stethoscope className="w-4 h-4 text-teal-600" />
                      <span>{t.specialtiesHeading}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(currentLang === 'id' ? dentist.specialtiesId : dentist.specialtiesEn).map(
                        (spec, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white text-slate-700 text-xs rounded-lg border border-slate-200 font-medium"
                          >
                            {spec}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Consultation Hours */}
                  <div className="p-4 bg-teal-50/70 border border-teal-200/70 rounded-xl text-xs sm:text-sm text-teal-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                      <span className="font-semibold">{t.scheduleHeading}:</span>
                      <span>{currentLang === 'id' ? dentist.scheduleId : dentist.scheduleEn}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigatePage('appointment')}
                    className="px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Jadwalkan Konsultasi dengan Dokter</span>
                  </button>

                  <p className="text-xs text-slate-500">
                    Kunjungan ditangani langsung dengan reservasi terjadwal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
