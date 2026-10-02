import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PageId } from './Navbar';

interface PageHeaderProps {
  category: string;
  title: string;
  description: string;
  currentPageTitle: string;
  onNavigateHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  title,
  description,
  currentPageTitle,
  onNavigateHome,
}) => {
  return (
    <div className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#F0FDF9]/90 via-white to-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <button
            onClick={onNavigateHome}
            className="hover:text-teal-700 transition-colors font-medium cursor-pointer"
          >
            Beranda
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-teal-800 font-semibold">{currentPageTitle}</span>
        </div>

        {/* Category kicker */}
        <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
          {category}
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3 [text-wrap:balance]">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          {description}
        </p>

        {/* Decorative divider */}
        <div className="h-1 w-16 bg-teal-600 rounded-full mt-6" />
      </div>
    </div>
  );
};
