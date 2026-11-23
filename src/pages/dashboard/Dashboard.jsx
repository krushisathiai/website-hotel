import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, CalendarCheck, CalendarX, Users, IndianRupee, TrendingUp, Plus, LogIn, LogOut as LogOutIcon, Receipt, Percent } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="page-header"><div><div className="skeleton skeleton-title" /><div className="skeleton skeleton-text" style={{width:300}}/></div></div>
        <div className="stats-grid">{[...Array(6)].map((_,i)=><div key={i} className="skeleton skeleton-card"/>)}</div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Rooms', value: data?.roomStats?.total || 0, icon: BedDouble, color: 'primary' },
    { label: 'Available', value: data?.roomStats?.available || 0, icon: BedDouble, color: 'success' },
    { label: 'Occupied', value: data?.roomStats?.occupied || 0, icon: Users, color: 'warning' },
    { label: 'Today Check-ins', value: data?.todayCheckIns || 0, icon: LogIn, color: 'info' },
    { label: 'Today Check-outs', value: data?.todayCheckOuts || 0, icon: LogOutIcon, color: 'danger' },
    { label: 'Current Guests', value: data?.currentGuests || 0, icon: Users, color: 'primary' },
    { label: 'Occupancy Rate', value: `${data?.occupancyRate || 0}%`, icon: Percent, color: 'success' },
    { label: 'Today Revenue', value: `₹${(data?.todayRevenue || 0).toLocaleString()}`, icon: IndianRupee, color: 'success' },
    { label: 'Monthly Revenue', value: `₹${(data?.monthlyRevenue || 0).toLocaleString()}`, icon: TrendingUp, color: 'primary' },
    { label: 'Pending Payments', value: `₹${(data?.pendingPayments || 0).toLocaleString()}`, icon: IndianRupee, color: 'warning' },
  ];

  const chartTooltipStyle = { backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, color: 'var(--color-text)', fontSize: 13 };

  return (
    <div className="dashboard-page page-enter">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name}. Here's your hotel overview.</p>
        </div>
        <div className="quick-actions">
          <Link to="/bookings" className="quick-action-btn"><Plus size={16}/> New Booking</Link>
          <Link to="/guests" className="quick-action-btn"><Users size={16}/> Add Guest</Link>
          <Link to="/billing" className="quick-action-btn"><Receipt size={16}/> Generate Invoice</Link>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className={`stat-icon ${stat.color}`}><stat.icon /></div>
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Overview (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data?.revenueChartData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} tickFormatter={(v) => v.split('-').slice(1).join('/')} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" fill="var(--color-primary-light)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Occupancy Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data?.occupancyChartData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="occupancy" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="tables-grid">
        <div className="card">
          <div className="card-header"><h3 className="card-title">Recent Bookings</h3><Link to="/bookings" className="btn btn-ghost btn-sm">View All</Link></div>
          {data?.recentBookings?.length ? (
            <div style={{overflowX:'auto'}}>
              <table className="data-table">
                <thead><tr><th>Booking</th><th>Guest</th><th>Room</th><th>Status</th></tr></thead>
                <tbody>
                  {data.recentBookings.slice(0,5).map(b => (
                    <tr key={b.id}>
                      <td style={{color:'var(--color-text)', fontWeight:500}}>{b.bookingNumber}</td>
                      <td>{b.guest?.firstName} {b.guest?.lastName}</td>
                      <td>{b.room?.number}</td>
                      <td><span className={`badge badge-${b.status === 'CHECKED_IN' ? 'success' : b.status === 'CONFIRMED' ? 'info' : b.status === 'CHECKED_OUT' ? 'neutral' : 'warning'}`}>{b.status.replace('_',' ')}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state" style={{padding:'var(--space-8)'}}>
              <CalendarCheck size={40}/>
              <h3>No bookings yet</h3>
              <p>Create your first reservation to get started.</p>
              <Link to="/bookings" className="btn btn-primary btn-sm"><Plus size={16}/> New Booking</Link>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header"><h3 className="card-title">Today's Arrivals</h3></div>
          {data?.todayArrivals?.length ? (
            <div style={{overflowX:'auto'}}>
              <table className="data-table">
                <thead><tr><th>Guest</th><th>Room</th><th>Phone</th></tr></thead>
                <tbody>
                  {data.todayArrivals.map(a => (
                    <tr key={a.id}>
                      <td style={{color:'var(--color-text)', fontWeight:500}}>{a.guest?.firstName} {a.guest?.lastName}</td>
                      <td>{a.room?.number} ({a.room?.roomType?.name})</td>
                      <td>{a.guest?.phone || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state" style={{padding:'var(--space-8)'}}>
              <CalendarX size={40}/>
              <h3>No arrivals today</h3>
              <p>There are no guests arriving today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
