import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode as QrIcon, Download, Copy, Check, ExternalLink, Share2 } from 'lucide-react';

interface QrCodeSectionProps {
  url?: string;
  title?: string;
  subtitle?: string;
  lang: 'en' | 'tl';
}

export const QrCodeSection: React.FC<QrCodeSectionProps> = ({
  url = window.location.origin + '#profile',
  title,
  subtitle,
  lang
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [customInput, setCustomInput] = useState(url);

  useEffect(() => {
    setCustomInput(url);
  }, [url]);

  useEffect(() => {
    if (canvasRef.current && customInput) {
      QRCode.toCanvas(
        canvasRef.current,
        customInput,
        {
          width: 260,
          margin: 2,
          color: {
            dark: '#030712', // crisp dark
            light: '#ffffff' // clean white
          },
          errorCorrectionLevel: 'H'
        },
        (error) => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [customInput]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `ConnectCard_PH_QRCode.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <QrIcon className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              {title || (lang === 'tl' ? 'Dynamic QR Code Generator' : 'Digital Profile QR Code')}
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            {subtitle || (lang === 'tl' 
              ? 'I-scan gamit ang cellphone camera kung walang NFC ang kausap mo.' 
              : 'Scan with any smartphone camera if client phone does not have NFC.')}
          </p>
        </div>
        <span className="rounded-full bg-cyan-500/20 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 border border-cyan-500/30">
          Universal Fallback
        </span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6">
        {/* QR Code Canvas Frame */}
        <div className="relative rounded-2xl bg-white p-4 shadow-2xl ring-4 ring-cyan-500/20">
          <canvas ref={canvasRef} className="mx-auto rounded-lg max-w-[220px] sm:max-w-[260px]" />
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-900 uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <span>ConnectCard.ph</span>
          </div>
        </div>

        {/* Controls & Share */}
        <div className="flex-1 w-full max-w-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'tl' ? 'Profile o Website Link:' : 'Target URL / Digital Profile:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                placeholder="https://connectcard.ph/your-name"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? (lang === 'tl' ? 'Na-kopya!' : 'Copied!') : (lang === 'tl' ? 'Kopyahin' : 'Copy')}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-xs font-bold text-slate-950 shadow-md hover:from-blue-500 hover:to-cyan-400 transition"
            >
              <Download className="h-4 w-4" />
              <span>
                {downloadSuccess 
                  ? (lang === 'tl' ? 'Nai-save sa gallery!' : 'Saved to Gallery!') 
                  : (lang === 'tl' ? 'I-download ang QR Image (PNG)' : 'Download QR Image (PNG)')}
              </span>
            </button>

            <a
              href={customInput}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <ExternalLink className="h-4 w-4 text-cyan-400" />
              <span>{lang === 'tl' ? 'Subukan ang Link' : 'Test Link'}</span>
            </a>
          </div>

          {/* Quick tips */}
          <div className="rounded-xl bg-slate-900/60 p-3 text-[11px] text-slate-300 border border-slate-800 space-y-1">
            <p className="font-bold text-cyan-400">
              💡 {lang === 'tl' ? 'Tip para sa Cellphone:' : 'Mobile User Tip:'}
            </p>
            <p>
              {lang === 'tl'
                ? 'I-save ang QR code na ito bilang wallpaper o lockscreen ng iyong cellphone. Kahit walang NFC ang kausap mo sa networking event o coffee shop, ipa-scan mo lang ang phone mo!'
                : 'Save this QR code to your phone gallery or set as your lockscreen wallpaper. When networking, anyone can scan your screen using their camera app!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
