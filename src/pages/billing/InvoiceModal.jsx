import React from 'react';
import { Printer, X, CheckCircle, IndianRupee, Hotel, Download } from 'lucide-react';
import './InvoiceModal.css';

export default function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const booking = invoice.booking || {};
  const guest = booking.guest || invoice.guest || {};
  const room = booking.room || {};

  return (
    <div className="room-modal-backdrop invoice-modal-backdrop" onClick={onClose}>
      <div className="invoice-container" onClick={e => e.stopPropagation()}>
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="invoice-actions-bar no-print">
          <div className="flex items-center gap-2">
            <span className="badge badge-success font-semibold">Ready for Billing</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Print Tax Invoice
            </button>
            <button className="btn-icon" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Actual Printable Invoice Document */}
        <div className="invoice-sheet" id="printable-invoice">
          {/* Header */}
          <div className="invoice-header">
            <div className="hotel-info">
              <div className="flex items-center gap-2 text-primary font-bold text-2xl">
                <Hotel size={28} /> Grand Palace Luxury Resort
              </div>
              <p className="text-xs text-muted mt-1">
                Plot 42, Marine Drive, Hospitality Boulevard<br />
                Mumbai, Maharashtra, India - 400020<br />
                GSTIN: 27AABCG1234F1Z9 | Phone: +91 22 2847 9000
              </p>
            </div>
            <div className="invoice-meta text-right">
              <h1 className="text-xl font-bold uppercase tracking-wider text-primary">TAX INVOICE</h1>
              <div className="text-sm font-mono font-bold mt-1">INV-{invoice.invoiceNumber || invoice.id?.slice(0, 8)}</div>
              <div className="text-xs text-muted mt-1">Date: {new Date(invoice.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              <div className="text-xs font-semibold mt-1">Status: <span className="text-success uppercase">{invoice.status || 'PAID'}</span></div>
            </div>
          </div>

          <hr className="divider my-4" />

          {/* Guest & Reservation Details */}
          <div className="grid grid-cols-2 gap-6 my-4 text-sm">
            <div className="billed-to bg-surface-hover p-3 rounded-md">
              <div className="text-xs font-bold text-muted uppercase mb-1">BILLED TO (GUEST)</div>
              <div className="font-bold text-base">{guest.firstName} {guest.lastName}</div>
              <div className="text-muted text-xs">Phone: {guest.phone || '—'}</div>
              <div className="text-muted text-xs">Email: {guest.email || '—'}</div>
              <div className="text-muted text-xs">ID Proof: {guest.idType} ({guest.idNumber || '—'})</div>
            </div>

            <div className="stay-details bg-surface-hover p-3 rounded-md">
              <div className="text-xs font-bold text-muted uppercase mb-1">RESERVATION DETAILS</div>
              <div className="font-bold">Room #{room.roomNumber} — {room.roomType?.name || 'Deluxe Room'}</div>
              <div className="text-xs text-muted">Check-In: {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : '—'}</div>
              <div className="text-xs text-muted">Check-Out: {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : '—'}</div>
              <div className="text-xs text-muted">Payment Mode: {invoice.paymentMethod || 'UPI / Cash'}</div>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="invoice-table w-full text-sm my-4">
            <thead>
              <tr className="border-b-2 border-border text-left">
                <th className="py-2">Description</th>
                <th className="py-2 text-center">Qty / Nights</th>
                <th className="py-2 text-right">Unit Rate (₹)</th>
                <th className="py-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3">
                  <div className="font-semibold">Room Accommodation Charges</div>
                  <div className="text-xs text-muted">Room #{room.roomNumber} ({room.roomType?.name})</div>
                </td>
                <td className="py-3 text-center">{invoice.nights || 1} Nights</td>
                <td className="py-3 text-right">₹{invoice.roomRate || invoice.subtotal || 3500}</td>
                <td className="py-3 text-right font-medium">₹{invoice.subtotal || 3500}</td>
              </tr>
              {invoice.serviceCharges > 0 && (
                <tr className="border-b border-border">
                  <td className="py-2">Restaurant & Additional Services</td>
                  <td className="py-2 text-center">1</td>
                  <td className="py-2 text-right">₹{invoice.serviceCharges}</td>
                  <td className="py-2 text-right font-medium">₹{invoice.serviceCharges}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Tax & Total Summary */}
          <div className="flex justify-end my-4">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal:</span>
                <span>₹{(invoice.subtotal || 3500).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>CGST (6%):</span>
                <span>₹{((invoice.tax || 420) / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>SGST (6%):</span>
                <span>₹{((invoice.tax || 420) / 2).toFixed(2)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount:</span>
                  <span>- ₹{invoice.discount.toFixed(2)}</span>
                </div>
              )}
              <hr className="divider" />
              <div className="flex justify-between font-black text-lg text-primary">
                <span>Total Payable:</span>
                <span>₹{(invoice.totalAmount || 3920).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="invoice-footer-terms mt-8 pt-4 border-t border-border text-xs text-muted">
            <p className="font-semibold text-text mb-1">Terms & Conditions:</p>
            <p>1. Check-out time is 11:00 AM. Late check-out is subject to room availability.</p>
            <p>2. This is a computer-generated invoice and requires no physical signature.</p>
            <p className="mt-3 text-center italic font-semibold text-primary">Thank you for choosing Grand Palace Luxury Resort! We hope to welcome you again.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
