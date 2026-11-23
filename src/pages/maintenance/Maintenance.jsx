import React, { useState, useEffect } from 'react';
import { Wrench, Plus, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Maintenance() {
  const [tickets, setTickets] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    roomId: '',
    title: '',
    description: '',
    priority: 'MEDIUM',
    category: 'PLUMBING'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ticketsRes, roomsRes] = await Promise.all([
        api.get('/maintenance'),
        api.get('/rooms')
      ]);
      setTickets(ticketsRes.data.data || []);
      setRooms(roomsRes.data.data || []);
    } catch (err) {
      toast.error('Failed to load maintenance tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      await api.post('/maintenance', formData);
      toast.success('Maintenance ticket created!');
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error('Failed to create ticket');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/maintenance/${id}/status`, { status });
      toast.success(`Ticket marked as ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update ticket status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="text-primary" /> Engineering & Maintenance
          </h1>
          <p className="text-muted text-sm">Log facility repairs, track technician resolution, and maintain hotel infrastructure</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Raise Maintenance Ticket</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="spinner"></div></div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Issue / Room</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Reported On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-muted">No maintenance issues reported</td>
                </tr>
              ) : (
                tickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td className="font-mono text-xs font-bold text-primary">
                      TKT-{ticket.id.slice(0, 6)}
                    </td>
                    <td>
                      <div className="font-semibold text-sm">{ticket.title}</div>
                      <div className="text-xs text-muted">
                        {ticket.room ? `Room #${ticket.room.roomNumber}` : 'General Facility'} — {ticket.description}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-secondary">{ticket.category || 'GENERAL'}</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        ticket.priority === 'HIGH' || ticket.priority === 'URGENT' 
                          ? 'badge-danger' 
                          : ticket.priority === 'MEDIUM' 
                          ? 'badge-warning' 
                          : 'badge-secondary'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${ticket.status === 'COMPLETED' ? 'badge-success' : ticket.status === 'IN_PROGRESS' ? 'badge-info' : 'badge-warning'}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="text-xs text-muted">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        {ticket.status !== 'COMPLETED' && (
                          <button 
                            className="btn btn-xs btn-primary text-success"
                            onClick={() => handleStatusUpdate(ticket.id, 'COMPLETED')}
                          >
                            <CheckCircle size={12} className="mr-1 inline" /> Resolve
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
      )}

      {/* Ticket Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Raise Maintenance Ticket</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateTicket}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Issue Summary *</label>
                  <input 
                    type="text" 
                    className="input" 
                    required 
                    placeholder="e.g. AC cooling low, Bathroom faucet leak"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Select Room (Optional)</label>
                    <select 
                      className="input"
                      value={formData.roomId}
                      onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                    >
                      <option value="">General Common Area</option>
                      {rooms.map(r => (
                        <option key={r.id} value={r.id}>Room #{r.roomNumber}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="input"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="PLUMBING">Plumbing</option>
                      <option value="ELECTRICAL">Electrical & Lighting</option>
                      <option value="HVAC">AC & Ventilation</option>
                      <option value="CARPENTRY">Carpentry & Furniture</option>
                      <option value="APPLIANCE">TV / Appliances</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <select 
                    className="input"
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent / Emergency</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Description</label>
                  <textarea 
                    className="input" 
                    rows="3"
                    placeholder="Provide troubleshooting details..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
