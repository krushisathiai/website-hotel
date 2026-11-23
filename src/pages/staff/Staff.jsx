import React, { useState, useEffect } from 'react';
import { UserCog, Plus, Search, Mail, Phone, ShieldCheck, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'RECEPTIONIST',
    phone: ''
  });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.get('/staff');
      setStaffList(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load staff list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      await api.post('/staff', formData);
      toast.success('Staff member registered!');
      setShowModal(false);
      setFormData({ name: '', email: '', password: '', role: 'RECEPTIONIST', phone: '' });
      fetchStaff();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add staff');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this staff user?')) return;
    try {
      await api.delete(`/staff/${id}`);
      toast.success('Staff member removed');
      fetchStaff();
    } catch (err) {
      toast.error('Failed to remove staff');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UserCog className="text-primary" /> Staff & Role Permissions
          </h1>
          <p className="text-muted text-sm">Manage hotel employees, assign roles (Admin, Reception, Housekeeper, Chef)</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Add Staff Member</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="spinner"></div></div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <tr key={staff.id}>
                  <td className="font-semibold text-base">{staff.name}</td>
                  <td>
                    <span className={`badge ${
                      staff.role === 'ADMIN' ? 'badge-primary' : staff.role === 'MANAGER' ? 'badge-info' : 'badge-secondary'
                    }`}>
                      {staff.role}
                    </span>
                  </td>
                  <td>{staff.email}</td>
                  <td>{staff.phone || '—'}</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <button className="btn btn-icon btn-sm text-danger" onClick={() => handleDelete(staff.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Staff Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Add Staff Member</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateStaff}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="input" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input 
                      type="password" 
                      className="input" 
                      required 
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select 
                      className="input"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="RECEPTIONIST">Receptionist</option>
                      <option value="MANAGER">Manager</option>
                      <option value="HOUSEKEEPER">Housekeeping Staff</option>
                      <option value="CHEF">Chef / Kitchen Staff</option>
                      <option value="ADMIN">Hotel Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="input" 
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Staff User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
