import React, { useState } from 'react';
import { RecentWork } from '../types';
import { 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  MapPin, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Eye,
  X
} from 'lucide-react';

interface RecentWorkSectionProps {
  works: RecentWork[];
  onOrderProduct: (productId?: string) => void;
  lang: 'en' | 'tl';
}

export const RecentWorkSection: React.FC<RecentWorkSectionProps> = ({
  works,
  onOrderProduct,
  lang
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalWork, setActiveModalWork] = useState<RecentWork | null>(null);

  const categories = [
    { id: 'all', label: lang === 'tl' ? 'Lahat ng Gawa' : 'All Projects' },
    { id: 'custom-card', label: lang === 'tl' ? 'Custom Cards' : 'Custom Cards' },
    { id: 'review-stand', label: lang === 'tl' ? 'Google Review Stands' : 'Review Stands' },
    { id: 'enterprise', label: lang === 'tl' ? 'Team Rollouts' : 'Corporate Teams' },
    { id: 'smart-tag', label: lang === 'tl' ? 'Smart Tags' : 'Smart Tags & Keychains' }
  ];

  const filtered = works.filter(
    (w) => selectedCategory === 'all' || w.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-blue-950/60 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
            <span>{lang === 'tl' ? 'Portfolio at Showcase' : 'Recent Work & Case Studies'}</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {lang === 'tl' ? 'Mga Natapos na Proyekto sa Pilipinas' : 'Recent Work for Filipino Clients'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            {lang === 'tl'
              ? 'Silipin ang mga tunay na custom NFC smart cards, acrylic review stands, at corporate bundles na ginawa namin para sa mga negosyo sa Metro Manila at Cebu.'
              : 'Discover how top Philippine real estate teams, cafes, aesthetic clinics, and tech consultancies use custom ConnectCard NFC hardware.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Recent Works */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((work) => (
          <div
            key={work.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1630] transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-blue-950/50"
          >
            {/* Image Header */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={work.image}
                alt={work.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1630] via-transparent to-black/50" />

              {/* Location Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-white/10">
                <MapPin className="h-3 w-3 text-cyan-400" />
                <span>{work.location}</span>
              </div>

              {/* Stats pill */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-1 text-xs font-black text-slate-950 shadow-lg">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>{work.stats}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-5 sm:p-6 space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                  {work.title}
                </h3>
                <p className="text-xs font-medium text-cyan-400 mt-0.5">
                  Client: {work.clientName} ({work.clientRole})
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {work.description}
              </p>

              {/* Hardware finish specs */}
              <div className="rounded-xl bg-slate-900/70 p-2.5 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <span className="font-bold text-cyan-400 shrink-0">Finish:</span>
                <span className="truncate">{work.finish}</span>
              </div>

              {/* Client quote */}
              <div className="border-l-2 border-cyan-400 pl-3 py-1 text-xs text-slate-300 italic">
                &ldquo;{work.testimonialSnippet}&rdquo;
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="border-t border-slate-800 bg-[#091124] p-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalWork(work)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition"
              >
                <Eye className="h-4 w-4 text-cyan-400" />
                <span>{lang === 'tl' ? 'Tingnan ang Detalye' : 'View Case Details'}</span>
              </button>

              <button
                onClick={() => onOrderProduct()}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow hover:from-blue-500 hover:to-cyan-400 transition"
              >
                <span>{lang === 'tl' ? 'Mag-order ng Katulad' : 'Order Similar Custom Card'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {activeModalWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-[#0c1630] p-6 shadow-2xl text-slate-100 space-y-4">
            <button
              onClick={() => setActiveModalWork(null)}
              className="absolute top-4 right-4 rounded-xl border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="h-48 w-full rounded-2xl overflow-hidden relative">
              <img
                src={activeModalWork.image}
                alt={activeModalWork.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                  {activeModalWork.stats}
                </span>
                <h3 className="text-base font-bold font-heading mt-1">{activeModalWork.title}</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Client Organization:</span>
                <span className="font-semibold text-white">{activeModalWork.clientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">{activeModalWork.location}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Hardware Specifications:</span>
                <span className="font-semibold text-cyan-300">{activeModalWork.finish}</span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1 font-bold">Project Summary & Impact:</span>
                <p className="leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {activeModalWork.description}
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/30 bg-blue-950/30 p-3.5 italic text-slate-200">
                &ldquo;{activeModalWork.testimonialSnippet}&rdquo;
                <p className="mt-1 text-[11px] text-cyan-400 font-bold not-italic">
                  — {activeModalWork.clientName}, {activeModalWork.clientRole}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveModalWork(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModalWork(null);
                  onOrderProduct();
                }}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 shadow"
              >
                {lang === 'tl' ? 'Pumunta sa Order Form' : 'Order This Custom Style'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
