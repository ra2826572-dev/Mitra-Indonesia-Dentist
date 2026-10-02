import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigatePage }) => {
  const t = translations[currentLang].footer;
  const nav = translations[currentLang].nav;

  const handleNav = (page: PageId) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 text-left">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <button onClick={() => handleNav('home')} className="brightness-0 invert text-left cursor-pointer">
              <Logo />
            </button>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.aboutClinic}
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Surat Izin Praktik Resmi · Higienitas Standar Medis</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dentist')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.dentist}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('reviews')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-teal-400 transition-colors cursor-pointer"
                >
                  {nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t.contactInfo}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Gg. Murni No.24, RT.4/RW.7, Pondok Pinang, Kebayoran Lama, Jakarta Selatan 12310
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+6282138823000" className="hover:text-teal-400">
                  +62 821-3882-3000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Setiap Hari: 09.00 – 21.00 WIB</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNav('appointment')}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {nav.bookAppointment}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar without admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-teal-400 hover:underline transition-colors cursor-pointer"
            >
              {t.privacyPolicy}
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-teal-400 hover:underline transition-colors cursor-pointer"
            >
              {t.termsConditions}
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center mt-6 max-w-3xl mx-auto leading-relaxed">
          {t.disclaimer}
        </p>
      </div>
    </footer>
  );
};
