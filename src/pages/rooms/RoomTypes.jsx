import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X, Check, Users, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function RoomTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    capacity: 2,
    amenities: 'Wi-Fi, AC, Smart TV, Mini Bar, Room Service'
  });

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/room-types');
      setTypes(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load room types');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleOpenModal = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData({
        name: type.name,
        description: type.description || '',
        basePrice: type.basePrice,
        capacity: type.capacity || 2,
        amenities: Array.isArray(type.amenities) ? type.amenities.join(', ') : (type.amenities || '')
      });
    } else {
      setEditingType(null);
      setFormData({
        name: '',
        description: '',
        basePrice: '',
        capacity: 2,
        amenities: 'Wi-Fi, AC, Smart TV, Mini Bar, Room Service'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice),
        capacity: parseInt(formData.capacity) || 2,
        amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingType) {
        await api.put(`/room-types/${editingType.id}`, payload);
        toast.success('Room type updated');
      } else {
        await api.post('/room-types', payload);
        toast.success('Room type created');
      }
      setShowModal(false);
      fetchTypes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room type?')) return;
    try {
      await api.delete(`/room-types/${id}`);
      toast.success('Room type deleted');
      fetchTypes();
    } catch (err) {
      toast.error('Failed to delete room type');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Room Types & Categories</h1>
          <p className="text-muted text-sm">Configure suite categories, base pricing, capacities, and amenities</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          <span>Add Room Type</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="spinner"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map(type => (
            <div key={type.id} className="card flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{type.name}</h3>
                  <span className="badge badge-primary">
                    <Users size={12} className="mr-1 inline" /> {type.capacity} Max Guests
                  </span>
                </div>
                <p className="text-sm text-muted mb-4">{type.description || 'Premium hotel room category with full luxury amenities.'}</p>
                
                <div className="mb-4">
                  <span className="text-2xl font-black text-primary">₹{type.basePrice}</span>
                  <span className="text-xs text-muted"> / night</span>
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">Amenities:</span>
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(type.amenities) ? type.amenities : (type.amenities || '').split(',')).map((amenity, idx) => (
                      <span key={idx} className="badge badge-secondary text-xs">
                        <Check size={10} className="mr-1 inline text-success" /> {amenity.trim ? amenity.trim() : amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                <span className="text-xs text-muted">{type.rooms?.length || 0} Rooms linked</span>
                <div className="flex gap-2">
                  <button className="btn btn-icon btn-sm" onClick={() => handleOpenModal(type)}>
                    <Edit size={14} />
                  </button>
                  <button className="btn btn-icon btn-sm text-danger" onClick={() => handleDelete(type.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">{editingType ? 'Edit Room Type' : 'Add Room Type'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Category Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    required 
                    placeholder="e.g. Deluxe Ocean View Suite"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Base Price / Night (₹) *</label>
                    <input 
                      type="number" 
                      className="input" 
                      required 
                      min="0"
                      placeholder="e.g. 4500"
                      value={formData.basePrice}
                      onChange={e => setFormData({ ...formData, basePrice: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Guest Capacity</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="1"
                      value={formData.capacity}
                      onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="input" 
                    rows="2"
                    placeholder="Describe this room category..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Amenities (comma separated)</label>
                  <input 
                    type="text" 
                    className="input"
                    placeholder="Wi-Fi, AC, Smart TV, Mini Bar, Balcony"
                    value={formData.amenities}
                    onChange={e => setFormData({ ...formData, amenities: e.target.value })}
                  />
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingType ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
