import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  currentLang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentLang }) => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Halo Mitra Indonesia Dentist, saya ingin konsultasi dan tanya jadwal perawatan gigi.'
  );
  const whatsappUrl = `https://wa.me/6282138823000?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-end gap-3 pointer-events-none"
    >
      {/* Speech Tooltip */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 text-xs text-slate-700 pointer-events-auto animate-in fade-in slide-in-from-bottom-2">
          <span>
            {currentLang === 'id' ? 'Chat WhatsApp Resepsionis' : 'Chat Reception via WhatsApp'}
          </span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Mitra Indonesia Dentist via WhatsApp"
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-950/20 hover:shadow-2xl transition-all duration-200 flex items-center justify-center pointer-events-auto hover:scale-105 active:scale-95 group relative"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </aside>
  );
};
