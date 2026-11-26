import React, { useState, useEffect } from 'react';
import { 
  BedDouble, Plus, Search, Filter, LayoutGrid, List, 
  Edit, Trash2, CheckCircle, AlertCircle, Wrench, ShieldAlert, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import './Rooms.css';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    roomNumber: '',
    roomTypeId: '',
    floor: 1,
    status: 'AVAILABLE',
    cleanliness: 'CLEAN',
    notes: ''
  });

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const [roomsRes, typesRes] = await Promise.all([
        api.get('/rooms'),
        api.get('/room-types')
      ]);
      const rList = Array.isArray(roomsRes.data) ? roomsRes.data : (roomsRes.data.rooms || roomsRes.data.data || []);
      const tList = Array.isArray(typesRes.data) ? typesRes.data : (typesRes.data.types || typesRes.data.data || []);
      setRooms(rList);
      setRoomTypes(tList);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        roomNumber: room.number || room.roomNumber,
        roomTypeId: room.roomTypeId,
        floor: room.floor,
        status: room.status,
        cleanliness: room.cleanliness,
        notes: room.notes || ''
      });
    } else {
      setEditingRoom(null);
      setFormData({
        roomNumber: '',
        roomTypeId: roomTypes[0]?.id || '',
        floor: 1,
        status: 'AVAILABLE',
        cleanliness: 'CLEAN',
        notes: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoom(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.roomNumber || !formData.roomTypeId) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingRoom) {
        await api.put(`/rooms/${editingRoom.id}`, formData);
        toast.success('Room updated successfully!');
      } else {
        await api.post('/rooms', formData);
        toast.success('Room added successfully!');
      }
      handleCloseModal();
      fetchRooms();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      toast.success('Room deleted successfully');
      fetchRooms();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete room');
    }
  };

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      await api.patch(`/rooms/${roomId}/status`, { status: newStatus });
      toast.success(`Room status set to ${newStatus}`);
      fetchRooms();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.roomType?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || room.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || room.roomTypeId === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'badge-success';
      case 'OCCUPIED': return 'badge-danger';
      case 'RESERVED': return 'badge-warning';
      case 'MAINTENANCE': return 'badge-info';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="rooms-container">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Room Management</h1>
          <p className="text-muted text-sm">Manage hotel rooms, real-time availability, and cleanliness status</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          <span>Add New Room</span>
        </button>
      </div>

      <div className="rooms-toolbar">
        <div className="filter-group">
          <div className="search-box">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search room # or type..."
              className="input-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="input-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="RESERVED">Reserved</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>

          <select 
            className="input-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Room Types</option>
            {roomTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <button 
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <LayoutGrid size={16} /> Grid
          </button>
          <button 
            className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <List size={16} /> Table
          </button>
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="card text-center p-12">
          <BedDouble size={48} className="text-muted mx-auto mb-3" />
          <h3 className="text-lg font-semibold">No rooms found</h3>
          <p className="text-muted text-sm mb-4">Try adjusting your filters or create a new room.</p>
          <button className="btn btn-primary btn-sm mx-auto" onClick={() => handleOpenModal()}>
            <Plus size={16} /> Add Room
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="rooms-grid">
          {filteredRooms.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-card-header">
                <div>
                  <span className="text-xs text-muted">Floor {room.floor}</span>
                  <h3 className="text-lg font-bold">Room {room.number || room.roomNumber}</h3>
                </div>
                <span className={`badge ${getStatusBadgeClass(room.status)}`}>
                  {room.status}
                </span>
              </div>

              <div className="room-card-body">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">{room.roomType?.name || 'Standard'}</span>
                  <span className="room-price">₹{room.roomType?.basePrice || 0}<span className="text-xs font-normal text-muted">/night</span></span>
                </div>
                <div className="text-sm text-muted">
                  <span>Capacity: {room.roomType?.capacity || 2} Persons</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`badge ${room.cleanliness === 'CLEAN' ? 'badge-success' : room.cleanliness === 'DIRTY' ? 'badge-danger' : 'badge-warning'}`}>
                    {room.cleanliness}
                  </span>
                </div>
              </div>

              <div className="room-card-footer">
                <div className="flex items-center gap-1">
                  <select 
                    className="text-xs p-1 rounded border border-border bg-surface"
                    value={room.status}
                    onChange={(e) => handleStatusChange(room.id, e.target.value)}
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="OCCUPIED">Occupied</option>
                    <option value="RESERVED">Reserved</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-icon btn-sm" onClick={() => handleOpenModal(room)} title="Edit">
                    <Edit size={14} />
                  </button>
                  <button className="btn btn-icon btn-sm text-danger" onClick={() => handleDelete(room.id)} title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Room #</th>
                <th>Type</th>
                <th>Floor</th>
                <th>Rate / Night</th>
                <th>Status</th>
                <th>Cleanliness</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map(room => (
                <tr key={room.id}>
                  <td className="font-semibold">Room {room.roomNumber}</td>
                  <td>{room.roomType?.name || 'Standard'}</td>
                  <td>Floor {room.floor}</td>
                  <td>₹{room.roomType?.basePrice || 0}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(room.status)}`}>
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${room.cleanliness === 'CLEAN' ? 'badge-success' : 'badge-danger'}`}>
                      {room.cleanliness}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-icon btn-sm" onClick={() => handleOpenModal(room)}>
                        <Edit size={14} />
                      </button>
                      <button className="btn btn-icon btn-sm text-danger" onClick={() => handleDelete(room.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="room-modal-backdrop" onClick={handleCloseModal}>
          <div className="room-modal" onClick={(e) => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
              <button className="btn-icon" onClick={handleCloseModal}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="room-modal-body">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Room Number *</label>
                    <input 
                      type="text" 
                      className="input" 
                      required
                      placeholder="e.g. 101"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Floor</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="1"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Room Type *</label>
                  <select 
                    className="input" 
                    required
                    value={formData.roomTypeId}
                    onChange={(e) => setFormData({ ...formData, roomTypeId: e.target.value })}
                  >
                    <option value="">Select Room Type</option>
                    {roomTypes.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (₹{t.basePrice}/night)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select 
                      className="input"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="OCCUPIED">Occupied</option>
                      <option value="RESERVED">Reserved</option>
                      <option value="MAINTENANCE">Maintenance</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cleanliness</label>
                    <select 
                      className="input"
                      value={formData.cleanliness}
                      onChange={(e) => setFormData({ ...formData, cleanliness: e.target.value })}
                    >
                      <option value="CLEAN">Clean</option>
                      <option value="DIRTY">Dirty</option>
                      <option value="INSPECTED">Inspected</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea 
                    className="input"
                    rows="3"
                    placeholder="Any special remarks or features..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingRoom ? 'Update Room' : 'Create Room'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
