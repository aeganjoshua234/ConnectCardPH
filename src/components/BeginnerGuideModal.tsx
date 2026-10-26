import React from 'react';
import { X, CheckCircle2, AlertCircle, Database, Shield, Smartphone, CreditCard } from 'lucide-react';

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'tl';
}

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-[#0c1630] p-5 sm:p-6 shadow-2xl text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3.5 pr-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              {lang === 'tl' ? 'Gabay para sa Mobile User' : 'Beginner Guide & Transparency'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'tl' ? 'Paano gamitin at ano ang totoo sa website na ito' : 'How this website works on your mobile phone'}
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="mt-4 space-y-4 text-xs sm:text-sm">
          {/* Honest Transparency Alert */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Database className="h-4 w-4 shrink-0" />
              <span>{lang === 'tl' ? 'Ano ang tunay na nase-save na data?' : 'Which features actually save data?'}</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {lang === 'tl' ? (
                <>
                  <strong className="text-white">Tunay na nase-save:</strong> Kapag nag-submit ka ng order sa Order Page o nag-edit ng Digital Profile, 
                  totoo itong nase-save sa memory ng iyong browser (<code className="text-cyan-300">localStorage</code>). 
                  Makikita mo agad ang bagong order mo sa <strong className="text-cyan-400">Admin Dashboard</strong> kahit i-refresh mo ang page!
                </>
              ) : (
                <>
                  <strong className="text-white">Actually Saved:</strong> When you place an order or edit the Digital Profile, 
                  it is genuinely stored in your phone browser&apos;s <code className="text-cyan-300">localStorage</code>. 
                  Your new orders will appear in the <strong className="text-cyan-400">Admin Dashboard</strong> and persist across refreshes!
                </>
              )}
            </p>
          </div>

          {/* Zero Charges & No Paid Subscriptions */}
          <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Shield className="h-4 w-4 shrink-0" />
              <span>{lang === 'tl' ? 'Walang bayad / Zero Charges' : '100% Free Demo • No Hidden Charges'}</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {lang === 'tl' ? (
                <>
                  Hindi kami magcha-charge sa iyo. Ang checkout ay prototype demonstration mode (GCash/Maya sample references). 
                  Walang credit card o pera na mababawas sa iyo.
                </>
              ) : (
                <>
                  You will NOT be charged any money. Payment options show simulated GCash/Maya reference flows for demonstration. 
                  No actual bank or credit card accounts are charged.
                </>
              )}
            </p>
          </div>

          {/* Testing Steps for Mobile */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-300">
              {lang === 'tl' ? 'Paano Subukan sa Cellphone (3 Hakbang):' : '3 Easy Steps to Test on Your Phone:'}
            </h4>
            <ol className="space-y-2 text-xs text-slate-300 pl-1">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">1</span>
                <span>
                  <strong>{lang === 'tl' ? 'Tingnan ang Products:' : 'Browse Products:'}</strong> {lang === 'tl' ? 'Pumili ng card (hal. NFC Smart Business Card) at pindutin ang "Order Now".' : 'Click "Order Now" on any card to automatically fill the order form.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">2</span>
                <span>
                  <strong>{lang === 'tl' ? 'Maglagay ng Order:' : 'Submit an Order:'}</strong> {lang === 'tl' ? 'Ilagay ang iyong pangalan at Philippine mobile number. I-submit upang ma-save.' : 'Enter your name and test phone number. Submit to see confetti and instant order code.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px]">3</span>
                <span>
                  <strong>{lang === 'tl' ? 'Buksan ang Admin Dashboard:' : 'Open Admin Dashboard:'}</strong> {lang === 'tl' ? 'Pumunta sa Admin tab sa ibaba para makita ang bagong pasok na order at i-update ang status (Hal. Shipped via J&T Express).' : 'Go to Admin tab in the bottom bar to view the new order and update its delivery status!'}
                </span>
              </li>
            </ol>
          </div>

          {/* Contact file feature */}
          <div className="rounded-xl bg-slate-900/90 p-3 text-xs text-slate-300 border border-slate-800">
            <span className="text-cyan-400 font-bold">📲 {lang === 'tl' ? 'Subukan ang "Save Contact" button:' : 'Try the "Save Contact" button:'} </span>
            {lang === 'tl'
              ? 'Pumunta sa "Digital Profile" page at pindutin ang "Save to Phone Contacts". Magdo-download ito ng totoong .vcf contact card na pwedeng i-save diretso sa contacts ng iyong phone!'
              : 'Head to the "Digital Profile" page and tap "Save to Phone Contacts". It generates a real .vcf file you can tap to import directly into your iPhone or Android address book!'}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-slate-800 pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:opacity-95"
          >
            {lang === 'tl' ? 'Naiintindihan ko na, Salamat!' : 'Got it, let me explore!'}
          </button>
        </div>
      </div>
    </div>
  );
};
