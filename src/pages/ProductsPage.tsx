import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  lang: 'en' | 'tl';
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onSelectProduct,
  lang
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: lang === 'tl' ? 'Lahat ng Produkto' : 'All Products' },
    { id: 'card', label: lang === 'tl' ? 'NFC Business Cards' : 'NFC Business Cards' },
    { id: 'profile', label: lang === 'tl' ? 'Digital Profiles' : 'Digital Profiles' },
    { id: 'review', label: lang === 'tl' ? 'Google Review Cards' : 'Review Cards' },
    { id: 'bundle', label: lang === 'tl' ? 'Team Bundles' : 'Team Bundles' },
    { id: 'accessory', label: lang === 'tl' ? 'Accessories' : 'Tags & Accessories' }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-16 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-blue-950/60 px-3 py-1 text-xs font-semibold text-cyan-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'tl' ? 'Opisyal na Katalogo' : 'Official ConnectCard Catalog'}</span>
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-white font-heading sm:text-4xl">
          {lang === 'tl' ? 'Mga Produkto at Presyo (PHP)' : 'Smart NFC Products & Philippine Pricing'}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          {lang === 'tl'
            ? 'Lahat ng produkto ay one-time payment. Walang buwanang subscription o bayarin sa app.'
            : 'All products include lifetime digital profile hosting. Zero recurring monthly fees or mandatory subscriptions.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-slate-800 pb-5">
        
        {/* Category Pills (horizontal scrollable on mobile) */}
        <div className="flex w-full sm:w-auto items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'tl' ? 'Maghanap ng produkto...' : 'Search products...'}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-10 text-center">
          <p className="text-sm text-slate-400">
            {lang === 'tl' ? 'Walang nakitang produkto para sa iyong paghahanap.' : 'No products matched your search filter.'}
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs font-bold text-cyan-400 hover:underline"
          >
            {lang === 'tl' ? 'I-reset ang mga filter' : 'Reset filters'}
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              lang={lang}
            />
          ))}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-r from-blue-950/40 to-slate-900 p-5 sm:p-6 text-slate-300">
        <div className="grid sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Universal NFC Chip</p>
              <p className="text-[11px] text-slate-400">Works with iPhone XS+ and all modern Androids</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">NTAG216 High Speed</p>
              <p className="text-[11px] text-slate-400">Fast 0.2 second scan response rate</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Local PH Warranty</p>
              <p className="text-[11px] text-slate-400">1-Year hardware replacement guarantee</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
