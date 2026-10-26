import React, { useState } from 'react';
import { Order, Product } from '../types';
import { 
  updateOrderStatus, 
  deleteStoredOrder, 
  saveProducts, 
  resetDemoData 
} from '../utils/storage';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Trash2, 
  RotateCcw, 
  ShieldCheck, 
  Search, 
  Filter,
  Eye,
  X,
  Edit2
} from 'lucide-react';

interface AdminPageProps {
  orders: Order[];
  products: Product[];
  onOrdersChange: (orders: Order[]) => void;
  onProductsChange: (products: Product[]) => void;
  lang: 'en' | 'tl';
}

export const AdminPage: React.FC<AdminPageProps> = ({
  orders,
  products,
  onOrdersChange,
  onProductsChange,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Price editor state for products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped' || o.status === 'delivered').length;

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const matchesSearch = 
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    let tracking: string | undefined = undefined;
    if (newStatus === 'shipped') {
      tracking = `JT-PH-${Math.floor(100000000 + Math.random() * 900000000)}`;
    }
    const updated = updateOrderStatus(orderId, newStatus, tracking);
    onOrdersChange(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, ...(tracking ? { trackingNumber: tracking } : {}) });
    }
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm(lang === 'tl' ? 'Sigurado ka bang nais mong tanggalin ang order na ito?' : 'Are you sure you want to delete this order?')) {
      const updated = deleteStoredOrder(orderId);
      onOrdersChange(updated);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const handleStockToggle = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    });
    saveProducts(updated);
    onProductsChange(updated);
  };

  const handleSavePrice = () => {
    if (!editingProduct) return;
    const updated = products.map((p) => {
      if (p.id === editingProduct.id) {
        return { ...p, price: newPrice };
      }
      return p;
    });
    saveProducts(updated);
    onProductsChange(updated);
    setEditingProduct(null);
  };

  const handleResetData = () => {
    if (window.confirm(lang === 'tl' ? 'I-reset ang lahat ng sample data?' : 'Reset to default initial demo orders and products?')) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pb-20 space-y-8">
      
      {/* Header & Transparency Notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Admin Portal • ConnectCard PH
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white font-heading mt-1 sm:text-3xl">
            {lang === 'tl' ? 'Pamamahala ng Orders at Produkto' : 'Store Orders & Inventory Dashboard'}
          </h1>
        </div>

        <button
          onClick={handleResetData}
          className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <RotateCcw className="h-3.5 w-3.5 text-cyan-400" />
          <span>{lang === 'tl' ? 'I-reset ang Sample Data' : 'Reset Demo Data'}</span>
        </button>
      </div>

      {/* Honest Storage Badge */}
      <div className="rounded-2xl border border-cyan-500/30 bg-blue-950/20 p-4 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0" />
          <div>
            <span className="font-bold text-white">LocalStorage Persistence Active: </span>
            <span>
              {lang === 'tl' 
                ? 'Lahat ng pagbabago, bagong order, at status updates ay tunay na naitatabi sa memory ng browser mo.' 
                : 'All new customer orders, status changes, and prices are saved directly to your phone browser\'s localStorage.'}
            </span>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-cyan-500/20 px-2.5 py-1 text-[11px] font-bold text-cyan-300 border border-cyan-500/30">
          Real Local Database
        </span>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-400">{lang === 'tl' ? 'Kabuuang Benta' : 'Total Sales'}</p>
          <p className="mt-1 text-xl sm:text-2xl font-black text-white font-heading">
            ₱{totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-[10px] text-cyan-400 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{orders.length} transactions</span>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-400">{lang === 'tl' ? 'Pending Orders' : 'Pending Payment'}</p>
          <p className="mt-1 text-xl sm:text-2xl font-black text-amber-400 font-heading">
            {pendingCount}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">Needs confirmation</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-400">{lang === 'tl' ? 'Na-ship / Delivered' : 'Shipped & Delivered'}</p>
          <p className="mt-1 text-xl sm:text-2xl font-black text-emerald-400 font-heading">
            {shippedCount}
          </p>
          <p className="mt-1 text-[10px] text-emerald-400/80">Dispatched via J&T / LBC</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-400">{lang === 'tl' ? 'Aktibong Produkto' : 'Active Products'}</p>
          <p className="mt-1 text-xl sm:text-2xl font-black text-cyan-400 font-heading">
            {products.length}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">In catalog</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{lang === 'tl' ? 'Mga Order' : 'Orders'} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'products'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>{lang === 'tl' ? 'Imbentaryo at Presyo' : 'Products & Pricing'} ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All' },
                { id: 'pending', label: 'Pending' },
                { id: 'confirmed', label: 'Confirmed' },
                { id: 'processing', label: 'Processing' },
                { id: 'shipped', label: 'Shipped' },
                { id: 'delivered', label: 'Delivered' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                    statusFilter === st.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'tl' ? 'Hanapin ang order o pangalan...' : 'Search by code or name...'}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Orders List / Cards (Mobile-optimized) */}
          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#0c1630] p-10 text-center text-xs text-slate-400">
                {lang === 'tl' ? 'Walang order na tumutugma sa filter.' : 'No orders found matching filter criteria.'}
              </div>
            ) : (
              filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-2xl border border-slate-800 bg-[#0c1630] p-4 sm:p-5 transition hover:border-slate-700 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          {ord.orderNumber}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          ord.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          ord.status === 'processing' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          ord.status === 'confirmed' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {ord.customerName}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {ord.phone} • {ord.email}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-base font-extrabold text-cyan-400 font-heading">
                        ₱{ord.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-slate-400 uppercase">
                        Pay via: <span className="font-bold text-white">{ord.paymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  {/* Order Details Preview */}
                  <div className="flex flex-col sm:flex-row justify-between text-xs text-slate-300 gap-2">
                    <div>
                      <p className="font-medium text-white">{ord.productName} (x{ord.quantity})</p>
                      {ord.customPrintText && (
                        <p className="text-[11px] text-cyan-300">
                          Engraving: &ldquo;{ord.customPrintText}&rdquo;
                        </p>
                      )}
                      {ord.trackingNumber && (
                        <p className="text-[11px] text-emerald-400 font-mono mt-0.5">
                          J&T Tracking: {ord.trackingNumber}
                        </p>
                      )}
                    </div>

                    {/* Status updater dropdown & actions */}
                    <div className="flex items-center gap-2 pt-2 sm:pt-0">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as Order['status'])}
                        className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-cyan-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>

                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(ord.id)}
                        className="rounded-lg border border-red-900/40 bg-red-950/30 p-1.5 text-red-400 hover:bg-red-900/50"
                        title="Delete order"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* TAB 2: PRODUCTS & PRICING MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900/60 p-3 text-xs text-slate-300 border border-slate-800">
            {lang === 'tl'
              ? 'Maaari mong baguhin ang presyo (₱) at i-toggle kung In-Stock o Out-of-Stock ang bawat item.'
              : 'Edit Philippine Peso pricing or toggle stock status. Updates are saved immediately in localStorage.'}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-slate-800 bg-[#0c1630] p-4 flex gap-4 items-center justify-between"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {prod.name}
                  </h4>
                  <p className="text-xs font-black text-cyan-400 font-heading">
                    ₱{prod.price.toLocaleString()}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    prod.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {prod.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setEditingProduct(prod);
                      setNewPrice(prod.price);
                    }}
                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:text-white"
                  >
                    <Edit2 className="h-3 w-3 text-cyan-400" />
                    <span>Presyo</span>
                  </button>

                  <button
                    onClick={() => handleStockToggle(prod.id)}
                    className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white"
                  >
                    {prod.inStock ? 'Mark Out' : 'Mark In'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-500/40 bg-[#0c1630] p-6 shadow-2xl text-slate-100 space-y-4">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 rounded-xl border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="font-mono text-xs text-cyan-400 font-bold">{selectedOrder.orderNumber}</span>
              <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                Order Details • {selectedOrder.customerName}
              </h3>
            </div>

            <div className="rounded-xl bg-slate-900/80 p-3.5 space-y-2 text-xs text-slate-300 border border-slate-800">
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="text-white font-mono">{selectedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="text-white">{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="text-cyan-300 font-bold">{selectedOrder.productName} (x{selectedOrder.quantity})</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="text-cyan-400 font-bold font-heading text-sm">₱{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Preference:</span>
                <span className="text-white uppercase font-bold">{selectedOrder.paymentMethod}</span>
              </div>
              {selectedOrder.address.street && (
                <div className="border-t border-slate-800 pt-2">
                  <span className="text-slate-400 block mb-0.5">Shipping Address:</span>
                  <p className="text-white leading-relaxed">
                    {selectedOrder.address.street}, {selectedOrder.address.barangay}, {selectedOrder.address.city}, {selectedOrder.address.province} {selectedOrder.address.postalCode}
                  </p>
                </div>
              )}
              {selectedOrder.customPrintText && (
                <div className="border-t border-slate-800 pt-2">
                  <span className="text-slate-400 block mb-0.5">Custom Card Engraving:</span>
                  <p className="text-cyan-300 font-medium">&ldquo;{selectedOrder.customPrintText}&rdquo;</p>
                </div>
              )}
              {selectedOrder.notes && (
                <div className="border-t border-slate-800 pt-2">
                  <span className="text-slate-400 block mb-0.5">Customer Notes:</span>
                  <p className="text-slate-300 italic">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-cyan-500/40 bg-[#0c1630] p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="text-base font-bold text-white font-heading">
              Update Price (₱)
            </h3>
            <p className="text-xs text-slate-400">{editingProduct.name}</p>

            <div>
              <label className="block text-xs text-slate-300 mb-1">New Price (PHP):</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrice}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-slate-950"
              >
                Save Price
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
