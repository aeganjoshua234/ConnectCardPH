import React from 'react';
import { 
  CreditCard, 
  ShoppingBag, 
  UserCheck, 
  LayoutDashboard, 
  Home, 
  QrCode, 
  Sparkles, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: { productId?: string }) => void;
  orderCount: number;
  onOpenGuide: () => void;
  lang: 'en' | 'tl';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  orderCount,
  onOpenGuide,
  lang,
  onToggleLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: lang === 'tl' ? 'Home' : 'Home', icon: Home },
    { id: 'products', label: lang === 'tl' ? 'Mga Produkto' : 'Products', icon: ShoppingBag },
    { id: 'profile', label: lang === 'tl' ? 'Digital Profile' : 'Digital Card', icon: UserCheck },
    { id: 'qr', label: lang === 'tl' ? 'QR Code' : 'QR Scanner', icon: QrCode },
    { id: 'order', label: lang === 'tl' ? 'Order' : 'Order Now', icon: CreditCard, highlight: true },
    { id: 'admin', label: lang === 'tl' ? 'Admin' : 'Admin', icon: LayoutDashboard, badge: orderCount }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-blue-900/50 bg-[#091124]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left transition hover:opacity-90"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 shadow-lg shadow-blue-500/25">
              <span className="text-xl font-black text-white tracking-tighter">C</span>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[9px] font-bold text-slate-950">
                PH
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white font-heading">
                  ConnectCard<span className="text-cyan-400">.ph</span>
                </span>
                <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/30">
                  NFC
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Smart NFC & Digital Business Cards PH
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-1 rounded-full bg-cyan-500 px-1.5 py-0.2 text-[10px] font-bold text-slate-950">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Taglish / English toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800"
              title="Toggle Filipino / English"
            >
              <span className={lang === 'tl' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>PH</span>
              <span className="text-slate-600">/</span>
              <span className={lang === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>EN</span>
            </button>

            {/* Beginner Guide Info Button */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1 rounded-lg bg-blue-950/70 border border-blue-800/50 px-2.5 py-1.5 text-xs text-blue-200 hover:bg-blue-900/60 transition"
              title="How this website works"
            >
              <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{lang === 'tl' ? 'Gabay' : 'Help / Guide'}</span>
            </button>

            {/* Mobile Top Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Secondary) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0c1630] px-4 py-3 space-y-1 animate-in fade-in slide-in-from-top-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 pb-1">
              {lang === 'tl' ? 'Pumili ng Pahina' : 'Navigation'}
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-cyan-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-bold text-slate-950">
                      {link.badge} orders
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (App-like feel for smartphone users) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-blue-900/60 bg-[#091124]/95 backdrop-blur-lg px-2 py-1.5 shadow-2xl">
        <div className="grid grid-cols-5 gap-1">
          {navLinks.filter(l => l.id !== 'qr').concat([
            { id: 'admin', label: lang === 'tl' ? 'Admin' : 'Admin', icon: LayoutDashboard, badge: orderCount }
          ]).slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center rounded-xl py-1 px-1 transition ${
                  isActive
                    ? 'text-cyan-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-400'}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[9px] font-extrabold text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="mt-0.5 text-[10px] leading-tight truncate max-w-full">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 h-0.5 w-6 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
