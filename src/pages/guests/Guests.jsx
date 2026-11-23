import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Mail, Phone, MapPin, Edit, Trash2, X, History, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [selectedGuestHistory, setSelectedGuestHistory] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'AADHAAR',
    idNumber: '',
    address: '',
    nationality: 'Indian',
    vipStatus: false,
    specialRequests: ''
  });

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/guests');
      setGuests(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load guests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleOpenModal = (guest = null) => {
    if (guest) {
      setEditingGuest(guest);
      setFormData({
        firstName: guest.firstName,
        lastName: guest.lastName,
        email: guest.email || '',
        phone: guest.phone,
        idType: guest.idType || 'AADHAAR',
        idNumber: guest.idNumber || '',
        address: guest.address || '',
        nationality: guest.nationality || 'Indian',
        vipStatus: guest.vipStatus || false,
        specialRequests: guest.specialRequests || ''
      });
    } else {
      setEditingGuest(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        idType: 'AADHAAR',
        idNumber: '',
        address: '',
        nationality: 'Indian',
        vipStatus: false,
        specialRequests: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGuest) {
        await api.put(`/guests/${editingGuest.id}`, formData);
        toast.success('Guest details updated');
      } else {
        await api.post('/guests', formData);
        toast.success('Guest added successfully');
      }
      setShowModal(false);
      fetchGuests();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this guest record?')) return;
    try {
      await api.delete(`/guests/${id}`);
      toast.success('Guest removed');
      fetchGuests();
    } catch (err) {
      toast.error('Failed to delete guest');
    }
  };

  const viewHistory = async (guest) => {
    try {
      const res = await api.get(`/guests/${guest.id}`);
      setSelectedGuestHistory(res.data.data);
    } catch (err) {
      toast.error('Failed to load guest history');
    }
  };

  const filteredGuests = guests.filter(g => 
    `${g.firstName} ${g.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone.includes(searchTerm) ||
    (g.email && g.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Guest Directory</h1>
          <p className="text-muted text-sm">Manage guest profiles, loyalty VIP status, and booking history</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          <span>Register New Guest</span>
        </button>
      </div>

      <div className="card p-4">
        <div className="search-box max-w-md">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by name, phone or email..."
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
                <th>Guest Name</th>
                <th>Contact</th>
                <th>Identity Proof</th>
                <th>VIP Status</th>
                <th>Total Stays</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-muted">No guests found</td>
                </tr>
              ) : (
                filteredGuests.map(guest => (
                  <tr key={guest.id}>
                    <td>
                      <div className="font-semibold text-base">{guest.firstName} {guest.lastName}</div>
                      <div className="text-xs text-muted">{guest.nationality || 'Indian'}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-sm"><Phone size={13} className="text-muted" /> {guest.phone}</div>
                      {guest.email && <div className="flex items-center gap-1 text-xs text-muted"><Mail size={13} /> {guest.email}</div>}
                    </td>
                    <td>
                      <span className="badge badge-secondary">{guest.idType || 'Gov ID'}</span>
                      <div className="text-xs font-mono text-muted mt-0.5">{guest.idNumber || '—'}</div>
                    </td>
                    <td>
                      {guest.vipStatus ? (
                        <span className="badge badge-warning flex items-center gap-1 w-max">
                          <Award size={12} /> VIP Guest
                        </span>
                      ) : (
                        <span className="badge badge-secondary">Regular</span>
                      )}
                    </td>
                    <td>
                      <span className="font-semibold">{guest.bookings?.length || 0}</span> bookings
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="btn btn-icon btn-sm" title="View Booking History" onClick={() => viewHistory(guest)}>
                          <History size={14} />
                        </button>
                        <button className="btn btn-icon btn-sm" title="Edit Guest" onClick={() => handleOpenModal(guest)}>
                          <Edit size={14} />
                        </button>
                        <button className="btn btn-icon btn-sm text-danger" title="Delete Guest" onClick={() => handleDelete(guest.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Guest Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">{editingGuest ? 'Edit Guest Details' : 'Register Guest'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="room-modal-body">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input 
                      type="text" 
                      className="input" 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input 
                      type="text" 
                      className="input" 
                      required 
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="input" 
                      required 
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="input" 
                      placeholder="guest@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">ID Proof Type</label>
                    <select 
                      className="input"
                      value={formData.idType}
                      onChange={e => setFormData({ ...formData, idType: e.target.value })}
                    >
                      <option value="AADHAAR">Aadhaar Card</option>
                      <option value="PASSPORT">Passport</option>
                      <option value="DRIVING_LICENSE">Driving License</option>
                      <option value="VOTER_ID">Voter ID</option>
                      <option value="PAN_CARD">PAN Card</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">ID Proof Number</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="XXXX-XXXX-XXXX"
                      value={formData.idNumber}
                      onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address / City</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="City, State, Country"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="vip"
                    checked={formData.vipStatus}
                    onChange={e => setFormData({ ...formData, vipStatus: e.target.checked })}
                  />
                  <label htmlFor="vip" className="text-sm font-semibold cursor-pointer">Mark as VIP Guest</label>
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingGuest ? 'Update Details' : 'Register'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Guest History Modal */}
      {selectedGuestHistory && (
        <div className="room-modal-backdrop" onClick={() => setSelectedGuestHistory(null)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Booking History — {selectedGuestHistory.firstName} {selectedGuestHistory.lastName}</h2>
              <button className="btn-icon" onClick={() => setSelectedGuestHistory(null)}><X size={20} /></button>
            </div>
            <div className="room-modal-body">
              {selectedGuestHistory.bookings?.length === 0 ? (
                <p className="text-muted text-center py-4">No past bookings for this guest.</p>
              ) : (
                <div className="space-y-3">
                  {selectedGuestHistory.bookings?.map(b => (
                    <div key={b.id} className="p-3 border border-border rounded-lg bg-surface-hover flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Room {b.room?.roomNumber} ({b.room?.roomType?.name})</div>
                        <div className="text-xs text-muted">
                          {new Date(b.checkInDate).toLocaleDateString()} — {new Date(b.checkOutDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`badge ${b.status === 'CHECKED_IN' ? 'badge-success' : 'badge-secondary'}`}>{b.status}</span>
                        <div className="text-sm font-bold text-primary mt-1">₹{b.totalAmount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
