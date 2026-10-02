import React from 'react';
import { PatientReview, Language } from '../types';
import { translations } from '../i18n/translations';
import { Star, ExternalLink, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: PatientReview[];
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, currentLang }) => {
  const t = translations[currentLang].reviews;

  // Google Maps Search link for Mitra Indonesia Dentist Pondok Pinang Kebayoran Lama
  const googleMapsReviewsUrl =
    'https://www.google.com/maps/search/?api=1&query=Mitra+Indonesia+Dentist+Pondok+Pinang+Jakarta';

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Big Social Proof Rating Anchor */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {t.sectionTitle}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3 [text-wrap:balance]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">{t.subtitle}</p>
          </div>

          {/* Google 5.0 Rating Summary Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 flex items-center gap-4 shrink-0 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 font-extrabold text-xl shrink-0 tabular-nums">
              5.0
            </div>
            <div className="text-left">
              <div className="flex items-center text-amber-400 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-900">
                518 Ulasan Google Bintang 5
              </p>
              <a
                href={googleMapsReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 hover:underline mt-0.5"
              >
                <span>{t.viewGoogleReviews}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {reviews.map((rev) => {
            const comment = currentLang === 'id' ? rev.commentId : rev.commentEn;
            const treatment =
              currentLang === 'id' ? rev.treatmentTagId : rev.treatmentTagEn;

            return (
              <div
                key={rev.id}
                className="bg-slate-50/60 rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:bg-white hover:border-teal-300 transition-all duration-200 shadow-2xs"
              >
                <div>
                  {/* Rating Stars & Verified metadata */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    {/* Zero-Pill Discipline: Unboxed metadata */}
                    <div className="flex items-center gap-1 text-[11px] text-teal-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.verifiedPatient}</span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
                    "{comment}"
                  </p>
                </div>

                {/* Author & Treatment metadata strip */}
                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                  <div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{rev.author}</p>
                    <p className="text-[11px] text-teal-800 font-medium">{treatment}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 tabular-nums">{rev.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Google Reviews CTA Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-50/70 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Puas dengan pelayanan kami di Mitra Indonesia Dentist?
              </p>
              <p className="text-xs text-slate-600">
                Bagikan pengalaman perawatan gigi Anda di Google Maps untuk membantu pasien lain.
              </p>
            </div>
          </div>
          <a
            href={googleMapsReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-semibold text-teal-900 bg-white hover:bg-slate-50 border border-teal-300 rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Tulis Ulasan di Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
