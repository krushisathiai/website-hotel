import React, { useState, useEffect } from 'react';
import { 
  Receipt, Plus, Search, Filter, Printer, CreditCard, 
  IndianRupee, CheckCircle2, Clock, AlertCircle, Download,
  UtensilsCrossed, BedDouble, Calendar, Sparkles, ArrowRight,
  ShieldCheck, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import InvoiceModal from './InvoiceModal';

export default function Billing() {
  const [activeTab, setActiveTab] = useState('CHECKOUT'); // 'CHECKOUT' or 'INVOICES'
  const [invoices, setInvoices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Unified Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [checkoutPreview, setCheckoutPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    paymentMethod: 'UPI',
    discount: 0,
    notes: 'Paid at frontdesk checkout',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [invoicesRes, bookingsRes] = await Promise.all([
        api.get('/billing/invoices'),
        api.get('/bookings?limit=100'),
      ]);

      const invList = Array.isArray(invoicesRes.data)
        ? invoicesRes.data
        : (invoicesRes.data.invoices || invoicesRes.data.data || []);

      const bkgList = Array.isArray(bookingsRes.data)
        ? bookingsRes.data
        : (bookingsRes.data.bookings || bookingsRes.data.data || []);

      setInvoices(invList);
      setBookings(bkgList);
    } catch (err) {
      toast.error('Failed to load billing records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open Checkout Modal & fetch real-time bill aggregation (Room + Restaurant Food)
  const openCheckout = async (bookingId) => {
    setSelectedBookingId(bookingId);
    setCheckoutModalOpen(true);
    setPreviewLoading(true);
    try {
      const res = await api.get(`/billing/checkout/${bookingId}`);
      setCheckoutPreview(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not fetch checkout preview');
      setCheckoutModalOpen(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  // Submit Checkout & Payment
  const handleProcessCheckout = async (e) => {
    e.preventDefault();
    if (!selectedBookingId) return;

    try {
      setCheckoutSubmitting(true);
      const res = await api.post('/billing/checkout/pay', {
        bookingId: selectedBookingId,
        paymentMethod: checkoutForm.paymentMethod,
        discount: Number(checkoutForm.discount) || 0,
        notes: checkoutForm.notes,
      });

      toast.success('Checkout completed! Unified invoice generated.');
      setCheckoutModalOpen(false);
      setCheckoutPreview(null);
      await fetchData();

      if (res.data) {
        setSelectedInvoice(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout payment processing failed');
    } finally {
      setCheckoutSubmitting(false);
    }
  };

  // Filter active stays vs checked-out
  const activeBookings = bookings.filter(b => ['CONFIRMED', 'CHECKED_IN'].includes(b.status));

  const filteredInvoices = invoices.filter(inv => {
    const guestName = `${inv.booking?.guest?.firstName || ''} ${inv.booking?.guest?.lastName || ''}`.toLowerCase();
    const invNum = (inv.invoiceNumber || inv.id || '').toLowerCase();
    const roomNum = (inv.booking?.room?.number || inv.booking?.room?.roomNumber || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return guestName.includes(query) || invNum.includes(query) || roomNum.includes(query);
  });

  const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalTax = invoices.reduce((acc, curr) => acc + (curr.tax || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Receipt className="text-primary" /> Unified Billing & Checkouts
          </h1>
          <p className="text-muted text-sm">
            Aggregate Room Nights + In-Room Dining Food Orders into a 1-click GST Tax Invoice
          </p>
        </div>
        <button className="btn btn-secondary flex items-center gap-2" onClick={fetchData} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Revenue Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <span className="text-xs text-muted uppercase font-bold">Total Invoiced Revenue</span>
          <div className="text-2xl font-black text-primary mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <span className="text-xs text-muted">All settled stay & dining charges</span>
        </div>
        <div className="card">
          <span className="text-xs text-muted uppercase font-bold">GST Tax Collected (18%)</span>
          <div className="text-2xl font-black text-warning mt-1">₹{totalTax.toLocaleString('en-IN')}</div>
          <span className="text-xs text-muted">9% CGST + 9% SGST Compliant</span>
        </div>
        <div className="card">
          <span className="text-xs text-muted uppercase font-bold">Active Guests in House</span>
          <div className="text-2xl font-black text-success mt-1">{activeBookings.length}</div>
          <span className="text-xs text-muted">Awaiting final checkout & bill settlement</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border gap-4">
        <button
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'CHECKOUT'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          }`}
          onClick={() => setActiveTab('CHECKOUT')}
        >
          <BedDouble size={18} />
          Active Stays & Checkout Queue ({activeBookings.length})
        </button>
        <button
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'INVOICES'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-text'
          }`}
          onClick={() => setActiveTab('INVOICES')}
        >
          <Receipt size={18} />
          Settled Invoices & Receipts ({invoices.length})
        </button>
      </div>

      {/* TAB 1: ACTIVE CHECKOUT QUEUE */}
      {activeTab === 'CHECKOUT' && (
        <div className="card p-0 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center p-12"><div className="spinner"></div></div>
          ) : activeBookings.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <CheckCircle2 size={40} className="mx-auto text-success mb-2" />
              <div className="font-bold">No pending checkouts</div>
              <p className="text-xs mt-1">All current guests have settled their room stays and dining bills.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Booking #</th>
                  <th>Guest Name</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Nightly Rate</th>
                  <th>Current Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeBookings.map(b => (
                  <tr key={b.id}>
                    <td>
                      <span className="font-mono font-bold text-primary">{b.bookingNumber}</span>
                    </td>
                    <td>
                      <div className="font-semibold">{b.guest?.firstName} {b.guest?.lastName}</div>
                      <div className="text-xs text-muted">{b.guest?.phone}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary font-bold">
                        Room #{b.room?.number || b.room?.roomNumber || '—'}
                      </span>
                    </td>
                    <td className="text-xs">
                      <div>In: {new Date(b.checkInDate).toLocaleDateString()}</div>
                      <div className="text-muted">Out: {new Date(b.checkOutDate).toLocaleDateString()}</div>
                    </td>
                    <td className="font-bold">₹{b.ratePerNight?.toLocaleString('en-IN')}</td>
                    <td>
                      <span className="badge badge-success">{b.status}</span>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-primary btn-sm flex items-center gap-1 ml-auto"
                        onClick={() => openCheckout(b.id)}
                      >
                        <Receipt size={14} /> Checkout & Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB 2: SETTLED INVOICES */}
      {activeTab === 'INVOICES' && (
        <div className="space-y-4">
          <div className="card p-4">
            <div className="search-box max-w-md">
              <Search size={18} className="text-muted" />
              <input 
                type="text" 
                placeholder="Search invoice number, guest name, room #..."
                className="input-search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card p-0 overflow-x-auto">
            {loading ? (
              <div className="flex justify-center p-12"><div className="spinner"></div></div>
            ) : filteredInvoices.length === 0 ? (
              <div className="text-center py-12 text-muted">No settled invoices match your filter</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Payment Mode</th>
                    <th>Total Amount (₹)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map(inv => (
                    <tr key={inv.id}>
                      <td>
                        <span className="font-mono font-bold text-sm text-primary">
                          INV-{inv.invoiceNumber || inv.id?.slice(0, 8)}
                        </span>
                      </td>
                      <td>
                        <div className="font-semibold">
                          {inv.booking?.guest?.firstName} {inv.booking?.guest?.lastName}
                        </div>
                        <div className="text-xs text-muted">{inv.booking?.guest?.phone}</div>
                      </td>
                      <td>Room #{inv.booking?.room?.number || inv.booking?.room?.roomNumber || '—'}</td>
                      <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className="badge badge-secondary">{inv.paymentMethod || 'UPI'}</span>
                      </td>
                      <td>
                        <span className="font-black text-base text-primary">₹{inv.totalAmount?.toLocaleString('en-IN')}</span>
                      </td>
                      <td>
                        <span className="badge badge-success">
                          <CheckCircle2 size={12} className="mr-1 inline" /> {inv.status || 'PAID'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-secondary flex items-center gap-1"
                          onClick={() => setSelectedInvoice(inv)}
                        >
                          <Printer size={14} /> View & Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* UNIFIED CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div className="room-modal-backdrop" onClick={() => !checkoutSubmitting && setCheckoutModalOpen(false)}>
          <div className="room-modal max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Receipt className="text-primary" /> Settle Bill & Complete Checkout
              </h2>
              <button 
                className="btn-icon" 
                onClick={() => setCheckoutModalOpen(false)}
                disabled={checkoutSubmitting}
              >
                ✕
              </button>
            </div>

            {previewLoading || !checkoutPreview ? (
              <div className="p-12 flex justify-center"><div className="spinner"></div></div>
            ) : (
              <form onSubmit={handleProcessCheckout}>
                <div className="room-modal-body space-y-4">
                  {/* Guest Info Bar */}
                  <div className="bg-surface-hover p-3 rounded-md flex justify-between items-center text-sm">
                    <div>
                      <div className="font-bold text-base">
                        {checkoutPreview.booking?.guest?.firstName} {checkoutPreview.booking?.guest?.lastName}
                      </div>
                      <div className="text-muted text-xs">
                        Room #{checkoutPreview.booking?.room?.number || checkoutPreview.booking?.room?.roomNumber} • {checkoutPreview.booking?.room?.roomType?.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-muted">Booking #{checkoutPreview.booking?.bookingNumber}</div>
                      <span className="badge badge-primary">{checkoutPreview.nights} Nights Stay</span>
                    </div>
                  </div>

                  {/* Itemized Line Items Breakdown */}
                  <div className="border border-border rounded-md overflow-hidden text-sm">
                    <div className="bg-bg-secondary p-2.5 font-bold text-xs uppercase text-muted tracking-wider">
                      Charges Breakdown (Stay + Restaurant Dining)
                    </div>

                    {/* Room Nights Charge */}
                    <div className="p-3 border-b border-border flex justify-between items-center">
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          <BedDouble size={16} className="text-primary" />
                          Room Accommodation ({checkoutPreview.nights} nights @ ₹{checkoutPreview.booking?.ratePerNight}/night)
                        </div>
                      </div>
                      <span className="font-bold">₹{checkoutPreview.roomCharges?.toLocaleString('en-IN')}</span>
                    </div>

                    {/* Restaurant Food Orders */}
                    {checkoutPreview.foodOrders && checkoutPreview.foodOrders.length > 0 ? (
                      <div className="p-3 border-b border-border space-y-2 bg-surface">
                        <div className="flex justify-between font-semibold items-center">
                          <span className="flex items-center gap-2 text-warning">
                            <UtensilsCrossed size={16} />
                            In-Room Dining Food Orders ({checkoutPreview.foodOrders.length} orders)
                          </span>
                          <span className="font-bold text-warning">₹{checkoutPreview.foodCharges?.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pl-6 space-y-1 text-xs text-muted">
                          {checkoutPreview.foodOrders.map(fo => (
                            <div key={fo.id} className="flex justify-between py-0.5">
                              <span>
                                {fo.orderNumber}: {fo.items?.map(i => `${i.quantity}x ${i.item?.name}`).join(', ')}
                              </span>
                              <span>₹{fo.total}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 text-xs text-muted pl-4 italic border-b border-border">
                        No restaurant food orders billed to room.
                      </div>
                    )}

                    {/* Tax & Net Total */}
                    <div className="p-3 bg-bg-secondary space-y-1.5 text-sm">
                      <div className="flex justify-between text-muted">
                        <span>Subtotal:</span>
                        <span>₹{checkoutPreview.subtotal?.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>18% GST (9% CGST + 9% SGST):</span>
                        <span>₹{checkoutPreview.taxAmount?.toLocaleString('en-IN')}</span>
                      </div>
                      {checkoutPreview.alreadyPaid > 0 && (
                        <div className="flex justify-between text-success font-medium">
                          <span>Advance Deposit Paid:</span>
                          <span>- ₹{checkoutPreview.alreadyPaid?.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-black text-lg text-primary pt-2 border-t border-border">
                        <span>Net Due Amount:</span>
                        <span>
                          ₹{Math.max(0, (checkoutPreview.dueAmount || checkoutPreview.totalAmount) - (Number(checkoutForm.discount) || 0)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label font-bold">Settlement Payment Method *</label>
                      <select 
                        className="input"
                        value={checkoutForm.paymentMethod}
                        onChange={e => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                      >
                        <option value="UPI">UPI / QR Code Scan</option>
                        <option value="CASH">Cash at Frontdesk</option>
                        <option value="CREDIT_CARD">Credit / Debit Card</option>
                        <option value="NET_BANKING">Net Banking Transfer</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Discount / Courtesy Waiver (₹)</label>
                      <input 
                        type="number"
                        className="input"
                        min="0"
                        max={checkoutPreview.dueAmount || checkoutPreview.totalAmount}
                        value={checkoutForm.discount}
                        onChange={e => setCheckoutForm({ ...checkoutForm, discount: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="room-modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setCheckoutModalOpen(false)}
                    disabled={checkoutSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary flex items-center gap-2"
                    disabled={checkoutSubmitting}
                  >
                    <ShieldCheck size={18} />
                    {checkoutSubmitting ? 'Processing...' : 'Collect Payment & Settle Checkout'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Invoice View / Print Modal */}
      {selectedInvoice && (
        <InvoiceModal 
          invoice={selectedInvoice} 
          onClose={() => setSelectedInvoice(null)} 
        />
      )}
    </div>
  );
}
