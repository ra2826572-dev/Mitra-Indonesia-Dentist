import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-9', variant = 'full' }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Unique Dental Clinic Emblem: Modern organic dental crown contour intertwined with a protective care arc and subtle health cross in deep teal & vibrant turquoise */}
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white shadow-sm ring-1 ring-teal-900/10 shrink-0">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5.5 h-5.5"
          aria-hidden="true"
        >
          {/* Tooth crown contour */}
          <path
            d="M8.5 7C6 7 4 9.5 4 13C4 18 7 24 10 27C12 29 13.5 28.5 14.5 25C15.5 21.5 16.5 21.5 17.5 25C18.5 28.5 20 29 22 27C25 24 28 18 28 13C28 9.5 26 7 23.5 7C21 7 19 9 16 9C13 9 11 7 8.5 7Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M8.5 7C6 7 4 9.5 4 13C4 18 7 24 10 27C12 29 13.5 28.5 14.5 25C15.5 21.5 16.5 21.5 17.5 25C18.5 28.5 20 29 22 27C25 24 28 18 28 13C28 9.5 26 7 23.5 7C21 7 19 9 16 9C13 9 11 7 8.5 7Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Aesthetic Care Sparkle / Enamel Cross */}
          <path
            d="M16 11V17M13 14H19"
            stroke="#5EEAD4"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold tracking-tight text-slate-900 text-base sm:text-lg">
            MITRA INDONESIA
          </span>
          <span className="text-[11px] font-semibold tracking-widest text-teal-700 uppercase">
            DENTIST
          </span>
        </div>
      )}
    </div>
  );
};
