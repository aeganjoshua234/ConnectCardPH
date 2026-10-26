export interface Product {
  id: string;
  name: string;
  category: 'card' | 'profile' | 'review' | 'bundle' | 'accessory';
  price: number;
  originalPrice?: number;
  description: string;
  tagline: string;
  image: string;
  badge?: string;
  features: string[];
  specs: {
    chip?: string;
    material?: string;
    compatibility?: string;
    durability?: string;
  };
  inStock: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalAmount: number;
  address: {
    street: string;
    barangay: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: 'gcash' | 'maya' | 'bdo_bpi' | 'cod';
  customPrintText?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  trackingNumber?: string;
}

export interface RecentWork {
  id: string;
  title: string;
  clientName: string;
  clientRole: string;
  location: string;
  category: 'custom-card' | 'enterprise' | 'review-stand' | 'smart-tag';
  image: string;
  description: string;
  finish: string;
  stats: string;
  testimonialSnippet: string;
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  filipinoComment?: string;
  verified: boolean;
  productUsed: string;
  avatar: string;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  iconType: 'users' | 'taps' | 'award' | 'money' | 'star' | 'shield';
  badge?: string;
}

export interface DigitalProfile {
  id: string;
  slug: string;
  fullName: string;
  headline: string;
  company: string;
  bio: string;
  location: string;
  avatarUrl: string;
  coverGradient: string;
  phone: string;
  email: string;
  website: string;
  viber: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  services: string[];
  gcashNumber?: string;
  verified: boolean;
  recentWork?: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    image?: string;
    result?: string;
    client?: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    year: string;
    organization: string;
    badge?: string;
    metric?: string;
  }>;
  clientReviews?: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    comment: string;
    rating: number;
    date: string;
    avatar?: string;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
  filipinoAnswer?: string;
  category: 'nfc' | 'orders' | 'payment' | 'compatibility';
}

