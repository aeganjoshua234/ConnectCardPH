import React, { useState, useEffect, useRef } from 'react';
import { DigitalProfile } from '../types';
import { downloadVCard } from '../utils/vcard';
import { saveProfile } from '../utils/storage';
import { QrCodeSection } from '../components/QrCodeSection';
import { 
  Download, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Edit3, 
  Check, 
  QrCode, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  Copy,
  BadgeCheck,
  X,
  Briefcase,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Trash2,
  PlusCircle,
  Share2,
  Camera,
  Upload,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

interface ProfilePageProps {
  profile: DigitalProfile;
  onUpdateProfile: (updated: DigitalProfile) => void;
  lang: 'en' | 'tl';
}

const PRESET_AVATARS = [
  { 
    id: 'tech-dev',
    label: 'IT Consultant & Developer', 
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    id: 'male-exec',
    label: 'Modern Tech Executive', 
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    id: 'creative-dev',
    label: 'Full Stack Engineer', 
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    id: 'female-broker',
    label: 'Executive Consultant', 
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    id: 'creative-dir',
    label: 'Creative Director', 
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80' 
  },
  { 
    id: 'advisor-exec',
    label: 'Strategic Advisor', 
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80' 
  }
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  onUpdateProfile,
  lang
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hidden file input ref for device photo upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Custom photo URL state inside photo modal
  const [tempPhotoUrl, setTempPhotoUrl] = useState(profile.avatarUrl || '');

  // Carousel states
  const [workSlide, setWorkSlide] = useState(0);
  const [reviewSlide, setReviewSlide] = useState(0);

  // Modal editor states
  const [editTab, setEditTab] = useState<'info' | 'work' | 'reviews' | 'achievements'>('info');
  const [formData, setFormData] = useState<DigitalProfile>(profile);

  // Add item form states
  const [newWorkTitle, setNewWorkTitle] = useState('');
  const [newWorkCategory, setNewWorkCategory] = useState('');
  const [newWorkResult, setNewWorkResult] = useState('');
  const [newWorkDesc, setNewWorkDesc] = useState('');
  const [newWorkImage, setNewWorkImage] = useState('');

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('');
  const [newReviewCompany, setNewReviewCompany] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchYear, setNewAchYear] = useState('');
  const [newAchOrg, setNewAchOrg] = useState('');
  const [newAchMetric, setNewAchMetric] = useState('');

  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.origin}#profile/${profile.slug}`
    : `https://connectcard.ph/p/${profile.slug}`;

  const recentWorks = profile.recentWork || [];
  const clientReviews = profile.clientReviews || [];
  const achievements = profile.achievements || [];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSaveContact = () => {
    downloadVCard(profile);
    showToast(lang === 'tl' ? 'Nai-download ang contact card. Buksan upang mai-save sa contacts.' : 'Contact card downloaded. Open it to save to contacts.');
  };

  const handleCopyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopiedLink(true);
      showToast(lang === 'tl' ? 'Profile link nakopya!' : 'Profile link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyGCash = async () => {
    if (!profile.gcashNumber) return;
    try {
      await navigator.clipboard.writeText(profile.gcashNumber);
      showToast(`GCash number (${profile.gcashNumber}) copied!`);
    } catch {
      // Fallback
    }
  };

  // Upload photo handler from device (Phone gallery, camera, computer)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(lang === 'tl' ? 'Masyadong malaki ang larawan. Piliin ang larawan na mas maliit sa 5MB.' : 'File too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const resultUrl = uploadEvent.target?.result as string;
      if (resultUrl) {
        const updated = { ...profile, avatarUrl: resultUrl };
        saveProfile(updated);
        onUpdateProfile(updated);
        setFormData(prev => ({ ...prev, avatarUrl: resultUrl }));
        setTempPhotoUrl(resultUrl);
        setShowPhotoModal(false);
        showToast(lang === 'tl' ? 'Na-update ang iyong profile picture!' : 'Profile picture updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetAvatar = (url: string) => {
    const updated = { ...profile, avatarUrl: url };
    saveProfile(updated);
    onUpdateProfile(updated);
    setFormData(prev => ({ ...prev, avatarUrl: url }));
    setTempPhotoUrl(url);
    setShowPhotoModal(false);
    showToast(lang === 'tl' ? 'Na-update ang iyong profile picture!' : 'Profile picture updated!');
  };

  const handleSaveCustomPhotoUrl = () => {
    if (!tempPhotoUrl.trim()) return;
    const updated = { ...profile, avatarUrl: tempPhotoUrl.trim() };
    saveProfile(updated);
    onUpdateProfile(updated);
    setFormData(prev => ({ ...prev, avatarUrl: tempPhotoUrl.trim() }));
    setShowPhotoModal(false);
    showToast(lang === 'tl' ? 'Na-update ang iyong profile picture!' : 'Profile picture updated!');
  };

  // Carousel controls for Recent Work
  const nextWork = () => {
    if (recentWorks.length === 0) return;
    setWorkSlide((prev) => (prev + 1) % recentWorks.length);
  };

  const prevWork = () => {
    if (recentWorks.length === 0) return;
    setWorkSlide((prev) => (prev - 1 + recentWorks.length) % recentWorks.length);
  };

  // Carousel controls for What Clients Say
  const nextReview = () => {
    if (clientReviews.length === 0) return;
    setReviewSlide((prev) => (prev + 1) % clientReviews.length);
  };

  const prevReview = () => {
    if (clientReviews.length === 0) return;
    setReviewSlide((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);
  };

  // Auto advance testimonial carousel
  useEffect(() => {
    if (clientReviews.length <= 1) return;
    const interval = setInterval(() => {
      setReviewSlide((prev) => (prev + 1) % clientReviews.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [clientReviews.length]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(formData);
    onUpdateProfile(formData);
    setIsEditing(false);
    showToast(lang === 'tl' ? 'Nai-save ang mga pagbabago!' : 'Profile changes saved!');
  };

  const handleAddRecentWork = () => {
    if (!newWorkTitle.trim()) return;
    const item = {
      id: `pw-${Date.now()}`,
      title: newWorkTitle,
      category: newWorkCategory || 'Web app',
      description: newWorkDesc,
      result: newWorkResult || undefined,
      image: newWorkImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    };
    setFormData({
      ...formData,
      recentWork: [item, ...(formData.recentWork || [])]
    });
    setNewWorkTitle('');
    setNewWorkCategory('');
    setNewWorkResult('');
    setNewWorkDesc('');
    setNewWorkImage('');
  };

  const handleRemoveRecentWork = (id: string) => {
    setFormData({
      ...formData,
      recentWork: (formData.recentWork || []).filter(w => w.id !== id)
    });
  };

  const handleAddReview = () => {
    if (!newReviewName.trim() || !newReviewComment.trim()) return;
    const rev = {
      id: `pr-${Date.now()}`,
      name: newReviewName,
      role: newReviewRole || 'Client',
      company: newReviewCompany || 'Verified Partner',
      comment: newReviewComment,
      rating: 5,
      date: 'Recent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    };
    setFormData({
      ...formData,
      clientReviews: [rev, ...(formData.clientReviews || [])]
    });
    setNewReviewName('');
    setNewReviewRole('');
    setNewReviewCompany('');
    setNewReviewComment('');
  };

  const handleRemoveReview = (id: string) => {
    setFormData({
      ...formData,
      clientReviews: (formData.clientReviews || []).filter(r => r.id !== id)
    });
  };

  const handleAddAchievement = () => {
    if (!newAchTitle.trim()) return;
    const ach = {
      id: `pa-${Date.now()}`,
      title: newAchTitle,
      year: newAchYear || '2026',
      organization: newAchOrg || 'Professional Board',
      metric: newAchMetric || undefined
    };
    setFormData({
      ...formData,
      achievements: [ach, ...(formData.achievements || [])]
    });
    setNewAchTitle('');
    setNewAchYear('');
    setNewAchOrg('');
    setNewAchMetric('');
  };

  const handleRemoveAchievement = (id: string) => {
    setFormData({
      ...formData,
      achievements: (formData.achievements || []).filter(a => a.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-[#101113] text-[#f7f5f0] font-sans antialiased selection:bg-[#d6b77a] selection:text-[#171512] pb-16">
      
      {/* Background radial gold glow effect */}
      <div 
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% -12%, rgba(214,183,122,.16), transparent 45%), #101113'
        }}
      />

      {/* Hidden File Input for Device Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Main Single-Column Wrap (width: min(100% - 28px, 520px)) */}
      <div className="w-[min(100%-28px,520px)] mx-auto py-6 sm:py-9 space-y-6">

        {/* Top Floating Control Bar (QR, Copy, Edit, Photo) */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#191a1d]/90 px-3.5 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-xs text-[#aaa9a5]">
            <span className="flex h-2 w-2 rounded-full bg-[#d6b77a] animate-pulse" />
            <span className="font-semibold text-white tracking-wide">ConnectCard.ph</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowPhotoModal(true)}
              className="flex items-center gap-1 rounded-xl border border-[#d6b77a]/40 bg-[#d6b77a]/10 px-2.5 py-1.5 text-xs font-semibold text-[#d6b77a] hover:bg-[#d6b77a]/20 transition"
              title="Change Profile Picture"
            >
              <Camera className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Change Photo</span>
            </button>

            <button
              onClick={() => setShowQrModal(!showQrModal)}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-[#f7f5f0] hover:bg-white/10 transition"
              title="Show QR Code"
            >
              <QrCode className="h-3.5 w-3.5 text-[#d6b77a]" />
              <span className="hidden sm:inline">QR</span>
            </button>

            <button
              onClick={handleCopyProfileLink}
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-[#f7f5f0] hover:bg-white/10 transition"
              title="Copy Profile Link"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#d6b77a]" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => {
                setFormData(profile);
                setIsEditing(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#d6b77a] px-3 py-1.5 text-xs font-bold text-[#171512] hover:opacity-90 transition shadow"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Customize</span>
            </button>
          </div>
        </div>

        {/* QR Code Section (Toggled) */}
        {showQrModal && (
          <div className="animate-in fade-in duration-200">
            <QrCodeSection
              url={profileUrl}
              title={`${profile.fullName}'s QR Code`}
              subtitle={lang === 'tl' ? 'Ipa-scan sa smartphone camera upang buksan agad ang digital card.' : 'Scan with phone camera to open this digital business card.'}
              lang={lang}
            />
          </div>
        )}

        {/* Topline Header */}
        <header className="flex items-center justify-between gap-3 pt-2">
          <div className="text-[0.76rem] font-extrabold tracking-[0.19em] text-[#d6b77a] uppercase font-mono">
            {profile.company || 'IT CONSULTANT'}
          </div>
          <div className="text-[0.7rem] font-bold text-[#aaa9a5] border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            NFC DIGITAL CARD
          </div>
        </header>

        {/* Hero Section Card */}
        <section className="text-center p-7 sm:p-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.065] to-white/[0.018] shadow-[0_24px_70px_rgba(0,0,0,0.35)] relative overflow-hidden">
          
          {/* Circular Avatar with Interactive Camera Change Button */}
          <div className="relative w-[104px] h-[104px] mx-auto mb-2 group">
            <button 
              onClick={() => setShowPhotoModal(true)}
              className="w-full h-full rounded-full overflow-hidden border-2 border-[#d6b77a]/90 shadow-2xl relative bg-gradient-to-br from-[#3b3427] to-[#191817] flex items-center justify-center cursor-pointer transition hover:scale-105 group-hover:border-[#d6b77a] ring-2 ring-[#d6b77a]/30"
              title="Click to change profile picture"
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
                />
              ) : (
                <span className="text-[#d6b77a] text-2xl font-bold tracking-wider uppercase">
                  {profile.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </span>
              )}

              {/* Hover / Active Overlay prompt */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-white text-[10px] font-bold">
                <Camera className="h-5 w-5 text-[#d6b77a] mb-0.5" />
                <span>Change</span>
              </div>
            </button>

            {/* Quick Camera Badge at bottom right of avatar */}
            <button
              onClick={() => setShowPhotoModal(true)}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#d6b77a] text-[#171512] shadow-lg border-2 border-[#101113] hover:scale-110 active:scale-95 transition"
              title="Change photo"
              aria-label="Change photo"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Direct Tap to Change Photo link */}
          <div className="mb-2">
            <button
              onClick={() => setShowPhotoModal(true)}
              className="inline-flex items-center gap-1 text-[11px] text-[#d6b77a] hover:underline font-semibold bg-[#d6b77a]/10 px-2.5 py-0.5 rounded-full border border-[#d6b77a]/25"
            >
              <Camera className="h-3 w-3" />
              <span>{lang === 'tl' ? 'Palitan ang litrato' : 'Change profile picture'}</span>
            </button>
          </div>

          {/* Eyebrow */}
          <div className="text-[#d6b77a] text-[0.69rem] tracking-[0.2em] font-extrabold uppercase mb-1">
            LET&apos;S CONNECT
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f7f5f0] font-heading my-1.5 leading-tight">
            {profile.fullName}
          </h1>

          {/* Role */}
          <p className="text-[#ddd8ce] text-[0.96rem] font-medium m-0">
            {profile.headline}
          </p>

          {/* Bio */}
          <p className="text-[#aaa9a5] text-[0.88rem] max-w-[380px] mx-auto mt-3.5 leading-relaxed">
            {profile.bio}
          </p>

          {/* Primary Action Buttons */}
          <div className="grid gap-2.5 mt-5">
            <button
              onClick={handleSaveContact}
              type="button"
              className="flex items-center justify-center gap-2.5 min-h-[52px] rounded-[15px] px-4 py-3 font-bold text-[0.92rem] bg-[#d6b77a] text-[#171512] border border-[#d6b77a] transition-transform active:scale-[0.985] hover:opacity-95 shadow-lg shadow-[#d6b77a]/15"
            >
              <span className="text-lg leading-none font-black">＋</span>
              <span>Save Contact</span>
            </button>

            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center justify-center gap-2 min-h-[46px] rounded-[15px] px-4 py-2.5 font-semibold text-[0.88rem] bg-white/[0.045] text-[#f7f5f0] border border-white/10 transition hover:bg-white/[0.08] active:scale-[0.985]"
              >
                <Phone className="h-4 w-4 text-[#d6b77a]" />
                <span>Call Directly</span>
              </a>
            )}
          </div>
        </section>

        {/* Section 1: Contact Information */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.76rem] tracking-[0.16em] uppercase text-[#aaa9a5] font-bold">
              Contact Information
            </h2>
          </div>

          <div className="grid gap-2.5">
            {/* Call */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3.5 p-3.5 rounded-[17px] border border-white/10 bg-[#191a1d] hover:bg-[#222327] transition group"
              >
                <div className="flex-none h-[42px] w-[42px] rounded-[13px] bg-[#d6b77a]/15 text-[#d6b77a] flex items-center justify-center font-bold text-lg">
                  ☎
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[0.92rem] text-[#f7f5f0] block group-hover:text-[#d6b77a] transition-colors">
                    Call me
                  </span>
                  <span className="text-[#aaa9a5] text-[0.78rem] truncate block font-mono">
                    {profile.phone}
                  </span>
                </div>
                <span className="text-[#aaa9a5] text-lg">↗</span>
              </a>
            )}

            {/* Email */}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-[17px] border border-white/10 bg-[#191a1d] hover:bg-[#222327] transition group"
              >
                <div className="flex-none h-[42px] w-[42px] rounded-[13px] bg-[#d6b77a]/15 text-[#d6b77a] flex items-center justify-center font-bold text-lg">
                  ✉
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[0.92rem] text-[#f7f5f0] block group-hover:text-[#d6b77a] transition-colors">
                    Email me
                  </span>
                  <span className="text-[#aaa9a5] text-[0.78rem] truncate block">
                    {profile.email}
                  </span>
                </div>
                <span className="text-[#aaa9a5] text-lg">↗</span>
              </a>
            )}

            {/* Website */}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-[17px] border border-white/10 bg-[#191a1d] hover:bg-[#222327] transition group"
              >
                <div className="flex-none h-[42px] w-[42px] rounded-[13px] bg-[#d6b77a]/15 text-[#d6b77a] flex items-center justify-center font-bold text-lg">
                  ↗
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[0.92rem] text-[#f7f5f0] block group-hover:text-[#d6b77a] transition-colors">
                    Visit my website
                  </span>
                  <span className="text-[#aaa9a5] text-[0.78rem] truncate block">
                    {profile.website.replace(/^https?:\/\//, '')}
                  </span>
                </div>
                <span className="text-[#aaa9a5] text-lg">↗</span>
              </a>
            )}

            {/* Google Maps / Location */}
            {profile.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-[17px] border border-white/10 bg-[#191a1d] hover:bg-[#222327] transition group"
              >
                <div className="flex-none h-[42px] w-[42px] rounded-[13px] bg-[#d6b77a]/15 text-[#d6b77a] flex items-center justify-center font-bold text-lg">
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[0.92rem] text-[#f7f5f0] block group-hover:text-[#d6b77a] transition-colors">
                    Find us on Google Maps
                  </span>
                  <span className="text-[#aaa9a5] text-[0.78rem] truncate block">
                    {profile.location}
                  </span>
                </div>
                <span className="text-[#aaa9a5] text-lg">↗</span>
              </a>
            )}

            {/* GCash Express Transfer (with 1-click copy) */}
            {profile.gcashNumber && (
              <div 
                onClick={handleCopyGCash}
                className="flex items-center gap-3.5 p-3.5 rounded-[17px] border border-[#d6b77a]/30 bg-[#191a1d] hover:bg-[#222327] transition cursor-pointer group"
              >
                <div className="flex-none h-[42px] w-[42px] rounded-[13px] bg-[#d6b77a]/15 text-[#d6b77a] flex items-center justify-center font-bold text-sm font-mono">
                  GC
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[0.92rem] text-[#f7f5f0] block group-hover:text-[#d6b77a] transition-colors">
                    GCash Express Transfer
                  </span>
                  <span className="text-[#d6b77a] text-[0.78rem] truncate block font-mono font-medium">
                    {profile.gcashNumber} • Tap to copy
                  </span>
                </div>
                <span className="text-[#aaa9a5] text-xs font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                  Copy
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Recent Work (Interactive Modern Carousel) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.76rem] tracking-[0.16em] uppercase text-[#aaa9a5] font-bold">
              Recent Work
            </h2>
            <div className="text-[0.7rem] text-[#d6b77a] font-semibold">
              {recentWorks.length} Projects
            </div>
          </div>

          {recentWorks.length === 0 ? (
            <div className="p-5 text-center text-xs text-[#aaa9a5] rounded-[18px] border border-white/10 bg-[#191a1d]">
              No projects added yet. Click &ldquo;Customize&rdquo; at the top to add your work!
            </div>
          ) : (
            <div className="rounded-[18px] border border-white/10 bg-[#191a1d] overflow-hidden">
              
              {/* Carousel Slide Card */}
              <div className="relative">
                {/* Screenshot Frame (16/10 aspect ratio) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#3b3427] to-[#14130f] p-3.5 flex items-end justify-start">
                  {recentWorks[workSlide].image && (
                    <img
                      src={recentWorks[workSlide].image}
                      alt={recentWorks[workSlide].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101113]/90 via-transparent to-black/30" />
                  
                  {/* Category Pill Tag */}
                  <span className="relative z-10 text-[0.7rem] font-bold text-[#f7f5f0] bg-[#101113]/75 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md">
                    {recentWorks[workSlide].category}
                  </span>

                  {recentWorks[workSlide].result && (
                    <span className="relative z-10 ml-auto text-[0.7rem] font-black text-[#171512] bg-[#d6b77a] px-2.5 py-0.5 rounded-full shadow">
                      {recentWorks[workSlide].result}
                    </span>
                  )}
                </div>

                {/* Caption / Content */}
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-[0.98rem] font-bold text-[#f7f5f0] font-heading m-0">
                    {recentWorks[workSlide].title}
                  </h3>
                  <p className="text-[#aaa9a5] text-[0.82rem] leading-relaxed m-0">
                    {recentWorks[workSlide].description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {['React', 'Node.js', 'PostgreSQL', 'Cloud IT'].map((tech, i) => (
                      <span
                        key={i}
                        className="text-[0.68rem] font-semibold text-[#d6b77a] bg-[#d6b77a]/10 border border-[#d6b77a]/20 px-2.5 py-0.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel UI: Dots & Navigation Buttons */}
              <div className="flex items-center justify-between px-4 pb-4 pt-1 border-t border-white/5">
                {/* Active Dots */}
                <div className="flex items-center gap-1.5">
                  {recentWorks.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setWorkSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        workSlide === idx ? 'w-6 bg-[#d6b77a]' : 'w-2 bg-white/20'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Nav arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevWork}
                    className="w-[38px] h-[38px] rounded-full border border-white/10 bg-white/[0.045] text-[#f7f5f0] flex items-center justify-center hover:bg-[#222327] transition"
                    aria-label="Previous project"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextWork}
                    className="w-[38px] h-[38px] rounded-full border border-white/10 bg-white/[0.045] text-[#f7f5f0] flex items-center justify-center hover:bg-[#222327] transition"
                    aria-label="Next project"
                  >
                    ›
                  </button>
                </div>
              </div>

            </div>
          )}
        </section>

        {/* Section 3: What Clients Say (Stats + Testimonial Carousel) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.76rem] tracking-[0.16em] uppercase text-[#aaa9a5] font-bold">
              What Clients Say
            </h2>
            <div className="text-[0.7rem] text-[#d6b77a] font-semibold">
              Verified Feedback
            </div>
          </div>

          {/* 3 Stats Counters Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="text-center p-3 sm:py-3.5 border border-white/10 rounded-[16px] bg-[#191a1d]">
              <b className="block text-[1.3rem] tracking-tight text-[#d6b77a] font-heading font-black">
                50+
              </b>
              <span className="text-[0.72rem] text-[#aaa9a5]">
                Projects delivered
              </span>
            </div>

            <div className="text-center p-3 sm:py-3.5 border border-white/10 rounded-[16px] bg-[#191a1d]">
              <b className="block text-[1.3rem] tracking-tight text-[#d6b77a] font-heading font-black">
                30+
              </b>
              <span className="text-[0.72rem] text-[#aaa9a5]">
                Happy clients
              </span>
            </div>

            <div className="text-center p-3 sm:py-3.5 border border-white/10 rounded-[16px] bg-[#191a1d]">
              <b className="block text-[1.3rem] tracking-tight text-[#d6b77a] font-heading font-black">
                5.0★
              </b>
              <span className="text-[0.72rem] text-[#aaa9a5]">
                Average rating
              </span>
            </div>
          </div>

          {/* Testimonial Quote Carousel */}
          {clientReviews.length > 0 && (
            <div className="p-5 rounded-[18px] border border-white/10 bg-[#191a1d] space-y-3">
              {/* Stars */}
              <div className="text-[#d6b77a] tracking-[0.15em] text-[0.85rem]">
                ★★★★★
              </div>

              {/* Quote Block */}
              <blockquote className="my-2.5 text-[0.92rem] text-[#e7e3da] italic leading-relaxed m-0">
                &ldquo;{clientReviews[reviewSlide].comment}&rdquo;
              </blockquote>

              {/* Reviewer Details */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex-none w-[38px] h-[38px] rounded-full bg-[#d6b77a]/15 text-[#d6b77a] font-extrabold text-[0.78rem] flex items-center justify-center border border-[#d6b77a]/30">
                    {clientReviews[reviewSlide].name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <strong className="block text-[0.85rem] text-[#f7f5f0]">
                      {clientReviews[reviewSlide].name}
                    </strong>
                    <span className="text-[0.75rem] text-[#aaa9a5]">
                      {clientReviews[reviewSlide].role}, {clientReviews[reviewSlide].company}
                    </span>
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {clientReviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReviewSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        reviewSlide === idx ? 'w-5 bg-[#d6b77a]' : 'w-2 bg-white/20'
                      }`}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 4: Achievements & Professional Accreditations */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.76rem] tracking-[0.16em] uppercase text-[#aaa9a5] font-bold">
              Achievements & Growth
            </h2>
          </div>

          <div className="grid gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-3.5 p-3.5 rounded-[17px] border border-white/10 bg-[#191a1d]"
              >
                <div className="flex-none h-[42px] w-[42px] rounded-[13px] bg-[#d6b77a]/15 text-[#d6b77a] flex items-center justify-center font-bold text-lg">
                  ★
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-[0.92rem] text-[#f7f5f0] truncate">
                      {ach.title}
                    </span>
                    {ach.metric && (
                      <span className="text-[0.72rem] font-bold text-[#d6b77a] bg-[#d6b77a]/10 border border-[#d6b77a]/20 px-2 py-0.5 rounded-full shrink-0">
                        {ach.metric}
                      </span>
                    )}
                  </div>
                  <span className="text-[#aaa9a5] text-[0.78rem] block">
                    {ach.organization} • {ach.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Find Me Online (Social Links) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.76rem] tracking-[0.16em] uppercase text-[#aaa9a5] font-bold">
              Find Me Online
            </h2>
          </div>

          <div className="grid gap-2.5">
            {/* Facebook */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 min-h-[58px] p-3 rounded-[16px] bg-[#191a1d] border border-white/10 hover:bg-[#222327] transition group"
            >
              <span className="flex-none w-[36px] h-[36px] rounded-[10px] bg-[#d6b77a]/15 text-[#d6b77a] font-extrabold flex items-center justify-center text-sm">
                f
              </span>
              <span className="flex-1 text-[0.88rem] font-bold text-[#f7f5f0] group-hover:text-[#d6b77a] transition-colors">
                Facebook
              </span>
              <span className="text-[#aaa9a5] text-base">↗</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 min-h-[58px] p-3 rounded-[16px] bg-[#191a1d] border border-white/10 hover:bg-[#222327] transition group"
            >
              <span className="flex-none w-[36px] h-[36px] rounded-[10px] bg-[#d6b77a]/15 text-[#d6b77a] font-extrabold flex items-center justify-center text-sm">
                ◎
              </span>
              <span className="flex-1 text-[0.88rem] font-bold text-[#f7f5f0] group-hover:text-[#d6b77a] transition-colors">
                Instagram
              </span>
              <span className="text-[#aaa9a5] text-base">↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 min-h-[58px] p-3 rounded-[16px] bg-[#191a1d] border border-white/10 hover:bg-[#222327] transition group"
            >
              <span className="flex-none w-[36px] h-[36px] rounded-[10px] bg-[#d6b77a]/15 text-[#d6b77a] font-extrabold flex items-center justify-center text-sm">
                in
              </span>
              <span className="flex-1 text-[0.88rem] font-bold text-[#f7f5f0] group-hover:text-[#d6b77a] transition-colors">
                LinkedIn
              </span>
              <span className="text-[#aaa9a5] text-base">↗</span>
            </a>
          </div>
        </section>

        {/* Section 6: About My Business */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[0.76rem] tracking-[0.16em] uppercase text-[#aaa9a5] font-bold">
              A Little About My Business
            </h2>
          </div>

          <div className="p-4 sm:p-5 border border-white/10 rounded-[18px] bg-white/[0.025] text-[#aaa9a5] text-[0.87rem] leading-relaxed">
            <strong className="text-[#f7f5f0] block mb-1">
              Personal service. Professional results.
            </strong>
            I help people and businesses build meaningful connections, discover opportunities, and grow with confidence through tailored technology solutions.
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 text-[#777873] text-[0.72rem] space-y-1">
          <p>Shared with one tap · Powered by ConnectCard PH</p>
          <p className="text-[0.68rem] text-white/30">NTAG216 Embedded Microchip & Dynamic Profile</p>
        </footer>

      </div>

      {/* Floating Bottom Toast Notification */}
      {toastMessage && (
        <div 
          className="fixed left-1/2 bottom-5 -translate-x-1/2 z-50 bg-[#f7f5f0] text-[#171512] px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-white/40 animate-in fade-in slide-in-from-bottom-3 duration-200"
          role="status"
        >
          {toastMessage}
        </div>
      )}

      {/* DEDICATED PHOTO EDIT MODAL */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-[#d6b77a]/50 bg-[#101113] p-6 shadow-2xl text-[#f7f5f0] space-y-5">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 rounded-xl border border-white/10 bg-[#191a1d] p-1.5 text-[#aaa9a5] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#d6b77a]" />
                <h3 className="text-lg font-bold text-white font-heading">
                  {lang === 'tl' ? 'Palitan ang Profile Picture' : 'Change Profile Picture'}
                </h3>
              </div>
              <p className="text-xs text-[#aaa9a5] mt-1">
                {lang === 'tl' 
                  ? 'Pumili mula sa iyong gallery/camera, mag-paste ng URL, o pumili mula sa mga preset.' 
                  : 'Upload your own photo from device, paste an image link, or pick a preset.'}
              </p>
            </div>

            {/* Current Active Preview */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#191a1d] border border-white/10">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d6b77a] shrink-0 bg-stone-900">
                <img
                  src={tempPhotoUrl || profile.avatarUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{profile.fullName}</p>
                <p className="text-[11px] text-[#d6b77a]">Current Active Avatar</p>
                <p className="text-[10px] text-[#aaa9a5] mt-0.5 truncate">
                  Changes save directly in browser storage
                </p>
              </div>
            </div>

            {/* Method 1: Upload from Device / Phone */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#d6b77a] uppercase tracking-wider">
                Option 1: Upload from Phone / Computer
              </label>
              
              <input
                type="file"
                ref={modalFileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => modalFileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d6b77a] to-[#c7a462] py-3 text-xs sm:text-sm font-bold text-[#171512] shadow-lg hover:opacity-95 transition"
              >
                <Upload className="h-4 w-4 text-[#171512]" />
                <span>{lang === 'tl' ? 'Pumili ng Larawan mula sa Telepono (Gallery / Camera)' : 'Choose Photo from Phone Gallery / Camera'}</span>
              </button>
            </div>

            {/* Method 2: Choose from Professional Presets */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-xs font-bold text-[#d6b77a] uppercase tracking-wider">
                Option 2: Pick a Ready Professional Avatar
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPresetAvatar(preset.url)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-white/10 bg-[#191a1d] hover:border-[#d6b77a] hover:bg-[#222327] transition group text-center"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 group-hover:border-[#d6b77a]">
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-[#aaa9a5] group-hover:text-white line-clamp-1">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Method 3: Paste an Image URL */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-xs font-bold text-[#d6b77a] uppercase tracking-wider">
                Option 3: Paste Custom Image URL
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://example.com/my-photo.jpg"
                  value={tempPhotoUrl}
                  onChange={(e) => setTempPhotoUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#191a1d] px-3 py-2 text-xs text-white placeholder-[#777873] focus:border-[#d6b77a] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveCustomPhotoUrl}
                  className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-xs font-bold text-white hover:bg-[#d6b77a] hover:text-[#171512] transition shrink-0"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="rounded-xl border border-white/10 bg-[#191a1d] px-4 py-2 text-xs font-semibold text-[#aaa9a5] hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-FEATURED PROFILE CUSTOMIZER MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#d6b77a]/40 bg-[#101113] p-6 shadow-2xl text-[#f7f5f0] space-y-4">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 rounded-xl border border-white/10 bg-[#191a1d] p-1.5 text-[#aaa9a5] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d6b77a]" />
                <h3 className="text-lg font-bold text-white font-heading">
                  {lang === 'tl' ? 'I-customize ang Iyong Profile' : 'Customize Digital Profile'}
                </h3>
              </div>
              <p className="text-xs text-[#aaa9a5]">
                Updates are saved directly to your phone browser&apos;s local storage!
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="grid grid-cols-4 gap-1.5 border-b border-white/10 pb-2">
              <button
                type="button"
                onClick={() => setEditTab('info')}
                className={`rounded-xl py-2 px-1 text-xs font-bold transition ${
                  editTab === 'info' ? 'bg-[#d6b77a] text-[#171512]' : 'bg-[#191a1d] text-[#aaa9a5]'
                }`}
              >
                1. Info
              </button>
              <button
                type="button"
                onClick={() => setEditTab('work')}
                className={`rounded-xl py-2 px-1 text-xs font-bold transition ${
                  editTab === 'work' ? 'bg-[#d6b77a] text-[#171512]' : 'bg-[#191a1d] text-[#aaa9a5]'
                }`}
              >
                2. Work
              </button>
              <button
                type="button"
                onClick={() => setEditTab('reviews')}
                className={`rounded-xl py-2 px-1 text-xs font-bold transition ${
                  editTab === 'reviews' ? 'bg-[#d6b77a] text-[#171512]' : 'bg-[#191a1d] text-[#aaa9a5]'
                }`}
              >
                3. Reviews
              </button>
              <button
                type="button"
                onClick={() => setEditTab('achievements')}
                className={`rounded-xl py-2 px-1 text-xs font-bold transition ${
                  editTab === 'achievements' ? 'bg-[#d6b77a] text-[#171512]' : 'bg-[#191a1d] text-[#aaa9a5]'
                }`}
              >
                4. Awards
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Info tab */}
              {editTab === 'info' && (
                <div className="space-y-3 animate-in fade-in">
                  
                  {/* Photo Edit in Tab 1 */}
                  <div className="p-3 rounded-2xl border border-[#d6b77a]/30 bg-[#191a1d] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d6b77a] bg-stone-900 shrink-0">
                        <img
                          src={formData.avatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Profile Photo</p>
                        <p className="text-[10px] text-[#aaa9a5]">Upload from device or change</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setShowPhotoModal(true);
                      }}
                      className="rounded-xl bg-[#d6b77a] px-3 py-1.5 text-xs font-bold text-[#171512] flex items-center gap-1"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      <span>Change Photo</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Headline / Title</label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Company / Brand</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Website URL</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aaa9a5] mb-1">Bio Statement</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#aaa9a5] mb-1">GCash Number</label>
                    <input
                      type="text"
                      value={formData.gcashNumber || ''}
                      onChange={(e) => setFormData({ ...formData, gcashNumber: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#191a1d] px-3 py-2 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Work tab */}
              {editTab === 'work' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="rounded-xl border border-white/10 bg-[#191a1d] p-3.5 space-y-3">
                    <p className="text-xs font-bold text-[#d6b77a]">+ Add New Project:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newWorkTitle}
                        onChange={(e) => setNewWorkTitle(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Category (e.g. Web app)"
                        value={newWorkCategory}
                        onChange={(e) => setNewWorkCategory(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Result metric (e.g. 10x Speed)"
                        value={newWorkResult}
                        onChange={(e) => setNewWorkResult(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={newWorkImage}
                        onChange={(e) => setNewWorkImage(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <textarea
                      placeholder="One line on the problem solved and the result..."
                      value={newWorkDesc}
                      onChange={(e) => setNewWorkDesc(e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddRecentWork}
                      className="w-full rounded-lg bg-[#d6b77a] py-1.5 text-xs font-bold text-[#171512]"
                    >
                      Add Project to Showcase
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#aaa9a5]">
                      Current Projects ({(formData.recentWork || []).length}):
                    </p>
                    {(formData.recentWork || []).map((rw) => (
                      <div
                        key={rw.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#191a1d] p-2.5"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-white truncate">{rw.title}</p>
                          <p className="text-[10px] text-[#d6b77a]">{rw.category} {rw.result && `• ${rw.result}`}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveRecentWork(rw.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews tab */}
              {editTab === 'reviews' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="rounded-xl border border-white/10 bg-[#191a1d] p-3.5 space-y-3">
                    <p className="text-xs font-bold text-[#d6b77a]">+ Add Client Quote:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Role / Company"
                        value={newReviewRole}
                        onChange={(e) => setNewReviewRole(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <textarea
                      placeholder="What the client said about your work..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddReview}
                      className="w-full rounded-lg bg-[#d6b77a] py-1.5 text-xs font-bold text-[#171512]"
                    >
                      Add Review Quote
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#aaa9a5]">
                      Current Reviews ({(formData.clientReviews || []).length}):
                    </p>
                    {(formData.clientReviews || []).map((rev) => (
                      <div
                        key={rev.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#191a1d] p-2.5"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-white truncate">{rev.name}</p>
                          <p className="text-[10px] text-[#aaa9a5] truncate">&ldquo;{rev.comment}&rdquo;</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveReview(rev.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements tab */}
              {editTab === 'achievements' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="rounded-xl border border-white/10 bg-[#191a1d] p-3.5 space-y-3">
                    <p className="text-xs font-bold text-[#d6b77a]">+ Add Achievement / Metric:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Title (e.g. 50+ Projects)"
                        value={newAchTitle}
                        onChange={(e) => setNewAchTitle(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Metric Tag (e.g. 50+ / 99.9%)"
                        value={newAchMetric}
                        onChange={(e) => setNewAchMetric(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Organization / Context"
                        value={newAchOrg}
                        onChange={(e) => setNewAchOrg(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Year (e.g. 2026 / Active)"
                        value={newAchYear}
                        onChange={(e) => setNewAchYear(e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#101113] px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddAchievement}
                      className="w-full rounded-lg bg-[#d6b77a] py-1.5 text-xs font-bold text-[#171512]"
                    >
                      Add Achievement
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#aaa9a5]">
                      Current Achievements ({(formData.achievements || []).length}):
                    </p>
                    {(formData.achievements || []).map((ach) => (
                      <div
                        key={ach.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#191a1d] p-2.5"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-white truncate">{ach.title}</p>
                          <p className="text-[10px] text-[#d6b77a]">{ach.organization} • {ach.year}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievement(ach.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal footer */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-white/10 bg-[#191a1d] px-4 py-2 text-xs font-semibold text-[#aaa9a5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#d6b77a] px-5 py-2 text-xs font-bold text-[#171512] shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
