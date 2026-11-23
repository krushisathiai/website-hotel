import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, Clock, AlertTriangle, Plus, RefreshCw, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Housekeeping() {
  const [tasks, setTasks] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    roomId: '',
    taskType: 'CLEANING',
    priority: 'MEDIUM',
    notes: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, roomsRes] = await Promise.all([
        api.get('/housekeeping'),
        api.get('/rooms')
      ]);
      setTasks(tasksRes.data.data || []);
      setRooms(roomsRes.data.data || []);
    } catch (err) {
      toast.error('Failed to load housekeeping data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/housekeeping', formData);
      toast.success('Cleaning task assigned!');
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/housekeeping/${id}/status`, { status });
      toast.success(`Task status changed to ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary" /> Housekeeping & Room Sanitation
          </h1>
          <p className="text-muted text-sm">Assign cleaning duties, track sanitization progress, and maintain room standards</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Assign Cleaning Task</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="spinner"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <div className="space-y-3">
            <h3 className="font-bold text-base flex items-center justify-between">
              <span>Pending Tasks</span>
              <span className="badge badge-warning">
                {tasks.filter(t => t.status === 'PENDING').length}
              </span>
            </h3>
            <div className="space-y-3">
              {tasks.filter(t => t.status === 'PENDING').map(task => (
                <div key={task.id} className="card border-l-4 border-l-warning">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-base">Room #{task.room?.roomNumber}</span>
                    <span className="badge badge-warning text-xs">{task.priority}</span>
                  </div>
                  <p className="text-xs text-muted mt-2">{task.notes || 'Standard daily housekeeping and linen refresh.'}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}
                    >
                      Start Cleaning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Tasks */}
          <div className="space-y-3">
            <h3 className="font-bold text-base flex items-center justify-between">
              <span>In Progress</span>
              <span className="badge badge-info">
                {tasks.filter(t => t.status === 'IN_PROGRESS').length}
              </span>
            </h3>
            <div className="space-y-3">
              {tasks.filter(t => t.status === 'IN_PROGRESS').map(task => (
                <div key={task.id} className="card border-l-4 border-l-info">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-base">Room #{task.room?.roomNumber}</span>
                    <span className="badge badge-info text-xs">Cleaning Now</span>
                  </div>
                  <p className="text-xs text-muted mt-2">{task.notes || 'Deep sanitization and vacuuming underway.'}</p>
                  <div className="mt-4 flex justify-end">
                    <button 
                      className="btn btn-sm btn-primary text-success"
                      onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="space-y-3">
            <h3 className="font-bold text-base flex items-center justify-between">
              <span>Completed Today</span>
              <span className="badge badge-success">
                {tasks.filter(t => t.status === 'COMPLETED').length}
              </span>
            </h3>
            <div className="space-y-3">
              {tasks.filter(t => t.status === 'COMPLETED').map(task => (
                <div key={task.id} className="card border-l-4 border-l-success opacity-80">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-base">Room #{task.room?.roomNumber}</span>
                    <span className="badge badge-success text-xs">Cleaned</span>
                  </div>
                  <p className="text-xs text-muted mt-2">Inspected and verified ready for next check-in.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Assign Housekeeping Task</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateTask}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Select Room *</label>
                  <select 
                    className="input"
                    required
                    value={formData.roomId}
                    onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                  >
                    <option value="">-- Choose Room --</option>
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        Room #{r.roomNumber} ({r.cleanliness})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Task Type</label>
                    <select 
                      className="input"
                      value={formData.taskType}
                      onChange={e => setFormData({ ...formData, taskType: e.target.value })}
                    >
                      <option value="CLEANING">Standard Cleaning</option>
                      <option value="DEEP_CLEAN">Deep Sanitization</option>
                      <option value="LINEN_CHANGE">Linen & Towel Change</option>
                      <option value="INSPECTION">Manager Inspection</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <select 
                      className="input"
                      value={formData.priority}
                      onChange={e => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High (Guest Arriving)</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Instructions</label>
                  <textarea 
                    className="input"
                    rows="3"
                    placeholder="e.g. Extra pillows, refill bath accessories..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Assign Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
