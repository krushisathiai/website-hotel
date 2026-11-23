import React, { useState, useEffect } from 'react';
import { 
  ConciergeBell, LogIn, LogOut, CheckCircle, BedDouble, 
  Search, RefreshCw, AlertCircle, Clock, User, Phone, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function FrontDesk() {
  const [rooms, setRooms] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [inHouse, setInHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [roomsRes, bookingsRes] = await Promise.all([
        api.get('/rooms'),
        api.get('/bookings')
      ]);

      const allRooms = roomsRes.data.data || [];
      const allBookings = bookingsRes.data.data || [];
      
      const today = new Date().toISOString().split('T')[0];

      setRooms(allRooms);
      setArrivals(allBookings.filter(b => b.status === 'CONFIRMED' && b.checkInDate.startsWith(today)));
      setDepartures(allBookings.filter(b => b.status === 'CHECKED_IN' && b.checkOutDate.startsWith(today)));
      setInHouse(allBookings.filter(b => b.status === 'CHECKED_IN'));
    } catch (err) {
      toast.error('Failed to load Front Desk data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckIn = async (id) => {
    try {
      await api.post(`/bookings/${id}/check-in`);
      toast.success('Guest checked in successfully!');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async (id) => {
    try {
      await api.post(`/bookings/${id}/check-out`);
      toast.success('Guest checked out successfully! Room marked for cleaning.');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Check-out failed');
    }
  };

  const handleCleanliness = async (roomId, cleanliness) => {
    try {
      await api.patch(`/rooms/${roomId}/status`, { cleanliness });
      toast.success(`Room cleanliness set to ${cleanliness}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update cleanliness');
    }
  };

  const filteredRooms = rooms.filter(r => {
    if (filterType === 'ALL') return true;
    if (filterType === 'AVAILABLE') return r.status === 'AVAILABLE';
    if (filterType === 'OCCUPIED') return r.status === 'OCCUPIED';
    if (filterType === 'DIRTY') return r.cleanliness === 'DIRTY';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ConciergeBell className="text-primary" /> Front Desk Operations
          </h1>
          <p className="text-muted text-sm">Real-time room rack, instant guest check-in/out, and live occupancy status</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchData}>
          <RefreshCw size={16} /> Refresh Rack
        </button>
      </div>

      {/* Top Front Desk Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card border-l-4 border-l-success">
          <div className="text-xs text-muted font-bold uppercase">Available Rooms</div>
          <div className="text-3xl font-black mt-1 text-success">
            {rooms.filter(r => r.status === 'AVAILABLE').length}
          </div>
          <div className="text-xs text-muted mt-1">Ready for check-in</div>
        </div>

        <div className="card border-l-4 border-l-primary">
          <div className="text-xs text-muted font-bold uppercase">In-House Guests</div>
          <div className="text-3xl font-black mt-1 text-primary">
            {inHouse.length}
          </div>
          <div className="text-xs text-muted mt-1">Currently staying</div>
        </div>

        <div className="card border-l-4 border-l-info">
          <div className="text-xs text-muted font-bold uppercase">Today's Expected Arrivals</div>
          <div className="text-3xl font-black mt-1 text-info">
            {arrivals.length}
          </div>
          <div className="text-xs text-muted mt-1">Reservations arriving today</div>
        </div>

        <div className="card border-l-4 border-l-warning">
          <div className="text-xs text-muted font-bold uppercase">Today's Departures</div>
          <div className="text-3xl font-black mt-1 text-warning">
            {departures.length}
          </div>
          <div className="text-xs text-muted mt-1">Checking out today</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Arrivals & Departures Side Column */}
        <div className="space-y-6">
          {/* Expected Arrivals */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <LogIn size={18} className="text-success" /> Today's Arrivals
              </h3>
              <span className="badge badge-info">{arrivals.length}</span>
            </div>

            {arrivals.length === 0 ? (
              <p className="text-xs text-muted text-center py-4">No remaining arrivals for today</p>
            ) : (
              <div className="space-y-3">
                {arrivals.map(b => (
                  <div key={b.id} className="p-3 border border-border rounded-lg bg-surface-hover flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-sm">{b.guest?.firstName} {b.guest?.lastName}</div>
                      <div className="text-xs text-muted">Room {b.room?.roomNumber} ({b.room?.roomType?.name})</div>
                      <div className="text-xs text-primary font-medium">₹{b.totalAmount}</div>
                    </div>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleCheckIn(b.id)}
                    >
                      Check In
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Expected Departures */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <LogOut size={18} className="text-warning" /> Today's Departures
              </h3>
              <span className="badge badge-warning">{departures.length}</span>
            </div>

            {departures.length === 0 ? (
              <p className="text-xs text-muted text-center py-4">No remaining departures for today</p>
            ) : (
              <div className="space-y-3">
                {departures.map(b => (
                  <div key={b.id} className="p-3 border border-border rounded-lg bg-surface-hover flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-sm">{b.guest?.firstName} {b.guest?.lastName}</div>
                      <div className="text-xs text-muted">Room {b.room?.roomNumber}</div>
                    </div>
                    <button 
                      className="btn btn-sm btn-secondary text-warning"
                      onClick={() => handleCheckOut(b.id)}
                    >
                      Check Out
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Room Rack Visualizer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
              <h3 className="font-bold text-lg">Interactive Room Rack</h3>
              <div className="flex gap-2">
                <button 
                  className={`btn btn-sm ${filterType === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterType('ALL')}
                >
                  All ({rooms.length})
                </button>
                <button 
                  className={`btn btn-sm ${filterType === 'AVAILABLE' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterType('AVAILABLE')}
                >
                  Available
                </button>
                <button 
                  className={`btn btn-sm ${filterType === 'OCCUPIED' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterType('OCCUPIED')}
                >
                  Occupied
                </button>
                <button 
                  className={`btn btn-sm ${filterType === 'DIRTY' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFilterType('DIRTY')}
                >
                  Dirty
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredRooms.map(room => {
                const isOccupied = room.status === 'OCCUPIED';
                const isAvailable = room.status === 'AVAILABLE';
                const isDirty = room.cleanliness === 'DIRTY';

                let bgBadge = 'badge-success';
                if (isOccupied) bgBadge = 'badge-danger';
                else if (room.status === 'MAINTENANCE') bgBadge = 'badge-info';

                return (
                  <div 
                    key={room.id}
                    className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                      isOccupied 
                        ? 'border-red-300 bg-red-500/10' 
                        : isDirty 
                        ? 'border-amber-400 bg-amber-500/10' 
                        : 'border-emerald-300 bg-emerald-500/10'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-lg">#{room.roomNumber}</span>
                        <span className={`badge text-xs ${bgBadge}`}>
                          {room.status.slice(0, 4)}
                        </span>
                      </div>
                      <div className="text-xs text-muted truncate">{room.roomType?.name}</div>
                      <div className="text-xs font-semibold mt-1">₹{room.roomType?.basePrice}/night</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-border/50 flex justify-between items-center">
                      <span className={`text-[10px] uppercase font-bold ${room.cleanliness === 'CLEAN' ? 'text-success' : 'text-danger'}`}>
                        {room.cleanliness}
                      </span>
                      {room.cleanliness === 'DIRTY' ? (
                        <button 
                          className="btn btn-xs btn-outline text-success"
                          onClick={() => handleCleanliness(room.id, 'CLEAN')}
                        >
                          Mark Clean
                        </button>
                      ) : (
                        <button 
                          className="btn btn-xs btn-outline text-muted"
                          onClick={() => handleCleanliness(room.id, 'DIRTY')}
                        >
                          Mark Dirty
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
