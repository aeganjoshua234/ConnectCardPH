import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ClientReview } from '../types';
import { saveReview } from '../utils/storage';
import { 
  Star, 
  MessageSquare, 
  BadgeCheck, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  X,
  MapPin,
  Heart
} from 'lucide-react';

interface WhatClientsSaySectionProps {
  reviews: ClientReview[];
  onReviewAdded: (newReview: ClientReview) => void;
  lang: 'en' | 'tl';
}

export const WhatClientsSaySection: React.FC<WhatClientsSaySectionProps> = ({
  reviews,
  onReviewAdded,
  lang
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Form fields for submitting a new client review
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('');
  const [reviewerCompany, setReviewerCompany] = useState('');
  const [reviewerLocation, setReviewerLocation] = useState('Metro Manila');
  const [reviewerProduct, setReviewerProduct] = useState('NFC Smart Business Card');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');

  const filteredReviews = filterRating 
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  // Average rating
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(2);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev: ClientReview = {
      id: `rev-${Date.now()}`,
      name: reviewerName,
      role: reviewerRole || 'Professional',
      company: reviewerCompany || 'Independent',
      location: reviewerLocation,
      rating: reviewerRating,
      date: 'Just now',
      comment: reviewerComment,
      verified: true,
      productUsed: reviewerProduct,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (reviews.length % 5)}?auto=format&fit=crop&w=150&q=80`
    };

    saveReview(newRev);
    onReviewAdded(newRev);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    setShowAddModal(false);
    setReviewerName('');
    setReviewerComment('');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-blue-950/60 px-3 py-1 text-xs font-semibold text-cyan-300">
            <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
            <span>{lang === 'tl' ? 'Karanasan ng mga Kliyente' : 'What Clients Say'}</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {lang === 'tl' ? 'Patotoo ng mga Propesyonal sa Pilipinas' : 'Real Customer Reviews & Feedback'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
            {lang === 'tl'
              ? 'Basahin ang kwento ng mga real estate brokers, cafe owners, at freelancers kung paano binago ng ConnectCard ang kanilang araw-araw na pakikipag-ugnayan.'
              : 'Read verified testimonials from Filipino brokers, enterprise directors, and small business owners across Luzon, Visayas, and Mindanao.'}
          </p>
        </div>

        {/* Action Button & Overall Score */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-slate-800 bg-[#0c1630] px-4 py-2 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <Star className="h-4 w-4 fill-amber-400" />
              <span className="text-base font-black text-white font-heading">{avgRating}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <p className="text-[10px] text-slate-400">{reviews.length} Verified Reviews</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow hover:opacity-90 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{lang === 'tl' ? 'Mag-iwan ng Review' : 'Write a Review'}</span>
          </button>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0c1630] p-5 transition hover:border-cyan-500/40 hover:shadow-xl"
          >
            <div className="space-y-3">
              {/* Top rating and verified badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/20">
                    <BadgeCheck className="h-3 w-3 text-cyan-400" />
                    <span>Verified Buyer PH</span>
                  </span>
                )}
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {rev.filipinoComment && lang === 'tl' && (
                <p className="text-[11px] text-cyan-300/90 font-medium">
                  🇵🇭 &ldquo;{rev.filipinoComment}&rdquo;
                </p>
              )}
            </div>

            {/* Reviewer info footer */}
            <div className="mt-5 border-t border-slate-800/80 pt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-9 w-9 rounded-full object-cover border border-cyan-500/30"
                  onError={(e) => {
                    // Fallback avatar
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{rev.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {rev.role} • {rev.company}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[9px] text-cyan-400 block bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  {rev.productUsed.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-500 block mt-0.5">{rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-[#0c1630] p-6 shadow-2xl text-slate-100 space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 rounded-xl border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-heading">
                  {lang === 'tl' ? 'Mag-iwan ng Iyong Review' : 'Share Your Experience'}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'tl'
                  ? 'Ang iyong feedback ay tunay na mai-save sa browser memory (localStorage) at lalabas agad sa page!'
                  : 'Your review genuinely saves to browser storage and appears right away!'}
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'Buong Pangalan' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Hal. Engr. Mark Santos"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'tl' ? 'Propesyon' : 'Role'}
                  </label>
                  <input
                    type="text"
                    value={reviewerRole}
                    onChange={(e) => setReviewerRole(e.target.value)}
                    placeholder="Hal. Real Estate Agent"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'tl' ? 'Lungsod / PH' : 'City in PH'}
                  </label>
                  <input
                    type="text"
                    value={reviewerLocation}
                    onChange={(e) => setReviewerLocation(e.target.value)}
                    placeholder="BGC / Cebu / Davao"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'Produktong Ginamit' : 'Product Used'}
                </label>
                <select
                  value={reviewerProduct}
                  onChange={(e) => setReviewerProduct(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                >
                  <option value="NFC Smart Business Card">NFC Smart Business Card</option>
                  <option value="Digital Business Profile">Digital Business Profile</option>
                  <option value="NFC Google Review Card & Stand">NFC Google Review Card & Stand</option>
                  <option value="Custom NFC Card Bundle">Custom NFC Card Bundle</option>
                  <option value="NFC Smart Phone Tag / Keychain">NFC Smart Phone Tag / Keychain</option>
                </select>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'Ilang Bituin (Rating):' : 'Star Rating:'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= reviewerRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-amber-400 text-xs">
                    {reviewerRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'Ang Iyong Feedback o Karanasan' : 'Your Review & Feedback'} *
                </label>
                <textarea
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  rows={3}
                  placeholder={lang === 'tl' ? 'Ibahagi kung paano nakatulong ang ConnectCard sa trabaho mo...' : 'Describe how ConnectCard helped your networking...'}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 shadow"
                >
                  {lang === 'tl' ? 'I-post ang Review' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
