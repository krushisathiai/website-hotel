import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Hotel, Clock, Percent, ShieldCheck, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Settings() {
  const [formData, setFormData] = useState({
    hotelName: 'Grand Palace Luxury Resort',
    address: 'Plot 42, Marine Drive, Hospitality Boulevard, Mumbai, Maharashtra 400020',
    phone: '+91 22 2847 9000',
    email: 'contact@grandpalace.com',
    gstin: '27AABCG1234F1Z9',
    currency: 'INR (₹)',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    gstPercentage: 12
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data?.data) {
          setFormData(prev => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        // use defaults
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/settings', formData);
      toast.success('Hotel configuration settings updated!');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="text-primary" /> Hotel & Property Settings
        </h1>
        <p className="text-muted text-sm">Configure property profile, GST tax details, check-in/out policies, and invoice header</p>
      </div>

      <form onSubmit={handleSave} className="card space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Hotel size={20} className="text-primary" /> Property Information
          </h3>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Hotel / Property Brand Name *</label>
              <input 
                type="text" 
                className="input" 
                required
                value={formData.hotelName}
                onChange={e => setFormData({ ...formData, hotelName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Property Address</label>
              <input 
                type="text" 
                className="input" 
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input 
                  type="text" 
                  className="input" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Email</label>
                <input 
                  type="email" 
                  className="input" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Percent size={20} className="text-primary" /> Tax & GST Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">GSTIN / Tax ID Number</label>
              <input 
                type="text" 
                className="input font-mono" 
                value={formData.gstin}
                onChange={e => setFormData({ ...formData, gstin: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Applicable GST Rate (%)</label>
              <input 
                type="number" 
                className="input" 
                value={formData.gstPercentage}
                onChange={e => setFormData({ ...formData, gstPercentage: parseFloat(e.target.value) || 12 })}
              />
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock size={20} className="text-primary" /> Standard Operational Timings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Standard Check-In Time</label>
              <input 
                type="time" 
                className="input" 
                value={formData.checkInTime}
                onChange={e => setFormData({ ...formData, checkInTime: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Standard Check-Out Time</label>
              <input 
                type="time" 
                className="input" 
                value={formData.checkOutTime}
                onChange={e => setFormData({ ...formData, checkOutTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Hotel Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
