/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, DentalService, GalleryItem, DentistProfile, PatientReview } from './types';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DentistPage } from './pages/DentistPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import {
  getServices,
  getGallery,
  getDentist,
  initializeStorage,
} from './services/storage';
import { INITIAL_REVIEWS } from './data/clinicData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Dynamic Content Data
  const [services, setServices] = useState<DentalService[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [dentist, setDentist] = useState<DentistProfile | null>(null);
  const [reviews] = useState<PatientReview[]>(INITIAL_REVIEWS);

  // Preselected service for booking
  const [preselectedTreatment, setPreselectedTreatment] = useState<string>('');

  useEffect(() => {
    initializeStorage();
    setServices(getServices());
    setGalleryItems(getGallery());
    setDentist(getDentist());

    // Check URL hash on initial load
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'about',
      'services',
      'dentist',
      'gallery',
      'reviews',
      'appointment',
      'contact',
      'privacy',
      'terms',
    ];
    if (hash && validPages.includes(hash)) {
      setCurrentPage(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '') as PageId;
      if (newHash && validPages.includes(newHash)) {
        setCurrentPage(newHash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigatePage = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setPreselectedTreatment(serviceName);
    handleNavigatePage('appointment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Top Navbar with multi-page navigation (No Admin) */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Distinct Page Container */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            currentLang={currentLang}
            services={services}
            dentist={dentist}
            reviews={reviews}
            onNavigatePage={handleNavigatePage}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentPage === 'dentist' && dentist && (
          <DentistPage
            dentist={dentist}
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            galleryItems={galleryItems}
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'reviews' && (
          <ReviewsPage
            reviews={reviews}
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'appointment' && (
          <AppointmentPage
            services={services}
            currentLang={currentLang}
            preselectedTreatment={preselectedTreatment}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'privacy' && (
          <LegalPage
            type="privacy"
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'terms' && (
          <LegalPage
            type="terms"
            currentLang={currentLang}
            onNavigatePage={handleNavigatePage}
          />
        )}
      </main>

      {/* Footer (No Admin) */}
      <Footer
        currentLang={currentLang}
        onNavigatePage={handleNavigatePage}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp currentLang={currentLang} />
    </div>
  );
}
