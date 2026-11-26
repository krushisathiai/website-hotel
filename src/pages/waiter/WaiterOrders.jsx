import React, { useState, useEffect, useCallback } from 'react';
import { 
  UtensilsCrossed, Clock, CheckCircle2, AlertCircle, ChefHat, 
  Search, RefreshCw, Plus, BellRing, DoorClosed, Sparkles, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import './WaiterOrders.css';

export default function WaiterOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState(null);

  const fetchOrders = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      const res = await api.get('/restaurant/orders');
      const data = Array.isArray(res.data) ? res.data : (res.data.orders || res.data.data || []);
      setOrders(data);
    } catch (err) {
      if (!isSilent) {
        toast.error('Failed to load kitchen orders queue');
      }
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders(true);
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setIsUpdating(orderId);
      await api.patch(`/restaurant/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order updated to ${newStatus}`);
      await fetchOrders(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setIsUpdating(null);
    }
  };

  // Stats calculation
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const preparingCount = orders.filter(o => o.status === 'PREPARING').length;
  const readyCount = orders.filter(o => o.status === 'READY').length;
  const servedCount = orders.filter(o => o.status === 'SERVED').length;

  const filteredOrders = orders.filter(o => {
    const matchesTab = activeTab === 'ALL' || o.status === activeTab;
    const query = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || 
      (o.orderNumber && o.orderNumber.toLowerCase().includes(query)) ||
      (o.roomNumber && o.roomNumber.toLowerCase().includes(query)) ||
      (o.guestName && o.guestName.toLowerCase().includes(query));
    return matchesTab && matchesQuery;
  });

  return (
    <div className="waiter-container">
      {/* Header */}
      <div className="waiter-header">
        <div className="waiter-title-area">
          <h1>
            <ChefHat className="text-primary" size={28} />
            Kitchen & Waiter Live Orders Queue
          </h1>
          <p>Real-time order ticket board for kitchen prep, food service, and room delivery</p>
        </div>

        <div className="waiter-actions">
          <button 
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => fetchOrders()}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link to="/order-food" className="btn btn-primary flex items-center gap-2">
            <Plus size={18} />
            Take Food Order
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="waiter-stats-grid">
        <div className="waiter-stat-card" onClick={() => setActiveTab('PENDING')} style={{ cursor: 'pointer' }}>
          <div className="waiter-stat-icon pending">
            <BellRing size={24} />
          </div>
          <div className="waiter-stat-info">
            <div className="stat-num">{pendingCount}</div>
            <div className="stat-label">Pending / New</div>
          </div>
        </div>

        <div className="waiter-stat-card" onClick={() => setActiveTab('PREPARING')} style={{ cursor: 'pointer' }}>
          <div className="waiter-stat-icon preparing">
            <ChefHat size={24} />
          </div>
          <div className="waiter-stat-info">
            <div className="stat-num">{preparingCount}</div>
            <div className="stat-label">In Kitchen Prep</div>
          </div>
        </div>

        <div className="waiter-stat-card" onClick={() => setActiveTab('READY')} style={{ cursor: 'pointer' }}>
          <div className="waiter-stat-icon ready">
            <Sparkles size={24} />
          </div>
          <div className="waiter-stat-info">
            <div className="stat-num">{readyCount}</div>
            <div className="stat-label">Ready to Deliver</div>
          </div>
        </div>

        <div className="waiter-stat-card" onClick={() => setActiveTab('SERVED')} style={{ cursor: 'pointer' }}>
          <div className="waiter-stat-icon served">
            <CheckCircle2 size={24} />
          </div>
          <div className="waiter-stat-info">
            <div className="stat-num">{servedCount}</div>
            <div className="stat-label">Served Today</div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="waiter-filter-bar">
        <div className="waiter-status-tabs">
          {[
            { id: 'ALL', label: 'All Orders', count: orders.length },
            { id: 'PENDING', label: 'Pending', count: pendingCount },
            { id: 'PREPARING', label: 'In Kitchen', count: preparingCount },
            { id: 'READY', label: 'Ready to Serve', count: readyCount },
            { id: 'SERVED', label: 'Served', count: servedCount },
          ].map(tab => (
            <button
              key={tab.id}
              className={`waiter-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              <span className="tab-badge">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="search-box" style={{ maxWidth: '300px' }}>
          <Search size={16} className="text-muted" />
          <input
            type="text"
            className="input-search"
            placeholder="Search room, guest, order #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content / Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="empty-orders-state">
          <UtensilsCrossed size={48} className="text-muted mx-auto" />
          <h3 className="text-lg font-bold mt-3">No orders found</h3>
          <p>
            {activeTab === 'ALL'
              ? 'No restaurant food orders have been placed yet.'
              : `There are currently no orders in status "${activeTab}".`}
          </p>
          <Link to="/order-food" className="btn btn-primary mt-4 inline-flex items-center gap-2">
            <Plus size={16} /> Place First Food Order
          </Link>
        </div>
      ) : (
        <div className="waiter-orders-grid">
          {filteredOrders.map(order => {
            const statusClass = `status-${order.status.toLowerCase()}`;
            return (
              <div key={order.id} className={`waiter-order-card ${statusClass}`}>
                <div>
                  <div className="order-top">
                    <span className="order-id-badge">{order.orderNumber}</span>
                    <span className="order-time">
                      <Clock size={12} />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="order-location-tag">
                    <span className="room-pill">
                      <DoorClosed size={14} />
                      {order.roomNumber.startsWith('Room') ? order.roomNumber : `Room ${order.roomNumber}`}
                    </span>
                    <span className="guest-name">• {order.guestName}</span>
                  </div>

                  {/* Items list */}
                  <div className="order-items-list">
                    {order.items && order.items.map((item, idx) => (
                      <div key={item.id || idx} className="order-item-row">
                        <div className="item-left">
                          <span className="item-qty">{item.quantity}x</span>
                          <span className="item-name">{item.item?.name || 'Dish Item'}</span>
                        </div>
                        <span className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {order.notes && (
                    <div className="order-notes">
                      <strong>Note:</strong> {order.notes}
                    </div>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-total-block">
                    <div className="label">Total Bill</div>
                    <div className="val">₹{order.total?.toLocaleString('en-IN')}</div>
                  </div>

                  <div className="action-buttons-group">
                    {order.status === 'PENDING' && (
                      <button
                        className="btn-prep"
                        disabled={isUpdating === order.id}
                        onClick={() => handleStatusChange(order.id, 'PREPARING')}
                      >
                        <ChefHat size={16} />
                        Start Cooking
                      </button>
                    )}

                    {order.status === 'PREPARING' && (
                      <button
                        className="btn-ready"
                        disabled={isUpdating === order.id}
                        onClick={() => handleStatusChange(order.id, 'READY')}
                      >
                        <Sparkles size={16} />
                        Mark Ready
                      </button>
                    )}

                    {order.status === 'READY' && (
                      <button
                        className="btn-serve"
                        disabled={isUpdating === order.id}
                        onClick={() => handleStatusChange(order.id, 'SERVED')}
                      >
                        <CheckCircle2 size={16} />
                        Mark Served
                      </button>
                    )}

                    {order.status === 'SERVED' && (
                      <span className="badge badge-success text-xs py-1 px-3">
                        ✓ Served to Guest
                      </span>
                    )}

                    {['PENDING', 'PREPARING'].includes(order.status) && (
                      <button
                        className="btn-icon text-danger"
                        title="Cancel Order"
                        disabled={isUpdating === order.id}
                        onClick={() => {
                          if (window.confirm('Cancel this food order?')) {
                            handleStatusChange(order.id, 'CANCELLED');
                          }
                        }}
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
