import React, { useState } from 'react';
import { 
  Wifi, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Star
} from 'lucide-react';
import { Product, FAQItem, RecentWork, ClientReview, Achievement } from '../types';
import { NfcTapSimulator } from '../components/NfcTapSimulator';
import { ProductCard } from '../components/ProductCard';
import { RecentWorkSection } from '../components/RecentWorkSection';
import { WhatClientsSaySection } from '../components/WhatClientsSaySection';
import { AchievementsSection } from '../components/AchievementsSection';

interface HomePageProps {
  products: Product[];
  faqs: FAQItem[];
  recentWorks: RecentWork[];
  reviews: ClientReview[];
  achievements: Achievement[];
  onReviewAdded: (review: ClientReview) => void;
  onNavigate: (page: string, params?: { productId?: string }) => void;
  lang: 'en' | 'tl';
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  faqs,
  recentWorks,
  reviews,
  achievements,
  onReviewAdded,
  onNavigate,
  lang
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-[380px] w-full max-w-4xl rounded-full bg-gradient-to-tr from-blue-700/20 via-cyan-500/15 to-transparent blur-3xl" />
        
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          
          {/* PH Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-blue-950/60 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300">
              🇵🇭 {lang === 'tl' ? 'Ang Smart Business Card ng Pilipinas' : 'Philippines\' #1 Smart NFC & Digital Business Card'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white font-heading sm:text-5xl lg:text-6xl sm:leading-tight">
            {lang === 'tl' ? (
              <>
                Isang Tap Lang, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Konektado Ka Na Agad.
                </span>
              </>
            ) : (
              <>
                Tap to Connect. Stand Out. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Grow Your Network in PH.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {lang === 'tl'
              ? 'Wala nang papel na calling card na natatapon o nawawala. I-tap lang ang ConnectCard sa smartphone para mai-save agad ang iyong cellphone number, email, Facebook, at Google reviews nang walang app download.'
              : 'Replace outdated paper cards with a sleek, reusable NFC smart card. Tap on any smartphone to share your contact details, social media, and Google reviews in one second with zero app download.'}
          </p>

          {/* Quick Section Jump Pills for Mobile Users */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => scrollToSection('recent-work')}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 hover:border-cyan-400 hover:text-white transition"
            >
              <Briefcase className="h-3 w-3 text-cyan-400" />
              <span>{lang === 'tl' ? 'Recent Work' : 'Recent Work'}</span>
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 hover:border-cyan-400 hover:text-white transition"
            >
              <Star className="h-3 w-3 text-amber-400 fill-amber-400/30" />
              <span>{lang === 'tl' ? 'What Clients Say' : 'What Clients Say'}</span>
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300 hover:border-cyan-400 hover:text-white transition"
            >
              <Award className="h-3 w-3 text-cyan-400" />
              <span>{lang === 'tl' ? 'Achievements' : 'Achievements'}</span>
            </button>
          </div>

          {/* Hero Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onNavigate('products')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 px-7 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-102 hover:shadow-cyan-400/35 active:scale-98"
            >
              <span>{lang === 'tl' ? 'Tingnan ang Mga Produkto (₱)' : 'Browse Products & Prices (₱)'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm hover:bg-slate-800 hover:text-white transition"
            >
              <Smartphone className="h-4 w-4 text-cyan-400" />
              <span>{lang === 'tl' ? 'Tingnan ang Sample Profile' : 'View Sample Digital Profile'}</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-6 border-t border-slate-800/80 text-left">
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-900/40 p-2.5 border border-slate-800/60">
              <Zap className="h-5 w-5 shrink-0 text-cyan-400" />
              <div className="text-xs">
                <p className="font-bold text-white">0 App Required</p>
                <p className="text-[10px] text-slate-400">Automatic pop-up</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-slate-900/40 p-2.5 border border-slate-800/60">
              <Smartphone className="h-5 w-5 shrink-0 text-cyan-400" />
              <div className="text-xs">
                <p className="font-bold text-white">iOS & Android</p>
                <p className="text-[10px] text-slate-400">All modern phones</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-slate-900/40 p-2.5 border border-slate-800/60">
              <ShieldCheck className="h-5 w-5 shrink-0 text-cyan-400" />
              <div className="text-xs">
                <p className="font-bold text-white">1-Time Payment</p>
                <p className="text-[10px] text-slate-400">Walang monthly fee</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-slate-900/40 p-2.5 border border-slate-800/60">
              <Award className="h-5 w-5 shrink-0 text-cyan-400" />
              <div className="text-xs">
                <p className="font-bold text-white">Nationwide PH</p>
                <p className="text-[10px] text-slate-400">J&T & LBC Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <NfcTapSimulator 
          onOpenProfile={() => onNavigate('profile')} 
          lang={lang} 
        />
      </section>

      {/* NEW FEATURE: ACHIEVEMENTS & MILESTONES */}
      <section id="achievements" className="mx-auto max-w-5xl px-4 sm:px-6 scroll-mt-24">
        <AchievementsSection 
          achievements={achievements} 
          lang={lang} 
        />
      </section>

      {/* Comparison: Traditional Paper Cards vs ConnectCard PH */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {lang === 'tl' ? 'Bakit Panalo ang NFC?' : 'The Smart Upgrade'}
          </span>
          <h2 className="text-2xl font-bold text-white font-heading mt-1 sm:text-3xl">
            {lang === 'tl' ? 'Paper Calling Cards vs ConnectCard PH' : 'Traditional Paper Cards vs ConnectCard PH'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Paper Cards Disadvantages */}
          <div className="rounded-2xl border border-red-900/30 bg-red-950/10 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-900/40 text-xs">✕</span>
              <span>{lang === 'tl' ? 'Lumang Papel na Calling Card' : 'Old Paper Business Cards'}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span>88% ng papel na calling card ay itinatapon sa basurahan sa loob ng isang linggo sa PH.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span>Kapag nagbago ang contact number o address mo, itatapon mo lahat at magpapa-print ulit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span>Mano-manong ita-type pa ng client ang mahabang number mo sa cellphone nila.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span>Hindi nakakapag-direct link sa iyong GCash, Facebook, o Google Reviews.</span>
              </li>
            </ul>
          </div>

          {/* ConnectCard PH Advantages */}
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-blue-950/30 to-[#0c1630] p-5 sm:p-6 shadow-lg shadow-cyan-500/5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs">✓</span>
              <span>{lang === 'tl' ? 'ConnectCard PH Smart NFC' : 'ConnectCard PH Smart Solution'}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>Isang card lang para sa buong buhay. Matibay, waterproof, at hindi naluluma.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>I-edit ang iyong details online anumang oras nang libre. Walang bagong print.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>One-tap &quot;Save to Contacts&quot; button para sa mabilisang koneksyon sa phone ng kliyente.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>Tumatanggap ng GCash, Maya QR, social media, at instant Google Reviews links.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {lang === 'tl' ? 'Paboritong Produkto' : 'Featured Catalog'}
            </span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1 sm:text-3xl">
              {lang === 'tl' ? 'Mga Produkto sa Philippine Pesos (₱)' : 'Choose Your Smart NFC Card'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <span>{lang === 'tl' ? 'Tingnan Lahat' : 'View All Products'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(pId) => onNavigate('order', { productId: pId })}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* NEW FEATURE: RECENT WORK SHOWCASE */}
      <section id="recent-work" className="mx-auto max-w-5xl px-4 sm:px-6 scroll-mt-24">
        <RecentWorkSection
          works={recentWorks}
          onOrderProduct={() => onNavigate('order')}
          lang={lang}
        />
      </section>

      {/* How it Works in 3 Steps */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-blue-900/60 bg-gradient-to-b from-[#0e1a38] to-[#070d1e] p-6 sm:p-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {lang === 'tl' ? 'Mabilis at Madali' : 'Simple Setup'}
          </span>
          <h2 className="text-2xl font-bold text-white font-heading mt-1 sm:text-3xl">
            {lang === 'tl' ? 'Paano Simulan sa 3 Hakbang' : 'How It Works in 3 Steps'}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-3 text-left">
            <div className="relative rounded-2xl bg-slate-900/70 p-5 border border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 font-black text-sm font-heading">
                1
              </span>
              <h3 className="mt-4 text-base font-bold text-white font-heading">
                {lang === 'tl' ? 'Pumili at Mag-Order' : 'Order Your Card'}
              </h3>
              <p className="mt-1.5 text-xs text-slate-300">
                {lang === 'tl'
                  ? 'Piliin ang iyong paboritong finish (Matte Black o Acrylic). May Cash on Delivery (COD) o GCash.'
                  : 'Choose your card style and enter your details. We ship fast nationwide across Luzon, Visayas, & Mindanao.'}
              </p>
            </div>

            <div className="relative rounded-2xl bg-slate-900/70 p-5 border border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 font-black text-sm font-heading">
                2
              </span>
              <h3 className="mt-4 text-base font-bold text-white font-heading">
                {lang === 'tl' ? 'I-set ang Iyong Profile' : 'Set Up Your Profile'}
              </h3>
              <p className="mt-1.5 text-xs text-slate-300">
                {lang === 'tl'
                  ? 'Ilagay ang iyong pangalan, larawan, numero, email, Facebook, Viber, at mga serbisyo online.'
                  : 'Add your name, photo, phone, social media accounts, and company details without technical code.'}
              </p>
            </div>

            <div className="relative rounded-2xl bg-slate-900/70 p-5 border border-slate-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 font-black text-sm font-heading">
                3
              </span>
              <h3 className="mt-4 text-base font-bold text-white font-heading">
                {lang === 'tl' ? 'I-tap sa Kliyente' : 'Tap & Connect'}
              </h3>
              <p className="mt-1.5 text-xs text-slate-300">
                {lang === 'tl'
                  ? 'Idikit lang sa likod ng smartphone ng client. Awtomatikong lalabas ang iyong digital profile at contacts!'
                  : 'Hold your card near their smartphone. Your profile pops up instantly on their screen ready to save!'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURE: WHAT CLIENTS SAY */}
      <section id="reviews" className="mx-auto max-w-5xl px-4 sm:px-6 scroll-mt-24">
        <WhatClientsSaySection
          reviews={reviews}
          onReviewAdded={onReviewAdded}
          lang={lang}
        />
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {lang === 'tl' ? 'Mga Madalas Itanong' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl font-bold text-white font-heading mt-1 sm:text-3xl">
            {lang === 'tl' ? 'Sagot sa Iyong mga Katanungan' : 'Got Questions? We Got Answers.'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1630] transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-white hover:text-cyan-300 transition"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-cyan-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-slate-800/80 p-4 sm:p-5 pt-3 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {faq.filipinoAnswer && lang === 'tl' && (
                      <p className="mt-2 text-cyan-300/90 font-medium">
                        💡 {faq.filipinoAnswer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Philippine Contact & Support Footer Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-blue-950 via-[#0a1228] to-slate-950 p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {lang === 'tl' ? 'Makipag-ugnayan sa Amin' : 'Philippine Customer Support'}
              </span>
              <h2 className="text-2xl font-bold text-white font-heading mt-1 sm:text-3xl">
                ConnectCard PH HQ
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                {lang === 'tl'
                  ? 'May tanong tungkol sa bulk orders o custom logo printing? Nandito ang aming friendly support team para tulungan ka.'
                  : 'Have questions about bulk team bundles or customized UV printing? Reach out to our local Manila team anytime.'}
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-cyan-400 border border-cyan-500/20">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">+63 (02) 8876-CARD / 0917-CONNECT-PH</p>
                    <p className="text-[10px] text-slate-400">Globe / Smart Hotlines (Mon-Sat 9AM-6PM)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-cyan-400 border border-cyan-500/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">support@connectcard.ph</p>
                    <p className="text-[10px] text-slate-400">Fast 2-hour email response</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-cyan-400 border border-cyan-500/20">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">High Street South, BGC, Taguig, Metro Manila</p>
                    <p className="text-[10px] text-slate-400">Main Fulfillment Center</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA box */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-5 text-center">
              <h3 className="text-base font-bold text-white font-heading">
                {lang === 'tl' ? 'Handa Ka Nang Mag-Upgrade?' : 'Ready to Get Your ConnectCard?'}
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                {lang === 'tl' ? 'Simulan sa halagang ₱499 lamang. One-time payment.' : 'Starting at just ₱499. No recurring monthly costs.'}
              </p>
              
              <button
                onClick={() => onNavigate('order')}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-sm font-bold text-slate-950 shadow-md hover:from-blue-500 hover:to-cyan-400 transition"
              >
                <span>{lang === 'tl' ? 'Pumunta sa Order Form' : 'Go to Order Form'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-2 text-[10px] text-slate-400">
                Free Nationwide J&T Shipping on orders over ₱1,500
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
