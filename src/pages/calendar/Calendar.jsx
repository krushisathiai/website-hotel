import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BedDouble, User } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [roomsRes, bookingsRes] = await Promise.all([
          api.get('/rooms'),
          api.get('/bookings')
        ]);
        setRooms(roomsRes.data.data || []);
        setBookings(bookingsRes.data.data || []);
      } catch (err) {
        toast.error('Failed to load calendar data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isRoomBookedOnDay = (room, day) => {
    const targetDate = new Date(year, month, day);
    return bookings.find(b => {
      if (b.roomId !== room.id || b.status === 'CANCELLED') return false;
      const start = new Date(b.checkInDate);
      const end = new Date(b.checkOutDate);
      return targetDate >= start && targetDate < end;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarIcon className="text-primary" /> Booking Calendar & Timeline
          </h1>
          <p className="text-muted text-sm">Visual grid showing room bookings, check-ins, and month-long occupancy</p>
        </div>
        <div className="flex items-center gap-3 bg-surface p-2 rounded-lg border border-border">
          <button className="btn btn-icon btn-sm" onClick={prevMonth}>
            <ChevronLeft size={18} />
          </button>
          <span className="font-bold text-sm min-w-36 text-center">{monthName}</span>
          <button className="btn btn-icon btn-sm" onClick={nextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="spinner"></div></div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table border-collapse w-full">
            <thead>
              <tr className="bg-surface-hover">
                <th className="sticky left-0 bg-surface z-10 p-3 min-w-36 border-r border-border">
                  Room
                </th>
                {daysArray.map(day => (
                  <th key={day} className="text-center p-2 text-xs min-w-10 border-r border-border">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id} className="border-b border-border">
                  <td className="sticky left-0 bg-surface z-10 p-3 font-semibold text-sm border-r border-border">
                    <div>Room {room.roomNumber}</div>
                    <div className="text-[10px] text-muted">{room.roomType?.name}</div>
                  </td>
                  {daysArray.map(day => {
                    const booking = isRoomBookedOnDay(room, day);
                    return (
                      <td key={day} className="p-1 text-center border-r border-border/50">
                        {booking ? (
                          <div 
                            className="bg-primary/20 text-primary border border-primary/40 rounded p-1 text-[10px] truncate cursor-pointer font-bold hover:bg-primary hover:text-white transition-colors"
                            title={`${booking.guest?.firstName} ${booking.guest?.lastName} (${booking.status})`}
                          >
                            {booking.guest?.lastName || 'Booked'}
                          </div>
                        ) : (
                          <div className="h-6 rounded bg-surface-hover/30 hover:bg-emerald-500/10 cursor-pointer"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
