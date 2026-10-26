import { Order, Product, DigitalProfile, ClientReview } from '../types';
import { SAMPLE_PRODUCTS, INITIAL_ORDERS, INITIAL_PROFILE, SAMPLE_REVIEWS } from '../data/mockData';

const ORDERS_KEY = 'connectcard_ph_orders_v1';
const PRODUCTS_KEY = 'connectcard_ph_products_v1';
const PROFILE_KEY = 'connectcard_ph_profile_v1';
const REVIEWS_KEY = 'connectcard_ph_reviews_v1';

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrder(order: Order): Order[] {
  const existing = getStoredOrders();
  const updated = [order, ...existing];
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
  return updated;
}

export function updateOrderStatus(orderId: string, status: Order['status'], trackingNumber?: string): Order[] {
  const existing = getStoredOrders();
  const updated = existing.map(o => {
    if (o.id === orderId) {
      return {
        ...o,
        status,
        ...(trackingNumber ? { trackingNumber } : {})
      };
    }
    return o;
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteStoredOrder(orderId: string): Order[] {
  const existing = getStoredOrders();
  const updated = existing.filter(o => o.id !== orderId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return updated;
}

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SAMPLE_PRODUCTS));
      return SAMPLE_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getStoredProfile(): DigitalProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    const parsed = JSON.parse(raw);
    if (parsed.id === 'maria-santos-ph') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
      return INITIAL_PROFILE;
    }
    return parsed;
  } catch {
    return INITIAL_PROFILE;
  }
}

export function saveProfile(profile: DigitalProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredReviews(): ClientReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(SAMPLE_REVIEWS));
      return SAMPLE_REVIEWS;
    }
    return JSON.parse(raw);
  } catch {
    return SAMPLE_REVIEWS;
  }
}

export function saveReview(review: ClientReview): ClientReview[] {
  const existing = getStoredReviews();
  const updated = [review, ...existing];
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save review', e);
  }
  return updated;
}

export function resetDemoData(): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SAMPLE_PRODUCTS));
  localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(SAMPLE_REVIEWS));
}

