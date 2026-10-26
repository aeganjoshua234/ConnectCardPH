import React, { useState, useEffect } from 'react';
import { 
  getStoredOrders, 
  getStoredProducts, 
  getStoredProfile,
  getStoredReviews 
} from './utils/storage';
import { Order, Product, DigitalProfile, ClientReview } from './types';
import { FAQS, SAMPLE_RECENT_WORKS, SAMPLE_ACHIEVEMENTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { OrderPage } from './pages/OrderPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { QrPage } from './pages/QrPage';
import { 
  Sparkles, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Wifi,
  ChevronRight,
  X
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  
  // Local storage backed state
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<DigitalProfile | null>(null);
  const [reviews, setReviews] = useState<ClientReview[]>([]);

  // Beginner guide modal state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showTopNotice, setShowTopNotice] = useState(true);

  // Language state: 'tl' (Taglish/Filipino) or 'en' (English)
  const [lang, setLang] = useState<'en' | 'tl'>('tl');

  // Load stored state on mount
  useEffect(() => {
    setOrders(getStoredOrders());
    setProducts(getStoredProducts());
    setProfile(getStoredProfile());
    setReviews(getStoredReviews());

    // Check hash for initial route if direct link
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      if (hash.startsWith('profile')) {
        setCurrentPage('profile');
      } else if (['products', 'order', 'admin', 'qr', 'home'].includes(hash)) {
        setCurrentPage(hash);
      }
    }
  }, []);

  const handleNavigate = (page: string, params?: { productId?: string }) => {
    setCurrentPage(page);
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    setLang(lang === 'tl' ? 'en' : 'tl');
  };

  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white pb-16 md:pb-0">
      
      {/* Top Beginner Notification Banner */}
      {showTopNotice && (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-b border-blue-900/50 px-4 py-2 text-xs text-slate-300">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <p className="truncate">
                <strong className="text-white font-medium">
                  {lang === 'tl' ? '📱 Mobile Friendly:' : '📱 Mobile User Notice:'}
                </strong>{' '}
                {lang === 'tl'
                  ? 'Ligtas subukan! Ang orders ay tunay na naitatabi sa iyong phone browser (localStorage). Walang bayad o kabawasang magaganap.'
                  : 'Safe demo! Orders are genuinely saved to your browser (localStorage). No real bank charges will ever occur.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="underline text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                {lang === 'tl' ? 'Alamin ang detalye' : 'Read guide'}
              </button>
              <button
                onClick={() => setShowTopNotice(false)}
                className="text-slate-400 hover:text-white p-0.5 rounded"
                aria-label="Dismiss banner"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        orderCount={orders.filter(o => o.status === 'pending').length}
        onOpenGuide={() => setIsGuideOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            faqs={FAQS}
            recentWorks={SAMPLE_RECENT_WORKS}
            reviews={reviews}
            achievements={SAMPLE_ACHIEVEMENTS}
            onReviewAdded={(newRev) => setReviews((prev) => [newRev, ...prev])}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            onSelectProduct={(pId) => handleNavigate('order', { productId: pId })}
            lang={lang}
          />
        )}

        {currentPage === 'order' && (
          <OrderPage
            products={products}
            initialProductId={selectedProductId}
            onOrderSuccess={handleOrderCreated}
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentPage === 'profile' && profile && (
          <ProfilePage
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
            lang={lang}
          />
        )}

        {currentPage === 'qr' && profile && (
          <QrPage
            profile={profile}
            lang={lang}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            orders={orders}
            products={products}
            onOrdersChange={(newOrders) => setOrders(newOrders)}
            onProductsChange={(newProducts) => setProducts(newProducts)}
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060a14] py-10 px-4 sm:px-6 text-slate-400 text-xs">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-black text-sm">
                C
              </div>
              <span className="text-base font-extrabold text-white font-heading">
                ConnectCard<span className="text-cyan-400">.ph</span>
              </span>
              <span className="text-[10px] text-slate-500 border border-slate-800 rounded px-1.5 py-0.5">
                NFC • Philippines
              </span>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
              <button onClick={() => handleNavigate('home')} className="hover:text-cyan-400">Home</button>
              <button onClick={() => handleNavigate('products')} className="hover:text-cyan-400">Products (₱)</button>
              <button onClick={() => handleNavigate('profile')} className="hover:text-cyan-400">Digital Card</button>
              <button onClick={() => handleNavigate('order')} className="hover:text-cyan-400">Order Form</button>
              <button onClick={() => handleNavigate('admin')} className="hover:text-cyan-400">Admin Dashboard</button>
              <button onClick={() => setIsGuideOpen(true)} className="text-cyan-400 font-semibold">Beginner Guide</button>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <p>
              © 2026 ConnectCard PH. Original Philippine Smart Card & Digital Profile Platform.
            </p>
            <div className="flex items-center gap-3">
              <span>🇵🇭 Made for Filipino Professionals</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Zero Hidden Fees</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Beginner Help & Transparency Modal */}
      <BeginnerGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        lang={lang}
      />

    </div>
  );
}
