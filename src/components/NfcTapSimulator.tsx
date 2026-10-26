import React, { useState } from 'react';
import { Wifi, Smartphone, CheckCircle, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';

interface NfcTapSimulatorProps {
  onOpenProfile: () => void;
  lang: 'en' | 'tl';
}

export const NfcTapSimulator: React.FC<NfcTapSimulatorProps> = ({ onOpenProfile, lang }) => {
  const [isTapping, setIsTapping] = useState(false);
  const [hasTapped, setHasTapped] = useState(false);

  const handleSimulateTap = () => {
    setIsTapping(true);
    setHasTapped(false);
    
    // Simulate haptic vibration if supported on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([80, 50, 100]);
      } catch {
        // Ignore if denied
      }
    }

    setTimeout(() => {
      setIsTapping(false);
      setHasTapped(true);
    }, 900);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasTapped(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#0e1a38] to-[#070d1e] p-5 sm:p-7 shadow-2xl">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/40 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {lang === 'tl' ? 'Subukan ang NFC Tap Simulator' : 'Live Interactive NFC Demo'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-heading mt-0.5">
            {lang === 'tl' 
              ? 'Paano gumagana ang ConnectCard sa Phone mo?' 
              : 'See How NFC Instant Tap Works in Real Life'}
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          {lang === 'tl' ? 'Hindi kailangan ng app' : 'Zero app download required'}
        </div>
      </div>

      {/* Interactive Stage */}
      <div className="my-6 flex flex-col items-center justify-center">
        <div className="relative flex w-full max-w-sm flex-col items-center">
          
          {/* Virtual Phone Mockup */}
          <div className="relative w-64 rounded-3xl border-4 border-slate-700 bg-slate-950 p-3 shadow-2xl transition-all duration-300">
            {/* Phone Speaker & Notch */}
            <div className="mx-auto mb-2 h-3.5 w-20 rounded-full bg-slate-800 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-700 mr-2" />
              <div className="h-1 w-8 rounded-full bg-slate-700" />
            </div>

            {/* Phone Screen Area */}
            <div className="relative min-h-[190px] rounded-2xl bg-gradient-to-b from-slate-900 to-blue-950/70 p-3 flex flex-col justify-between overflow-hidden border border-slate-800">
              {/* Status bar */}
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>9:41</span>
                <span className="text-cyan-400 font-semibold">5G • PH</span>
              </div>

              {/* NFC Sensor Zone */}
              <div className="relative my-auto flex flex-col items-center justify-center py-2">
                {isTapping && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full border-2 border-cyan-400/80 animate-ping" />
                    <div className="h-16 w-16 rounded-full border border-blue-400/60 animate-ping delay-100" />
                  </div>
                )}

                {!hasTapped ? (
                  <div className="text-center z-10 space-y-1">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-cyan-400 border border-cyan-500/30">
                      <Wifi className="h-5 w-5 animate-pulse" />
                    </div>
                    <p className="text-[11px] font-medium text-slate-300">
                      {lang === 'tl' ? 'Handa para sa Tap' : 'Ready for NFC Card Tap'}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      Top of smartphone (iPhone / Android)
                    </p>
                  </div>
                ) : (
                  /* Notification banner received */
                  <div className="z-10 w-full animate-in zoom-in-95 duration-200 rounded-xl border border-cyan-400/60 bg-blue-900/90 p-2.5 shadow-xl text-left">
                    <div className="flex items-start gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-bold text-xs">
                        CC
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                            NFC Tag Detected
                          </span>
                          <span className="text-[9px] text-slate-400">now</span>
                        </div>
                        <p className="text-xs font-semibold text-white truncate">
                          Maria Santos, REB
                        </p>
                        <p className="text-[10px] text-slate-300 truncate">
                          Metro Manila Prime Living • Tap to view
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onOpenProfile}
                      className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg bg-cyan-400 py-1.5 text-xs font-bold text-slate-950 shadow hover:bg-cyan-300 transition"
                    >
                      <span>{lang === 'tl' ? 'Buksan ang Digital Profile' : 'Open Digital Card'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom home bar indicator */}
              <div className="mx-auto h-1 w-16 rounded-full bg-slate-600" />
            </div>
          </div>

          {/* Virtual Card Graphic */}
          <div 
            onClick={handleSimulateTap}
            className={`cursor-pointer transition-all duration-500 ease-out mt-3 sm:mt-0 sm:absolute sm:-right-8 sm:top-12 z-20 w-52 sm:w-56 rounded-xl border border-cyan-400/40 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 p-3.5 shadow-2xl backdrop-blur-md transform ${
              isTapping ? 'translate-y-[-60px] sm:translate-x-[-70px] scale-105 border-cyan-300 shadow-cyan-500/50' : 'hover:scale-102 hover:border-cyan-400'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-cyan-400" />
                <span className="text-[11px] font-black tracking-wide text-white font-heading">ConnectCard</span>
              </div>
              <Wifi className="h-4 w-4 text-cyan-400 rotate-90" />
            </div>

            {/* Smart Chip graphic */}
            <div className="mb-4 h-6 w-8 rounded border border-amber-300/60 bg-gradient-to-r from-amber-400/40 via-yellow-200/50 to-amber-500/40 flex items-center justify-center">
              <div className="h-3 w-4 border-t border-b border-amber-300/40" />
            </div>

            {/* Card Name */}
            <div className="space-y-0.5">
              <p className="text-[9px] uppercase tracking-wider text-slate-400">SMART NFC CARD</p>
              <p className="text-xs font-bold text-white tracking-wide">MARIA SANTOS</p>
              <p className="text-[9px] text-cyan-300">NTAG216 • TAP TO CONNECT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={handleSimulateTap}
          disabled={isTapping}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-102 active:scale-98 disabled:opacity-70"
        >
          <Sparkles className="h-4 w-4 text-slate-950" />
          <span>
            {isTapping 
              ? (lang === 'tl' ? 'Tinata-tap ang card...' : 'Tapping Card...') 
              : (lang === 'tl' ? 'Pindutin para i-tap ang Card sa Phone' : 'Tap Card on Smartphone')}
          </span>
        </button>

        {hasTapped && (
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{lang === 'tl' ? 'Ulitin ang Test' : 'Reset Tap Test'}</span>
          </button>
        )}
      </div>

      {/* Beginner Explanation */}
      <div className="mt-4 rounded-xl bg-blue-950/40 border border-blue-900/50 p-3 text-center sm:text-left text-xs text-slate-300">
        <span className="font-bold text-cyan-400">💡 {lang === 'tl' ? 'Paliwanag:' : 'How it works in real life:'} </span>
        {lang === 'tl' 
          ? 'Sa totoong buhay, hawak mo lang ang physical card at ididikit mo ito sa likod ng smartphone ng client mo. Wala nang kailangang i-type na number o pangalan!' 
          : 'In real life, simply hold your physical ConnectCard against the top of your client’s phone. It instantly triggers your digital profile with zero typing!'}
      </div>
    </div>
  );
};
