import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Menu, X, Calendar } from 'lucide-react';

export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'dentist'
  | 'gallery'
  | 'reviews'
  | 'appointment'
  | 'contact'
  | 'privacy'
  | 'terms';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentPage,
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang].nav;

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'dentist', label: t.dentist },
    { id: 'gallery', label: t.gallery },
    { id: 'reviews', label: t.reviews },
    { id: 'contact', label: t.contact },
  ];

  const handlePageSelect = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigatePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handlePageSelect('home')}
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg cursor-pointer"
          >
            <Logo />
          </button>

          {/* Zone 2: Multi-page navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageSelect(item.id)}
                  className={`relative py-1 transition-colors hover:text-teal-700 whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-teal-800 font-bold' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language switcher + Primary Action (NO ADMIN) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
              <button
                onClick={() => onLanguageChange('id')}
                aria-label="Bahasa Indonesia"
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentLang === 'id'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                aria-label="English Language"
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Primary Action Button -> Navigates to dedicated Booking Page */}
            <button
              onClick={() => handlePageSelect('appointment')}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all focus:outline-hidden whitespace-nowrap cursor-pointer ${
                currentPage === 'appointment'
                  ? 'bg-teal-900 text-white ring-2 ring-teal-500'
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookAppointment}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageSelect(item.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-teal-50 text-teal-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <button
                onClick={() => handlePageSelect('appointment')}
                className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
              >
                {t.bookAppointment}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
