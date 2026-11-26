import React, { useState, useEffect } from 'react';
import { 
  Calendar, Plus, Search, Filter, Eye, CheckCircle, 
  XCircle, LogIn, LogOut, Receipt, Clock, User, IndianRupee, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Bookings({ onOpenInvoice }) {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  // New Booking Form State
  const [formData, setFormData] = useState({
    guestId: '',
    roomId: '',
    checkInDate: new Date().toISOString().split('T')[0],
    checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 1,
    children: 0,
    specialRequests: '',
    paymentMethod: 'CASH',
    advancePaid: 0
  });

  const [calcTotal, setCalcTotal] = useState(0);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, roomsRes, guestsRes] = await Promise.all([
        api.get('/bookings?limit=100'),
        api.get('/rooms'),
        api.get('/guests?limit=100')
      ]);
      const bList = Array.isArray(bookingsRes.data) ? bookingsRes.data : (bookingsRes.data.bookings || bookingsRes.data.data || []);
      const rList = Array.isArray(roomsRes.data) ? roomsRes.data : (roomsRes.data.rooms || roomsRes.data.data || []);
      const gList = Array.isArray(guestsRes.data) ? guestsRes.data : (guestsRes.data.guests || guestsRes.data.data || []);
      setBookings(bList);
      setRooms(rList);
      setGuests(gList);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Calculate total automatically
  useEffect(() => {
    const selectedRoom = rooms.find(r => r.id === formData.roomId);
    if (selectedRoom && formData.checkInDate && formData.checkOutDate) {
      const d1 = new Date(formData.checkInDate);
      const d2 = new Date(formData.checkOutDate);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      const basePrice = selectedRoom.roomType?.basePrice || 2000;
      const subtotal = diffDays * basePrice;
      const tax = subtotal * 0.12; // 12% GST
      setCalcTotal(subtotal + tax);
    }
  }, [formData.roomId, formData.checkInDate, formData.checkOutDate, rooms]);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      const selectedRoom = rooms.find(r => r.id === formData.roomId);
      const ratePerNight = selectedRoom?.roomType?.basePrice || 2500;
      await api.post('/bookings', {
        ...formData,
        ratePerNight,
        totalAmount: calcTotal
      });
      toast.success('Reservation created successfully!');
      setShowModal(false);
      fetchInitialData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create reservation');
    }
  };

  const handleStatusUpdate = async (id, action) => {
    try {
      if (action === 'check-in') {
        await api.post(`/bookings/${id}/check-in`);
        toast.success('Guest successfully checked in!');
      } else if (action === 'check-out') {
        await api.post(`/bookings/${id}/check-out`);
        toast.success('Guest successfully checked out! Room marked for cleaning.');
      } else if (action === 'cancel') {
        if (!window.confirm('Cancel this reservation?')) return;
        await api.post(`/bookings/${id}/cancel`);
        toast.success('Reservation cancelled');
      }
      fetchInitialData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const filteredBookings = bookings.filter(b => {
    const guestName = `${b.guest?.firstName || ''} ${b.guest?.lastName || ''}`.toLowerCase();
    const matchesSearch = guestName.includes(searchTerm.toLowerCase()) ||
      (b.bookingNumber && b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((b.room?.number || b.room?.roomNumber) && (b.room?.number || b.room?.roomNumber).includes(searchTerm));
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED': return <span className="badge badge-info">Confirmed</span>;
      case 'CHECKED_IN': return <span className="badge badge-success">Checked In</span>;
      case 'CHECKED_OUT': return <span className="badge badge-secondary">Checked Out</span>;
      case 'CANCELLED': return <span className="badge badge-danger">Cancelled</span>;
      default: return <span className="badge badge-secondary">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reservations & Bookings</h1>
          <p className="text-muted text-sm">Create, manage, check-in, and check-out guest reservations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>New Reservation</span>
        </button>
      </div>

      <div className="card p-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="search-box max-w-md">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search booking #, guest name or room..."
            className="input-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className="input-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Reservation Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CHECKED_IN">Checked In</option>
          <option value="CHECKED_OUT">Checked Out</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="table">
          <thead>
            <tr>
              <th>Booking #</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Stay Dates</th>
              <th>Total / Paid</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-muted">No reservations found</td>
              </tr>
            ) : (
              filteredBookings.map(b => (
                <tr key={b.id}>
                  <td>
                    <span className="font-mono font-bold text-sm text-primary">{b.bookingNumber || `BK-${b.id.slice(0, 6)}`}</span>
                    <div className="text-xs text-muted">{new Date(b.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{b.guest?.firstName} {b.guest?.lastName}</div>
                    <div className="text-xs text-muted">{b.guest?.phone}</div>
                  </td>
                  <td>
                    <div className="font-bold">Room {b.room?.number || b.room?.roomNumber || '—'}</div>
                    <div className="text-xs text-muted">{b.room?.roomType?.name}</div>
                  </td>
                  <td>
                    <div className="text-xs font-semibold">{new Date(b.checkInDate).toLocaleDateString()} → {new Date(b.checkOutDate).toLocaleDateString()}</div>
                    <div className="text-xs text-muted">{b.adults} Adults {b.children > 0 ? `, ${b.children} Kids` : ''}</div>
                  </td>
                  <td>
                    <div className="font-bold text-primary">₹{b.totalAmount}</div>
                    <div className="text-xs text-muted">Paid: ₹{b.advancePaid || 0}</div>
                  </td>
                  <td>{getStatusBadge(b.status)}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {b.status === 'CONFIRMED' && (
                        <button 
                          className="btn btn-sm btn-outline text-success" 
                          title="Check-in guest"
                          onClick={() => handleStatusUpdate(b.id, 'check-in')}
                        >
                          <LogIn size={14} className="mr-1 inline" /> Check In
                        </button>
                      )}
                      {b.status === 'CHECKED_IN' && (
                        <button 
                          className="btn btn-sm btn-outline text-warning" 
                          title="Check-out guest"
                          onClick={() => handleStatusUpdate(b.id, 'check-out')}
                        >
                          <LogOut size={14} className="mr-1 inline" /> Check Out
                        </button>
                      )}
                      {b.status === 'CONFIRMED' && (
                        <button 
                          className="btn btn-icon btn-sm text-danger" 
                          title="Cancel Booking"
                          onClick={() => handleStatusUpdate(b.id, 'cancel')}
                        >
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New Booking Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Create New Reservation</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateBooking}>
              <div className="room-modal-body">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Select Guest *</label>
                    <select 
                      className="input"
                      required
                      value={formData.guestId}
                      onChange={e => setFormData({ ...formData, guestId: e.target.value })}
                    >
                      <option value="">-- Choose Guest --</option>
                      {guests.map(g => (
                        <option key={g.id} value={g.id}>{g.firstName} {g.lastName} ({g.phone})</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Select Room *</label>
                    <select 
                      className="input"
                      required
                      value={formData.roomId}
                      onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                    >
                      <option value="">-- Choose Room --</option>
                      {rooms.filter(r => r.status === 'AVAILABLE').map(r => (
                        <option key={r.id} value={r.id}>
                          Room {r.number || r.roomNumber} — {r.roomType?.name || 'Deluxe'} (₹{r.roomType?.basePrice || 2500}/night)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Check-in Date *</label>
                    <input 
                      type="date" 
                      className="input" 
                      required
                      value={formData.checkInDate}
                      onChange={e => setFormData({ ...formData, checkInDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date *</label>
                    <input 
                      type="date" 
                      className="input" 
                      required
                      value={formData.checkOutDate}
                      onChange={e => setFormData({ ...formData, checkOutDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Adults</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="1"
                      value={formData.adults}
                      onChange={e => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Children</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="0"
                      value={formData.children}
                      onChange={e => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Payment Method</label>
                    <select 
                      className="input"
                      value={formData.paymentMethod}
                      onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                      <option value="CASH">Cash</option>
                      <option value="UPI">UPI / QR Code</option>
                      <option value="CREDIT_CARD">Credit / Debit Card</option>
                      <option value="NET_BANKING">Net Banking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Advance Deposit (₹)</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="0"
                      value={formData.advancePaid}
                      onChange={e => setFormData({ ...formData, advancePaid: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary-light rounded-lg border border-primary flex justify-between items-center">
                  <div>
                    <span className="text-xs uppercase font-semibold text-primary">Estimated Total (Inc. 12% GST)</span>
                    <div className="text-2xl font-black text-primary">₹{calcTotal.toFixed(2)}</div>
                  </div>
                  <div className="text-right text-xs text-muted">
                    Balance Due: ₹{Math.max(0, calcTotal - (formData.advancePaid || 0)).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Reservation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
