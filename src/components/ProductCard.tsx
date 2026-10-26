import React, { useState } from 'react';
import { Product } from '../types';
import { Check, ShoppingCart, Zap, Info, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  lang: 'en' | 'tl';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, lang }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1630] transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-blue-950/40">
      
      {/* Product Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1630] via-transparent to-black/40" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-extrabold text-slate-950 shadow-md">
            {product.badge}
          </div>
        )}

        {/* Category tag */}
        <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-slate-300 uppercase tracking-wider border border-white/10">
          {product.category}
        </div>

        {/* Floating chip indicator */}
        {product.specs.chip && (
          <div className="absolute bottom-2 left-3 flex items-center gap-1 rounded bg-blue-950/80 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
            <Zap className="h-3 w-3 text-cyan-400" />
            <span>{product.specs.chip}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-white font-heading tracking-tight group-hover:text-cyan-300 transition-colors">
          {product.name}
        </h3>
        
        <p className="mt-1 text-xs text-slate-300 line-clamp-2">
          {product.tagline}
        </p>

        {/* Pricing in Philippine Pesos */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-black text-cyan-400 font-heading">
            ₱{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-500 line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.originalPrice && (
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
              Save ₱{(product.originalPrice - product.price).toLocaleString()}
            </span>
          )}
        </div>

        {/* Features Checklist */}
        <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3">
          {product.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <Check className="h-3.5 w-3.5 shrink-0 text-cyan-400 mt-0.5" />
              <span className="leading-tight">{feat}</span>
            </div>
          ))}
        </div>

        {/* Expandable Technical Specs */}
        {showDetails && (
          <div className="mt-3 space-y-1.5 rounded-xl bg-slate-900/80 p-3 text-[11px] text-slate-300 border border-blue-900/40 animate-in fade-in duration-200">
            <p className="font-semibold text-cyan-300 mb-1">
              {lang === 'tl' ? 'Detalyadong Katangian:' : 'Product Specifications:'}
            </p>
            {product.specs.material && (
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'tl' ? 'Materyal' : 'Material'}:</span>
                <span className="font-medium text-white">{product.specs.material}</span>
              </div>
            )}
            {product.specs.compatibility && (
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'tl' ? 'Phone Support' : 'Compatibility'}:</span>
                <span className="font-medium text-white">{product.specs.compatibility}</span>
              </div>
            )}
            {product.specs.durability && (
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'tl' ? 'Tibay' : 'Durability'}:</span>
                <span className="font-medium text-white">{product.specs.durability}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium text-slate-400 hover:text-cyan-300 transition"
        >
          <span>{showDetails ? (lang === 'tl' ? 'Itago ang specs' : 'Hide specifications') : (lang === 'tl' ? 'Tingnan ang specs' : 'View specifications')}</span>
          {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Action Footer */}
      <div className="border-t border-slate-800 bg-[#091124] p-4">
        <button
          onClick={() => onSelect(product.id)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-400 active:scale-98"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{lang === 'tl' ? 'Orderin Ngayon' : 'Order This Product'}</span>
        </button>
        <p className="mt-1.5 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="h-3 w-3 text-cyan-400" />
          <span>{lang === 'tl' ? 'Walang monthly bayarin • 1-time purchase' : 'No recurring fees • 1-time payment'}</span>
        </p>
      </div>
    </div>
  );
};
