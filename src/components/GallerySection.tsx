import React, { useState } from 'react';
import { GalleryItem, Language } from '../types';
import { translations } from '../i18n/translations';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  currentLang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems, currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const t = translations[currentLang].gallery;

  const categories = [
    { id: 'all', label: t.all },
    { id: 'treatment', label: t.treatment },
    { id: 'interior', label: t.interior },
    { id: 'equipment', label: t.equipment },
    { id: 'consultation', label: t.consultation },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50/70 border-b border-slate-100">
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

          {/* Category Filter */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const title = currentLang === 'id' ? item.titleId : item.titleEn;
            const caption = currentLang === 'id' ? item.captionId : item.captionEn;

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 bg-white/90 text-slate-900 rounded-full shadow-md">
                      <Maximize2 className="w-5 h-5 text-teal-800" />
                    </span>
                  </div>
                </div>

                <div className="p-4 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {caption}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-semibold">
                    <span>{t.zoomNotice}</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-hidden z-20"
            aria-label={t.closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-hidden z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-hidden z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
          >
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={
                  currentLang === 'id'
                    ? filteredItems[lightboxIndex].titleId
                    : filteredItems[lightboxIndex].titleEn
                }
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-6 bg-slate-900 text-left text-white border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">
                  {currentLang === 'id'
                    ? filteredItems[lightboxIndex].titleId
                    : filteredItems[lightboxIndex].titleEn}
                </h3>
                <span className="text-xs text-slate-400 tabular-nums">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {currentLang === 'id'
                  ? filteredItems[lightboxIndex].captionId
                  : filteredItems[lightboxIndex].captionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
