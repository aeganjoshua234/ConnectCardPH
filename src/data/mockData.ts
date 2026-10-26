import { Product, DigitalProfile, Order, FAQItem, RecentWork, ClientReview, Achievement } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'nfc-business-card',
    name: 'NFC Smart Business Card',
    category: 'card',
    price: 999,
    originalPrice: 1499,
    tagline: 'One tap to share your contact details and social links with anyone.',
    description: 'Premium matte finish card embedded with high-frequency NTAG216 chip. Compatible with all modern iPhones and Android devices. No battery or app required.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular',
    features: [
      'Built-in NFC Chip (NTAG216 high capacity)',
      'Laser-sharp QR code printed on the back',
      'Waterproof, scratch-resistant matte PVC finish',
      'Instant tap works on iPhone (XS and newer) & Android',
      'Lifetime digital profile hosting with zero monthly fees'
    ],
    specs: {
      chip: 'NTAG216 (888 bytes)',
      material: 'Eco-grade matte PVC / Waterproof',
      compatibility: 'iOS 13+ & Android with NFC',
      durability: '100,000+ taps / 10-year retention'
    },
    inStock: true
  },
  {
    id: 'digital-business-profile',
    name: 'Digital Business Profile',
    category: 'profile',
    price: 499,
    originalPrice: 799,
    tagline: 'Your personal mini-website and dynamic contact card accessible anywhere.',
    description: 'A lightning-fast, high-converting digital landing page tailored for Filipino entrepreneurs, real estate agents, freelancers, and executives. Update your details anytime.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    badge: '100% Digital • Instant Setup',
    features: [
      'Custom link (connectcard.ph/your-name)',
      'Instant One-Click "Save Contact" (.vcf vCard file)',
      'Social links: Facebook, Instagram, Viber, TikTok, LinkedIn',
      'GCash / Maya QR code payment integration',
      'Unlimited link edits and real-time updates'
    ],
    specs: {
      compatibility: 'Any smartphone, tablet, or browser',
      durability: 'Active forever, no recurring fees',
      material: 'Cloud-hosted progressive web profile'
    },
    inStock: true
  },
  {
    id: 'nfc-google-review-card',
    name: 'NFC Google Review Card & Stand',
    category: 'review',
    price: 899,
    originalPrice: 1299,
    tagline: 'Get 5-star Google Reviews with a single tap at your counter or tables.',
    description: 'Designed specifically for Philippine restaurants, dental clinics, salons, coffee shops, and retail stores. Customers tap their phone and your 5-star review dialog opens immediately.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    badge: 'Top for PH Businesses',
    features: [
      'Direct link to your official Google Maps Review page',
      'Increases Google Maps ranking and customer trust',
      'Durable acrylic table stand included',
      'Dual NFC Tap + High-contrast QR code for older phones',
      'No customer app download or typing required'
    ],
    specs: {
      chip: 'NTAG215 High-Speed Response',
      material: 'Hard UV-coated acrylic + NFC base',
      compatibility: '100% universal (NFC & QR fallback)',
      durability: 'Commercial grade, spill-proof'
    },
    inStock: true
  },
  {
    id: 'custom-nfc-card-bundle',
    name: 'Team / Corporate Custom NFC Bundle',
    category: 'bundle',
    price: 4499,
    originalPrice: 5999,
    tagline: 'Pack of 5 custom branded cards with company logo and team management.',
    description: 'Full-color UV print with your company brand logo, individual employee names, and corporate dashboard for real estate teams, agencies, and sales professionals across the Philippines.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value for Teams',
    features: [
      '5 Custom NFC Cards with your custom company logo',
      'Individual names and designations printed on each card',
      'Centralized admin dashboard to update employee details',
      'Free shipping anywhere in the Philippines via J&T Express',
      'Dedicated Filipino WhatsApp/Viber priority support'
    ],
    specs: {
      chip: 'NTAG216 Heavy Duty',
      material: 'Premium Matte Black PVC or Brushed Silver',
      compatibility: 'Universal iPhone and Android support',
      durability: 'Scratch-shield laminated'
    },
    inStock: true
  },
  {
    id: 'nfc-smart-phone-tag',
    name: 'NFC Smart Phone Tag / Keychain',
    category: 'accessory',
    price: 399,
    originalPrice: 599,
    tagline: 'Compact adhesive NFC dot that sticks directly to the back of your phone case.',
    description: 'Always have your digital business card with you without pulling out a wallet. Sleek 30mm epoxy sticker with 3M adhesive.',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    badge: 'Ultra Compact',
    features: [
      '30mm water-resistant epoxy bubble shield',
      'Anti-metal shielding layer for phone interference protection',
      'Works seamlessly on top of phone cases',
      'Tap on any NFC-enabled smartphone'
    ],
    specs: {
      chip: 'NTAG213 Anti-Metal Protected',
      material: 'Epoxy resin + 3M industrial tape',
      compatibility: 'Universal tap',
      durability: 'Flexible and water-proof'
    },
    inStock: true
  }
];

export const INITIAL_PROFILE: DigitalProfile = {
  id: 'aegan-joshua-ph',
  slug: 'aegan-joshua',
  fullName: 'Aegan Joshua Malapitan',
  headline: 'IT Consultant & Full Stack Developer',
  company: 'Sipat Tech Review',
  bio: 'I help people and businesses build meaningful connections, discover opportunities, and grow with confidence through modern web tech and IT solutions.',
  location: 'Makati City, Metro Manila, Philippines',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
  coverGradient: 'from-amber-700 via-stone-800 to-slate-950',
  phone: '+63 964 842 6312',
  email: 'aeganjmalapitan@gmail.com',
  website: 'https://www.yourbusiness.com',
  viber: '+63 964 842 6312',
  socials: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    tiktok: 'https://tiktok.com/'
  },
  services: [
    'Full Stack Web & Mobile App Development',
    'IT Systems & Cloud Infrastructure Setup',
    'Custom NFC Smart Card & IoT Integrations',
    'SEO & Digital Business Solutions'
  ],
  gcashNumber: '0964-842-6312',
  verified: true,
  recentWork: [
    {
      id: 'pw-1',
      title: 'LeverAI — AI Workflow & Enterprise Platform',
      category: 'Web App',
      description: 'Engineered an AI-powered enterprise dashboard with real-time analytics, automated document parsing, and PostgreSQL backend.',
      result: '10x Faster Processing',
      client: 'Sipat Tech Review & Enterprise Clients',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pw-2',
      title: 'Philippine Commercial Real Estate Portal',
      category: 'Business Website',
      description: 'Built a high-converting property portal with interactive 3D floorplans, map integration, and automated lead capture.',
      result: '+340% Lead Generation',
      client: 'Metro Living Prime PH',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'pw-3',
      title: 'Cloud Systems Security & IT Migration',
      category: 'IT Consulting',
      description: 'Spearheaded zero-downtime cloud migration, multi-factor security protocols, and 99.99% high-availability server architecture.',
      result: '99.99% Server Uptime',
      client: 'Regional FinTech Client',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
    }
  ],
  achievements: [
    {
      id: 'pa-1',
      title: '50+ High-Performance Projects Delivered',
      year: '2023 - 2026',
      organization: 'Sipat Tech Review Portfolio',
      badge: '50+ Completed',
      metric: '50+ Apps'
    },
    {
      id: 'pa-2',
      title: 'Certified Full Stack Cloud Architect',
      year: 'Active',
      organization: 'Professional IT Standards PH',
      badge: 'Certified',
      metric: 'Top Tier'
    },
    {
      id: 'pa-3',
      title: '99.9% Uptime & Systems Reliability',
      year: 'Ongoing',
      organization: 'Production Enterprise Deployments',
      badge: 'Enterprise Grade',
      metric: '99.9%'
    },
    {
      id: 'pa-4',
      title: 'Top Rated Philippine IT Consultant',
      year: '2025 - 2026',
      organization: 'Client Satisfaction Index',
      badge: '5.0 ★ Rated',
      metric: '5.0 Rating'
    }
  ],
  clientReviews: [
    {
      id: 'pr-1',
      name: 'Engr. Juan Dela Cruz',
      role: 'Chief Technology Officer',
      company: 'OmniTrade PH',
      comment: 'Aegan delivers top-tier full-stack work. He redesigned our entire system architecture and integrated our NFC touchpoints in record time. Truly exceptional technical consulting.',
      rating: 5,
      date: '2 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'pr-2',
      name: 'Katrina Dizon',
      role: 'Operations Director',
      company: 'Harbor Media & Cafe',
      comment: 'Super fast delivery and very professional communication. The digital platform and NFC integrations boosted our client engagement significantly!',
      rating: 5,
      date: '1 month ago',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'pr-3',
      name: 'Mark Lester Villanueva',
      role: 'Creative Director',
      company: 'VMedia Studio',
      comment: 'Aegan understood our requirements right from the kickoff meeting. His attention to detail, modern UI sensibilities, and backend security gave our team 100% peace of mind.',
      rating: 5,
      date: '2 months ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'CC-PH-89211',
    customerName: 'Atty. Rafael Cruz',
    email: 'cruz.law@gmail.com',
    phone: '09189234567',
    productId: 'nfc-business-card',
    productName: 'NFC Smart Business Card',
    productPrice: 999,
    quantity: 2,
    totalAmount: 1998,
    address: {
      street: 'Unit 14B High Street South Block',
      barangay: 'Fort Bonifacio',
      city: 'Taguig',
      province: 'Metro Manila',
      postalCode: '1634'
    },
    paymentMethod: 'gcash',
    customPrintText: 'Atty. Rafael Cruz • Senior Partner',
    notes: 'Please print in Matte Black with silver text if possible.',
    status: 'shipped',
    createdAt: '2026-10-24T14:30:00Z',
    trackingNumber: 'JT-PH-992817263'
  },
  {
    id: 'ord-002',
    orderNumber: 'CC-PH-89212',
    customerName: 'Katrina Dizon',
    email: 'katrina.dizon@cafeharbor.com',
    phone: '09228765432',
    productId: 'nfc-google-review-card',
    productName: 'NFC Google Review Card & Stand',
    productPrice: 899,
    quantity: 3,
    totalAmount: 2697,
    address: {
      street: 'Cafe Harbor, 42 Gorordo Avenue',
      barangay: 'Kamputhaw',
      city: 'Cebu City',
      province: 'Cebu',
      postalCode: '6000'
    },
    paymentMethod: 'maya',
    customPrintText: 'Cafe Harbor Cebu',
    notes: 'Link directly to our Google Maps place ID.',
    status: 'processing',
    createdAt: '2026-10-25T09:15:00Z'
  },
  {
    id: 'ord-003',
    orderNumber: 'CC-PH-89213',
    customerName: 'Mark Lester Villanueva',
    email: 'mark.lester@vmedia.ph',
    phone: '09171239876',
    productId: 'custom-nfc-card-bundle',
    productName: 'Team / Corporate Custom NFC Bundle',
    productPrice: 4499,
    quantity: 1,
    totalAmount: 4499,
    address: {
      street: '88 J.P. Rizal Street',
      barangay: 'San Roque',
      city: 'Marikina',
      province: 'Metro Manila',
      postalCode: '1801'
    },
    paymentMethod: 'bdo_bpi',
    customPrintText: 'VMedia Creative Studio PH',
    notes: 'Sending corporate logo SVG via email.',
    status: 'confirmed',
    createdAt: '2026-10-25T16:45:00Z'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Paano gumagana ang NFC card? Kailangan ba ng app ng taong tinatap ko?',
    answer: 'Hindi po kailangan ng app! (No app required). Ididikit mo lang ang card sa likod ng iPhone o Android phone, at kusang lilitaw ang notification na magbubukas sa iyong Digital Business Card profile.',
    filipinoAnswer: 'Wala nang app na idodownload ang kausap mo. Isang tap lang sa phone, nakabukas agad ang profile at contact info mo.',
    category: 'nfc'
  },
  {
    question: 'Anong mga smartphone ang compatible sa ConnectCard PH?',
    answer: 'Lahat ng modernong iPhone (iPhone XR, XS, 11, 12, 13, 14, 15, 16 pataas) at halos lahat ng Android phones (Samsung, Xiaomi, Oppo, Vivo, Realme, Pixel) na may NFC. Kung sakaling walang NFC ang lumang phone, may built-in QR Code sa likod na pwedeng i-scan gamit ang camera!',
    filipinoAnswer: 'Pwedeng-pwede sa iPhone at Android! May kasama ring QR code para sa mga lumang phones.',
    category: 'compatibility'
  },
  {
    question: 'May monthly fee ba o subscription pagkatapos bumili?',
    answer: 'Wala pong monthly fee! One-time payment lang ang card at digital profile. Libre ang pag-update ng iyong cellphone number, email, at social media links kahit kailan mo gusto.',
    filipinoAnswer: 'Walang bayad kada buwan. One-time payment lang!',
    category: 'payment'
  },
  {
    question: 'Anong payment methods ang tinatanggap?',
    answer: 'Tumatanggap kami ng GCash, Maya (PayMaya), Online Bank Transfer (BDO, BPI, UnionBank), at Cash on Delivery (COD) para sa Metro Manila at selected provincial areas.',
    filipinoAnswer: 'GCash, Maya, Bank Transfer (BDO/BPI) at COD.',
    category: 'payment'
  },
  {
    question: 'Gaano katagal ang delivery sa Pilipinas?',
    answer: 'Metro Manila: 1-3 business days. Provincial Luzon: 3-5 days. Visayas at Mindanao: 5-7 days via J&T Express o LBC. Bibigyan ka namin ng official tracking number pagka-ship.',
    filipinoAnswer: '1-3 araw sa Metro Manila, 3-7 araw sa mga probinsya gamit ang J&T o LBC.',
    category: 'orders'
  },
  {
    question: 'Paano kung magbago ang number o trabaho ko? Kailangan ba ng bagong card?',
    answer: 'Hindi kailangan ng bagong card! Dahil dynamic ang ConnectCard profile mo, mag-login ka lang sa iyong digital profile para baguhin ang number, email, o Facebook link, at agad itong mag-uupdate kapag may nag-tap sa lumang card mo.',
    filipinoAnswer: 'Hindi kailangan palitan ang card! Pwede mong baguhin ang info online anytime.',
    category: 'nfc'
  }
];

export const SAMPLE_RECENT_WORKS: RecentWork[] = [
  {
    id: 'work-001',
    title: 'Metro Manila Prime Living — 25 Custom NFC Cards',
    clientName: 'Atty. Rafael Cruz & Partners',
    clientRole: 'Managing Director & Brokers Team',
    location: 'Bonifacio Global City, Taguig',
    category: 'custom-card',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Bespoke Matte Black NFC smart cards with embossed metallic foil company logo. Delivered complete with personalized team dashboard and instant vCard synchronization.',
    finish: 'Matte Black PVC • Silver UV Emboss • NTAG216',
    stats: '4,800+ Client Taps • 0 Paper Waste',
    testimonialSnippet: 'Our real estate brokers close client meetings faster. One tap on their smartphone and all our contact details and active condo listings are saved.'
  },
  {
    id: 'work-002',
    title: 'Harbor Roast Coffee & Bistro — 12 Google Review NFC Stands',
    clientName: 'Katrina Dizon',
    clientRole: 'Owner & General Manager',
    location: 'Gorordo Avenue, Cebu City',
    category: 'review-stand',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    description: 'Commercial-grade acrylic counter stands with dual NFC micro-chip and high-contrast QR code. Diners tap their phones right at the cashier or dining tables.',
    finish: 'Clear Acrylic Stand • High-Density NFC Base',
    stats: '+340% 5-Star Reviews in 60 Days',
    testimonialSnippet: 'We jumped from 42 reviews to over 180 5-star Google Reviews in just 2 months! Customers love how effortless it is.'
  },
  {
    id: 'work-003',
    title: 'Apex Creative Media Agency — 40 Team NFC Smart Cards',
    clientName: 'Mark Lester Villanueva',
    clientRole: 'Creative Director',
    location: 'Salcedo Village, Makati City',
    category: 'enterprise',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Corporate rollout for senior graphic designers, video editors, and account executives. Features custom company branding, Behance portfolio links, and Google Drive pitch decks.',
    finish: 'Brushed Carbon Fiber Texture • Dual NFC + QR',
    stats: '1,200+ Portfolio Clicks Monthly',
    testimonialSnippet: 'Whenever our creative directors meet brand managers in BGC or Makati, tapping the card directly opens our agency showreel.'
  },
  {
    id: 'work-004',
    title: 'Santos Dental Aesthetics Clinic — Tap-to-Book Keychain & Disc',
    clientName: 'Dr. Patricia Santos, DMD',
    clientRole: 'Lead Aesthetic Dentist',
    location: 'Diliman, Quezon City',
    category: 'smart-tag',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    description: 'Compact epoxy NFC smart tags placed at the dental reception counter and keychain tags for doctors. Patients tap to follow on Instagram and book appointments via Viber.',
    finish: '30mm Waterproof Epoxy Resin • 3M Adhesive',
    stats: '95% Next-Visit Booking Rate',
    testimonialSnippet: 'Patients simply tap their phone upon paying at the counter. Zero typing, effortless booking for teeth cleaning and whitening.'
  }
];

export const SAMPLE_REVIEWS: ClientReview[] = [
  {
    id: 'rev-001',
    name: 'Maria Santos, REB',
    role: 'Licensed Real Estate Broker',
    company: 'Prime Living PH',
    location: 'BGC, Taguig City',
    rating: 5,
    date: '2 days ago',
    comment: 'Game changer during property viewings in BGC! Clients are always impressed when I tap my card against their iPhone. Within seconds, my number is in their contacts and my condo catalog is on their screen.',
    filipinoComment: 'Sobrang bilis gamitin sa client meetings! Isang tap lang, nasa phone contacts na nila ako agad.',
    verified: true,
    productUsed: 'NFC Smart Business Card',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-002',
    name: 'Katrina Dizon',
    role: 'Founder & Head Barista',
    company: 'Harbor Roast Coffee',
    location: 'Cebu City',
    rating: 5,
    date: '1 week ago',
    comment: 'The Google Review stand boosted our cafe rankings on Google Maps significantly! Tourists and locals tap it with GCash ease. Delivery via J&T Express to Cebu was super fast and well-packaged.',
    filipinoComment: 'Mabilis dumating sa Cebu via J&T! Lumobo ang 5-star Google reviews ng cafe namin.',
    verified: true,
    productUsed: 'NFC Google Review Card & Stand',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-003',
    name: 'Atty. Rafael Cruz',
    role: 'Managing Partner',
    company: 'Cruz & Associates Law',
    location: 'Ortigas, Pasig City',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The matte black finish with silver engraving looks incredibly elegant and prestigious. Zero monthly subscription is a huge plus compared to foreign alternatives. Truly Philippine quality.',
    filipinoComment: 'Napakaganda ng quality ng matte black card. Walang monthly fee kaya sulit na sulit.',
    verified: true,
    productUsed: 'Custom NFC Card Bundle',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-004',
    name: 'Kimberly Flores',
    role: 'Freelance Product Designer',
    company: 'Studio K Design',
    location: 'Davao City',
    rating: 5,
    date: '3 weeks ago',
    comment: 'I travel between Davao and Manila for design conferences. Tapping my card to share my Figma portfolio and WhatsApp without printing 500 paper cards is liberating. 10/10 recommend!',
    filipinoComment: 'Hindi na kailangan magpa-print ng sandamakmak na papel na calling card. Napaka-convenient!',
    verified: true,
    productUsed: 'Digital Business Profile',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-005',
    name: 'Dr. Christian Tan, DMD',
    role: 'Dental Surgeon',
    company: 'Tan Dental Care',
    location: 'Makati CBD',
    rating: 5,
    date: '1 month ago',
    comment: 'We use the NFC Smart Phone Tag on our clinic counter. Patients love the high-tech touch to send their GCash payments and connect on Viber. Setup took less than 3 minutes.',
    filipinoComment: 'Madaling i-setup, wala pang 3 minuto! Gustong-gusto ng pasyente namin sa Makati.',
    verified: true,
    productUsed: 'NFC Smart Phone Tag / Keychain',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-001',
    title: '75,000+ Smart Taps',
    metric: '75K+',
    subtitle: 'Recorded Across the Philippines',
    description: 'Powering instant networking across Metro Manila, Metro Cebu, Metro Davao, and provincial hubs.',
    iconType: 'taps',
    badge: 'Real Impact'
  },
  {
    id: 'ach-002',
    title: '1,450+ Active PH Businesses',
    metric: '1.4K+',
    subtitle: 'Entrepreneurs, Brokers, Clinics & Agencies',
    description: 'Trusted by licensed brokers, top medical clinics, independent cafes, and corporate teams nationwide.',
    iconType: 'users',
    badge: 'Growing Community'
  },
  {
    id: 'ach-003',
    title: '₱0 Recurring Monthly Fees',
    metric: '₱0/mo',
    subtitle: 'Zero Hidden Charges Ever',
    description: 'Saving Filipino professionals an estimated ₱8.5M annually in recurring subscription fees.',
    iconType: 'money',
    badge: 'Best Value'
  },
  {
    id: 'ach-004',
    title: '99.9% Tap Reliability',
    metric: '99.9%',
    subtitle: 'Certified NXP NTAG Microchips',
    description: 'Precision engineered for rapid sub-second detection on modern Apple iOS and Android devices.',
    iconType: 'shield',
    badge: 'Hardware Grade'
  },
  {
    id: 'ach-005',
    title: '4.97 / 5.0 Star Rating',
    metric: '4.97 ★',
    subtitle: 'Based on 350+ Verified Client Reviews',
    description: 'Consistently rated 5 stars for high build quality, waterproof finish, and prompt local support.',
    iconType: 'star',
    badge: 'Customer Favorite'
  },
  {
    id: 'ach-006',
    title: 'PH Business Tech Innovation',
    metric: '#1',
    subtitle: 'Eco-Friendly Smart Solution',
    description: 'Eliminating over 250,000 discarded paper business cards from Philippine landfills.',
    iconType: 'award',
    badge: 'Eco Award'
  }
];

