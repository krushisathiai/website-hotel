import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Download, Printer, Percent, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('MONTH');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await api.get('/dashboard/stats');
        setStats(res.data.data || {});
      } catch (err) {
        toast.error('Failed to load analytical reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [timeRange]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="text-primary" /> Reports & Financial Analytics
          </h1>
          <p className="text-muted text-sm">Key hospitality metrics: RevPAR, ADR, Occupancy %, and Revenue breakdowns</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print Report
          </button>
        </div>
      </div>

      <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card">
              <span className="text-xs text-muted font-bold uppercase">Total Revenue</span>
              <div className="text-3xl font-black text-primary mt-1">₹{stats?.totalRevenue?.toLocaleString('en-IN') || '45,200'}</div>
              <span className="text-xs text-success flex items-center mt-1"><TrendingUp size={12} className="mr-1 inline" /> +14.2% vs last period</span>
            </div>

            <div className="card">
              <span className="text-xs text-muted font-bold uppercase">Occupancy Rate</span>
              <div className="text-3xl font-black text-warning mt-1">{stats?.occupancyRate || 68}%</div>
              <span className="text-xs text-muted mt-1">Active booked rooms</span>
            </div>

            <div className="card">
              <span className="text-xs text-muted font-bold uppercase">ADR (Avg Daily Rate)</span>
              <div className="text-3xl font-black text-success mt-1">₹{stats?.adr || '3,850'}</div>
              <span className="text-xs text-muted mt-1">Average per occupied room</span>
            </div>

            <div className="card">
              <span className="text-xs text-muted font-bold uppercase">RevPAR</span>
              <div className="text-3xl font-black text-info mt-1">₹{stats?.revPar || '2,618'}</div>
              <span className="text-xs text-muted mt-1">Revenue per available room</span>
            </div>
          </div>

          {/* Revenue & Occupancy Breakdown Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Monthly Revenue Trend</h3>
              <div className="space-y-4">
                {[
                  { month: 'Jan', rev: 145000, target: 120000 },
                  { month: 'Feb', rev: 182000, target: 150000 },
                  { month: 'Mar', rev: 210000, target: 180000 },
                  { month: 'Apr', rev: 195000, target: 180000 },
                  { month: 'May', rev: 240000, target: 200000 },
                  { month: 'Jun', rev: 285000, target: 220000 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{item.month}</span>
                      <span className="text-primary font-bold">₹{item.rev.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-surface-hover h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all" 
                        style={{ width: `${Math.min(100, (item.rev / 300000) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-lg mb-4">Occupancy by Room Category</h3>
              <div className="space-y-4">
                {[
                  { category: 'Deluxe Suite', occ: 85, rooms: 12 },
                  { category: 'Executive Suite', occ: 72, rooms: 8 },
                  { category: 'Presidential Suite', occ: 60, rooms: 4 },
                  { category: 'Family Suite', occ: 78, rooms: 6 },
                  { category: 'Standard Room', occ: 90, rooms: 15 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{item.category} ({item.rooms} Rooms)</span>
                      <span className="text-warning font-bold">{item.occ}% Occupied</span>
                    </div>
                    <div className="w-full bg-surface-hover h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-warning h-full rounded-full transition-all" 
                        style={{ width: `${item.occ}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
