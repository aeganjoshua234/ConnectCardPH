import React, { useState } from 'react';
import { QrCodeSection } from '../components/QrCodeSection';
import { DigitalProfile } from '../types';
import { QrCode, Smartphone, Sparkles, Star, Download, Link2, Share2 } from 'lucide-react';

interface QrPageProps {
  profile: DigitalProfile;
  lang: 'en' | 'tl';
}

export const QrPage: React.FC<QrPageProps> = ({ profile, lang }) => {
  const [activePreset, setActivePreset] = useState<'profile' | 'vcard' | 'review'>('profile');

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}#profile/${profile.slug}`
    : `https://connectcard.ph/p/${profile.slug}`;

  const reviewUrl = 'https://g.page/r/sample-google-review-connectcard-ph/review';

  const vCardRaw = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.fullName}\nORG:${profile.company}\nTEL:${profile.phone}\nEMAIL:${profile.email}\nEND:VCARD`;

  const getActiveUrl = () => {
    if (activePreset === 'review') return reviewUrl;
    if (activePreset === 'vcard') return vCardRaw;
    return profileUrl;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 pb-20 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-blue-950/60 px-3 py-1 text-xs font-semibold text-cyan-300">
          <QrCode className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'tl' ? 'Scannable QR Codes' : 'Universal Scannable QR Codes'}</span>
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {lang === 'tl' ? 'QR Code para sa Iyong Profile at Negosyo' : 'QR Codes for Your Profile & Reviews'}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-300">
          {lang === 'tl'
            ? 'Kung sakaling walang NFC ang cellphone ng client mo, ipa-scan lang ang QR code gamit ang camera ng phone nila.'
            : 'Every ConnectCard product includes a high-contrast QR code as a universal fallback for any smartphone.'}
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-slate-800 bg-[#0c1630] p-1.5 gap-1">
          <button
            onClick={() => setActivePreset('profile')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activePreset === 'profile'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>{lang === 'tl' ? 'Digital Profile Link' : 'Digital Profile Link'}</span>
          </button>

          <button
            onClick={() => setActivePreset('review')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activePreset === 'review'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            <span>{lang === 'tl' ? 'Google Review QR' : 'Google 5-Star Review'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic QR Generator Section */}
      <QrCodeSection
        url={getActiveUrl()}
        title={
          activePreset === 'review'
            ? (lang === 'tl' ? 'Google 5-Star Review QR Code' : 'Google Reviews QR Code')
            : (lang === 'tl' ? `${profile.fullName}'s Profile QR Code` : `${profile.fullName}'s ConnectCard QR`)
        }
        subtitle={
          activePreset === 'review'
            ? (lang === 'tl' ? 'I-print sa cashier o counter para sa agarang 5-star Google review ng customers.' : 'Place this on cafe tables or counters to gather direct 5-star customer ratings.')
            : (lang === 'tl' ? 'Direktang magbubukas sa digital calling card profile.' : 'Directly launches the recipient into your dynamic digital business card.')
        }
        lang={lang}
      />

      {/* Mobile User Instructions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 space-y-2">
          <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-cyan-400" />
            <span>{lang === 'tl' ? 'Paano I-scan sa iPhone / Android:' : 'How Clients Scan Your QR Code:'}</span>
          </h4>
          <ol className="space-y-1.5 text-xs text-slate-300 list-decimal pl-4">
            <li>Buksan ang default Camera app ng smartphone.</li>
            <li>Itutok ang camera sa QR code na ito (walang kailangang pindutin).</li>
            <li>May lalabas na link sa screen—pindutin ito para magbukas ang contact card.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 space-y-2">
          <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>{lang === 'tl' ? 'Libre at Walang Expiration:' : 'Zero Expiration & Free Lifetime Hosting:'}</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'tl'
              ? 'Kahit kailan mo baguhin ang cellphone number, Facebook, o serbisyo mo, hindi magbabago ang QR code mo. Awtomatiko nitong ipapakita ang pinakabagong detalye.'
              : 'Your QR code stays forever valid even if you update your mobile number, title, or email address in your profile.'}
          </p>
        </div>
      </div>

    </div>
  );
};
