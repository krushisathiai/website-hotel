import React, { useState, useEffect } from 'react';
import { 
  Receipt, Plus, Search, Filter, Printer, CreditCard, 
  IndianRupee, CheckCircle, Clock, AlertCircle, Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import InvoiceModal from './InvoiceModal';

export default function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  const [generateForm, setGenerateForm] = useState({
    bookingId: '',
    paymentMethod: 'CASH',
    discount: 0,
    serviceCharges: 0,
    notes: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [invoicesRes, bookingsRes] = await Promise.all([
        api.get('/billing/invoices'),
        api.get('/bookings')
      ]);
      setInvoices(invoicesRes.data.data || []);
      setBookings(bookingsRes.data.data || []);
    } catch (err) {
      toast.error('Failed to load billing records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    try {
      const selectedBooking = bookings.find(b => b.id === generateForm.bookingId);
      if (!selectedBooking) {
        toast.error('Please select a valid booking');
        return;
      }

      const subtotal = selectedBooking.totalAmount || 3000;
      const tax = (subtotal + Number(generateForm.serviceCharges) - Number(generateForm.discount)) * 0.12;
      const totalAmount = subtotal + Number(generateForm.serviceCharges) - Number(generateForm.discount) + tax;

      const res = await api.post('/billing/invoices', {
        bookingId: generateForm.bookingId,
        subtotal,
        tax,
        discount: Number(generateForm.discount),
        serviceCharges: Number(generateForm.serviceCharges),
        totalAmount,
        paymentMethod: generateForm.paymentMethod,
        status: 'PAID',
        notes: generateForm.notes
      });

      toast.success('Invoice generated successfully!');
      setShowGenerateModal(false);
      fetchData();
      if (res.data?.data) {
        setSelectedInvoice(res.data.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate invoice');
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const guestName = `${inv.booking?.guest?.firstName || ''} ${inv.booking?.guest?.lastName || ''}`.toLowerCase();
    const invNum = (inv.invoiceNumber || inv.id || '').toLowerCase();
    return guestName.includes(searchTerm.toLowerCase()) || invNum.includes(searchTerm.toLowerCase());
  });

  const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalTax = invoices.reduce((acc, curr) => acc + (curr.tax || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Receipt className="text-primary" /> Billing & Invoices
          </h1>
          <p className="text-muted text-sm">Generate GST compliant invoices, process transactions, and print receipts</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowGenerateModal(true)}>
          <Plus size={18} />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Revenue Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <span className="text-xs text-muted uppercase font-bold">Total Invoiced Amount</span>
          <div className="text-2xl font-black text-primary mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <span className="text-xs text-muted">All settled invoices</span>
        </div>
        <div className="card">
          <span className="text-xs text-muted uppercase font-bold">Total Tax (GST Collected)</span>
          <div className="text-2xl font-black text-warning mt-1">₹{totalTax.toLocaleString('en-IN')}</div>
          <span className="text-xs text-muted">12% GST compliant</span>
        </div>
        <div className="card">
          <span className="text-xs text-muted uppercase font-bold">Invoices Count</span>
          <div className="text-2xl font-black text-success mt-1">{invoices.length}</div>
          <span className="text-xs text-muted">Generated bills</span>
        </div>
      </div>

      <div className="card p-4">
        <div className="search-box max-w-md">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search invoice number, guest name..."
            className="input-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="spinner"></div></div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Date</th>
                <th>Payment Mode</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-muted">No invoices generated yet</td>
                </tr>
              ) : (
                filteredInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td>
                      <span className="font-mono font-bold text-sm text-primary">
                        INV-{inv.invoiceNumber || inv.id.slice(0, 8)}
                      </span>
                    </td>
                    <td>
                      <div className="font-semibold">
                        {inv.booking?.guest?.firstName} {inv.booking?.guest?.lastName}
                      </div>
                      <div className="text-xs text-muted">{inv.booking?.guest?.phone}</div>
                    </td>
                    <td>Room #{inv.booking?.room?.roomNumber}</td>
                    <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className="badge badge-secondary">{inv.paymentMethod || 'CASH'}</span>
                    </td>
                    <td>
                      <span className="font-black text-base text-primary">₹{inv.totalAmount}</span>
                    </td>
                    <td>
                      <span className="badge badge-success">
                        <CheckCircle size={12} className="mr-1 inline" /> {inv.status || 'PAID'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedInvoice(inv)}
                      >
                        <Printer size={14} className="mr-1 inline" /> View & Print
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Generate Invoice Modal */}
      {showGenerateModal && (
        <div className="room-modal-backdrop" onClick={() => setShowGenerateModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Generate Guest Invoice</h2>
              <button className="btn-icon" onClick={() => setShowGenerateModal(false)}>✕</button>
            </div>
            <form onSubmit={handleGenerateInvoice}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Select Active / Recent Booking *</label>
                  <select 
                    className="input"
                    required
                    value={generateForm.bookingId}
                    onChange={e => setGenerateForm({ ...generateForm, bookingId: e.target.value })}
                  >
                    <option value="">-- Choose Reservation --</option>
                    {bookings.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.guest?.firstName} {b.guest?.lastName} — Room {b.room?.roomNumber} ({b.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <select 
                      className="input"
                      value={generateForm.paymentMethod}
                      onChange={e => setGenerateForm({ ...generateForm, paymentMethod: e.target.value })}
                    >
                      <option value="CASH">Cash</option>
                      <option value="UPI">UPI / QR Code</option>
                      <option value="CREDIT_CARD">Credit / Debit Card</option>
                      <option value="NET_BANKING">Net Banking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Extra Service Charges (₹)</label>
                    <input 
                      type="number" 
                      className="input"
                      min="0"
                      value={generateForm.serviceCharges}
                      onChange={e => setGenerateForm({ ...generateForm, serviceCharges: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Discount (₹)</label>
                    <input 
                      type="number" 
                      className="input"
                      min="0"
                      value={generateForm.discount}
                      onChange={e => setGenerateForm({ ...generateForm, discount: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tax Rate</label>
                    <input 
                      type="text" 
                      className="input" 
                      disabled 
                      value="12% GST (6% CGST + 6% SGST)"
                    />
                  </div>
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowGenerateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create & View Bill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal for Printing */}
      {selectedInvoice && (
        <InvoiceModal 
          invoice={selectedInvoice} 
          onClose={() => setSelectedInvoice(null)} 
        />
      )}
    </div>
  );
}
