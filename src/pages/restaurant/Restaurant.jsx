import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Plus, Search, ShoppingCart, IndianRupee, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Restaurant() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'FOOD',
    price: '',
    description: ''
  });

  const [orderForm, setOrderForm] = useState({
    bookingId: '',
    quantity: 1
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [menuRes, bookingsRes] = await Promise.all([
        api.get('/restaurant/menu'),
        api.get('/bookings?limit=100')
      ]);
      const categories = Array.isArray(menuRes.data) ? menuRes.data : [];
      const allItems = [];
      categories.forEach(c => {
        (c.items || []).forEach(item => {
          allItems.push({ ...item, category: c.name });
        });
      });
      setServices(allItems);

      const bList = Array.isArray(bookingsRes.data)
        ? bookingsRes.data
        : (bookingsRes.data.bookings || bookingsRes.data.data || []);
      setBookings(bList.filter(b => ['CONFIRMED', 'CHECKED_IN'].includes(b.status)));
    } catch (err) {
      toast.error('Failed to load menu & services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', {
        ...formData,
        price: parseFloat(formData.price)
      });
      toast.success('Menu item added!');
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  const handleChargeToRoom = async (e) => {
    e.preventDefault();
    if (!orderForm.bookingId) {
      toast.error('Select an in-house guest room');
      return;
    }

    try {
      const selectedBooking = bookings.find(b => b.id === orderForm.bookingId);
      const roomNum = selectedBooking?.room?.number || selectedBooking?.room?.roomNumber || 'Walk-in';
      const guestName = `${selectedBooking?.guest?.firstName || ''} ${selectedBooking?.guest?.lastName || ''}`.trim() || 'Guest';

      await api.post('/restaurant/orders', {
        bookingId: orderForm.bookingId,
        roomNumber: String(roomNum),
        guestName,
        items: [
          { itemId: selectedService.id, quantity: Number(orderForm.quantity) || 1 }
        ]
      });

      toast.success(`Ordered ${orderForm.quantity}x ${selectedService.name}! Added to live kitchen ticket & room bill.`);
      setShowOrderModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send food order');
    }
  };

  const openOrder = (item) => {
    setSelectedService(item);
    setShowOrderModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UtensilsCrossed className="text-primary" /> Dining, Room Service & POS
          </h1>
          <p className="text-muted text-sm">Manage restaurant menu items, bar orders, spa, and post charges to guest folio</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Add Menu / Service Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map(item => (
          <div key={item.id} className="card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base">{item.name}</h3>
                <span className="badge badge-secondary text-xs">{item.category}</span>
              </div>
              <p className="text-xs text-muted mb-4">{item.description || 'Delicious culinary offering freshly prepared.'}</p>
            </div>

            <div>
              <div className="text-xl font-black text-primary mb-3">₹{item.price}</div>
              <button 
                className="btn btn-outline btn-sm w-full"
                onClick={() => openOrder(item)}
              >
                <ShoppingCart size={14} className="mr-1 inline" /> Order / Charge to Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Add Menu / Service Item</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateService}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Item / Service Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    required 
                    placeholder="e.g. Royal Butter Chicken, Laundry, Airport Cab"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="input"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="FOOD">Food & Dining</option>
                      <option value="BEVERAGE">Beverages & Bar</option>
                      <option value="SPA">Spa & Wellness</option>
                      <option value="LAUNDRY">Laundry Service</option>
                      <option value="TRANSPORT">Cab / Transport</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Price (₹) *</label>
                    <input 
                      type="number" 
                      className="input" 
                      required 
                      min="0"
                      placeholder="e.g. 450"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="input" 
                    rows="2"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order to Room Modal */}
      {showOrderModal && selectedService && (
        <div className="room-modal-backdrop" onClick={() => setShowOrderModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Charge to Room — {selectedService.name}</h2>
              <button className="btn-icon" onClick={() => setShowOrderModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleChargeToRoom}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Select In-House Room *</label>
                  <select 
                    className="input"
                    required
                    value={orderForm.bookingId}
                    onChange={e => setOrderForm({ ...orderForm, bookingId: e.target.value })}
                  >
                    <option value="">-- Choose Staying Guest Room --</option>
                    {bookings.map(b => (
                      <option key={b.id} value={b.id}>
                        Room #{b.room?.roomNumber} — {b.guest?.firstName} {b.guest?.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input 
                    type="number" 
                    className="input" 
                    min="1"
                    value={orderForm.quantity}
                    onChange={e => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="p-3 bg-surface-hover rounded-lg flex justify-between font-bold">
                  <span>Total Amount to be added to Bill:</span>
                  <span className="text-primary font-black">₹{selectedService.price * orderForm.quantity}</span>
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowOrderModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Post to Room Folio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
