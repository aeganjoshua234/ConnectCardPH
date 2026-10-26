import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Product, Order } from '../types';
import { saveOrder } from '../utils/storage';
import { 
  CreditCard, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  AlertCircle, 
  QrCode, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface OrderPageProps {
  products: Product[];
  initialProductId?: string;
  onOrderSuccess: (order: Order) => void;
  onNavigate: (page: string) => void;
  lang: 'en' | 'tl';
}

export const OrderPage: React.FC<OrderPageProps> = ({
  products,
  initialProductId,
  onOrderSuccess,
  onNavigate,
  lang
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || products[0]?.id || 'nfc-business-card'
  );
  const [quantity, setQuantity] = useState<number>(1);
  
  // Customer Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Metro Manila');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('gcash');
  const [customPrintText, setCustomPrintText] = useState('');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
  }, [initialProductId]);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Pricing calculations
  const unitPrice = selectedProduct?.price || 0;
  const itemsTotal = unitPrice * quantity;
  const shippingFee = itemsTotal >= 1500 || selectedProduct?.category === 'profile' ? 0 : 120;
  const totalAmount = itemsTotal + shippingFee;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!customerName.trim()) {
      errs.customerName = lang === 'tl' ? 'Pakilagay ang buong pangalan mo.' : 'Full name is required.';
    }

    // Phone validation for Philippines (09XXXXXXXXX or +639XXXXXXXXX)
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      errs.phone = lang === 'tl' ? 'Kailangan ang cellphone number para sa delivery.' : 'Phone number is required.';
    } else if (!/^(09|\+639)\d{9}$/.test(cleanPhone)) {
      errs.phone = lang === 'tl' ? 'Maling format. Halimbawa: 09171234567 o +639171234567' : 'Invalid PH phone. Format: 09171234567';
    }

    if (!email.trim()) {
      errs.email = lang === 'tl' ? 'Kailangan ang email para sa profile login at tracking.' : 'Email is required for confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = lang === 'tl' ? 'Maling email format.' : 'Invalid email address.';
    }

    // For physical products, check delivery address
    if (selectedProduct?.category !== 'profile') {
      if (!street.trim()) {
        errs.street = lang === 'tl' ? 'Ilagay ang House No. / Street.' : 'Street address is required.';
      }
      if (!barangay.trim()) {
        errs.barangay = lang === 'tl' ? 'Ilagay ang Barangay.' : 'Barangay is required.';
      }
      if (!city.trim()) {
        errs.city = lang === 'tl' ? 'Ilagay ang Lungsod / Munisipyo.' : 'City / Municipality is required.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to top of form
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `CC-PH-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName,
      email,
      phone,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productPrice: selectedProduct.price,
      quantity,
      totalAmount,
      address: {
        street,
        barangay,
        city,
        province,
        postalCode
      },
      paymentMethod,
      customPrintText: customPrintText || undefined,
      notes: notes || undefined,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to real localStorage
    saveOrder(newOrder);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas-confetti fails
    }

    setSubmittedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  // Pre-fill demo data button for convenient testing
  const handleFillDemoData = () => {
    setCustomerName('Engr. Juan Dela Cruz');
    setPhone('09178901234');
    setEmail('juan.delacruz@buildph.com');
    setStreet('Block 4 Lot 12 Amber Street, Acacia Estates');
    setBarangay('Ususan');
    setCity('Taguig City');
    setProvince('Metro Manila');
    setPostalCode('1632');
    setCustomPrintText('Juan Dela Cruz • Project Director');
    setNotes('Matte black finish with silver engraving, please.');
    setErrors({});
  };

  // If order was just submitted, show confirmation receipt
  if (submittedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 pb-16 animate-in fade-in duration-300">
        <div className="rounded-3xl border border-cyan-500/40 bg-[#0c1630] p-6 sm:p-8 shadow-2xl text-center space-y-6">
          
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30">
            <CheckCircle className="h-9 w-9" />
          </div>

          <div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              {lang === 'tl' ? 'Order Natanggap!' : 'Order Placed Successfully!'}
            </span>
            <h2 className="mt-2 text-2xl font-black text-white font-heading sm:text-3xl">
              Salamat sa Pag-Order, {submittedOrder.customerName.split(' ')[0]}!
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Reference Code: <span className="font-mono font-bold text-cyan-400">{submittedOrder.orderNumber}</span>
            </p>
          </div>

          {/* Real Storage Disclosure */}
          <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-4 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
              <span>{lang === 'tl' ? 'Totoong Naka-Save sa System (LocalStorage):' : 'Genuine Local Storage Record:'}</span>
            </div>
            <p className="text-xs text-slate-300">
              {lang === 'tl'
                ? 'Ang order na ito ay totoo nang na-save sa browser storage ng iyong telepono. Pwede mo itong buksan at pamahalaan sa Admin Dashboard.'
                : 'This order is genuinely stored in your phone’s browser local storage. You can view, filter, and track its status right inside the Admin Dashboard.'}
            </p>
          </div>

          {/* Payment instructions (GCash / Maya demo guidance) */}
          <div className="rounded-2xl bg-blue-950/40 border border-blue-900/50 p-4 text-left space-y-2 text-xs text-slate-300">
            <p className="font-bold text-white uppercase tracking-wider text-[11px] text-cyan-400">
              {lang === 'tl' ? 'Paano Magbayad (Demo Instructions):' : 'Payment Details (Demo Simulation):'}
            </p>
            <div className="space-y-1">
              <p>• Method: <strong className="text-white uppercase">{submittedOrder.paymentMethod}</strong></p>
              <p>• Total Amount: <strong className="text-cyan-400 text-sm font-heading">₱{submittedOrder.totalAmount.toLocaleString()}</strong></p>
              <p>• GCash / Maya Merchant Account: <span className="font-mono text-white">0917-555-CARD (ConnectCard PH Inc.)</span></p>
              <p>• Note: Walang pera na ibabawas sa account mo habang sinusubukan ang demo app.</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate('admin')}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-md hover:from-blue-500 hover:to-cyan-400"
            >
              <span>{lang === 'tl' ? 'Tingnan sa Admin Dashboard' : 'View in Admin Dashboard'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                setSubmittedOrder(null);
                setQuantity(1);
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{lang === 'tl' ? 'Mag-order Ulit' : 'Place Another Order'}</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 pb-16 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-blue-950/60 px-3 py-1 text-xs font-semibold text-cyan-300">
          <ShoppingBag className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'tl' ? 'Opisyal na Order Form' : 'Direct Checkout'}</span>
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-white font-heading sm:text-4xl">
          {lang === 'tl' ? 'Mag-Order ng ConnectCard' : 'Order Your Smart NFC Card'}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-300">
          {lang === 'tl' 
            ? 'Punan ang detalye sa ibaba. Mabilis na ipapadala saanman sa Pilipinas.'
            : 'Fast fulfillment and nationwide shipping across Metro Manila and Provinces.'}
        </p>

        {/* Quick Demo Pre-fill Button */}
        <button
          type="button"
          onClick={handleFillDemoData}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'tl' ? 'Pindutin para sa Sample PH Data' : 'Auto-fill Sample PH Data'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Fields */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Step 1: Product Selection */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">1</span>
                <span>{lang === 'tl' ? 'Piliin ang Produkto' : 'Select Product'}</span>
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                {lang === 'tl' ? 'Produkto:' : 'Product:'}
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ₱{p.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-medium text-slate-300">
                {lang === 'tl' ? 'Dami / Quantity:' : 'Quantity:'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-white font-bold hover:bg-slate-700"
                >
                  -
                </button>
                <span className="font-heading font-bold text-white text-base min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-white font-bold hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Information */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">2</span>
                <span>{lang === 'tl' ? 'Impormasyon ng Kliyente' : 'Customer Details'}</span>
              </h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'tl' ? 'Buong Pangalan' : 'Full Name'} *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Hal. Juan Dela Cruz"
                className={`w-full rounded-xl border bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                  errors.customerName ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                }`}
              />
              {errors.customerName && <p className="mt-1 text-[11px] text-red-400">{errors.customerName}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'Cellphone Number (PH)' : 'PH Mobile Number'} *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09171234567"
                  className={`w-full rounded-xl border bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                    errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'Email Address' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className={`w-full rounded-xl border bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Address (if physical card) */}
          {selectedProduct?.category !== 'profile' && (
            <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">3</span>
                  <span>{lang === 'tl' ? 'Address para sa Delivery' : 'Shipping Address (Philippines)'}</span>
                </h2>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'tl' ? 'House / Unit / Street' : 'Street Address'} *
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Hal. Unit 4B Sunshine Tower, Pioneer St."
                  className={`w-full rounded-xl border bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                    errors.street ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                {errors.street && <p className="mt-1 text-[11px] text-red-400">{errors.street}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'tl' ? 'Barangay' : 'Barangay'} *
                  </label>
                  <input
                    type="text"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    placeholder="Hal. Barangay San Antonio"
                    className={`w-full rounded-xl border bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                      errors.barangay ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {errors.barangay && <p className="mt-1 text-[11px] text-red-400">{errors.barangay}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'tl' ? 'Lungsod / Bayan' : 'City / Municipality'} *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Hal. Pasig City / Cebu City"
                    className={`w-full rounded-xl border bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none ${
                      errors.city ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {errors.city && <p className="mt-1 text-[11px] text-red-400">{errors.city}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'tl' ? 'Probinsya / Rehiyon' : 'Province / Region'}
                  </label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Metro Manila / Cavite / Cebu / Davao"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'tl' ? 'Postal / ZIP Code' : 'Postal Code'}
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Hal. 1605"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Customization Details */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-5 shadow-lg space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-xs font-bold">4</span>
              <span>{lang === 'tl' ? 'Custom Card Print o Notes' : 'Card Customization & Notes'}</span>
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'tl' ? 'Pangalan o Kompanya na ipi-print sa card (Optional):' : 'Name / Title to engrave on card (Optional):'}
              </label>
              <input
                type="text"
                value={customPrintText}
                onChange={(e) => setCustomPrintText(e.target.value)}
                placeholder="Hal. Juan Dela Cruz • Broker"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'tl' ? 'Karagdagang tagubilin o Notes:' : 'Additional Notes / Instructions:'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder={lang === 'tl' ? 'Hal. Pakitawagan ako bago i-deliver ng rider.' : 'Special requests or delivery notes...'}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Payment Preference */}
        <div className="md:col-span-5 space-y-6">
          
          <div className="sticky top-20 rounded-2xl border border-cyan-500/30 bg-[#0c1630] p-5 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white font-heading border-b border-slate-800 pb-3">
              {lang === 'tl' ? 'Buod ng Order' : 'Order Summary'}
            </h3>

            {/* Selected Item Preview */}
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{selectedProduct?.name}</p>
                <p className="text-[11px] text-cyan-300">₱{unitPrice.toLocaleString()} x {quantity}</p>
                <p className="text-[10px] text-slate-400">{selectedProduct?.specs.chip || 'Instant Setup'}</p>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
              <div className="flex justify-between">
                <span>{lang === 'tl' ? 'Subtotal:' : 'Subtotal:'}</span>
                <span className="font-semibold text-white">₱{itemsTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'tl' ? 'J&T Shipping (Luzon, Vis, Min):' : 'Nationwide Shipping:'}</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-bold uppercase">LIBRE (Free)</span>
                  ) : (
                    <span className="font-semibold text-white">₱{shippingFee}</span>
                  )}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[10px] text-cyan-400">
                  Tip: Libre ang shipping kapag ₱1,500 pataas ang order!
                </p>
              )}
              <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold text-white font-heading">
                <span>{lang === 'tl' ? 'Kabuuang Babayaran:' : 'Grand Total:'}</span>
                <span className="text-cyan-400 text-lg">₱{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <label className="block text-xs font-semibold text-slate-200">
                {lang === 'tl' ? 'Paraan ng Pagbabayad:' : 'Preferred Payment Method:'}
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gcash', label: 'GCash', tag: 'Fast' },
                  { id: 'maya', label: 'Maya', tag: 'Instant' },
                  { id: 'bdo_bpi', label: 'BDO / BPI', tag: 'Bank' },
                  { id: 'cod', label: 'Cash on Del.', tag: 'Metro Mla' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as Order['paymentMethod'])}
                    className={`flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold transition ${
                      paymentMethod === m.id
                        ? 'border border-cyan-400 bg-cyan-500/20 text-cyan-300'
                        : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span>{m.label}</span>
                    <span className="text-[9px] text-slate-400 bg-slate-800 px-1 py-0.5 rounded">
                      {m.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-102 active:scale-98"
            >
              <CreditCard className="h-4 w-4" />
              <span>{lang === 'tl' ? `Kumpirmahin ang Order (₱${totalAmount.toLocaleString()})` : `Place Order (₱${totalAmount.toLocaleString()})`}</span>
            </button>

            {/* Honest Notice */}
            <div className="rounded-xl bg-slate-900/80 p-2.5 text-[10px] text-slate-400 border border-slate-800 text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400 inline mr-1" />
              <span>Demo Mode: Nai-save ito sa storage ng iyong telepono. Walang tunay na kabawasan sa bangko o credit card.</span>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
};
