import React, { useState, useEffect, useContext } from 'react';
import { 
  UtensilsCrossed, Clock, CheckCircle2, ChevronRight, Plus, 
  DoorClosed, RefreshCw, ChefHat, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import './MyOrders.css';

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/restaurant/orders');
      const data = Array.isArray(res.data) ? res.data : (res.data.orders || res.data.data || []);
      setOrders(data);
    } catch (err) {
      toast.error('Could not fetch your orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 20000);
    return () => clearInterval(interval);
  }, []);

  const getStepStatus = (orderStatus, step) => {
    const statuses = ['PENDING', 'PREPARING', 'READY', 'SERVED'];
    const currentIdx = statuses.indexOf(orderStatus);
    const stepIdx = statuses.indexOf(step);

    if (currentIdx > stepIdx) return 'done';
    if (currentIdx === stepIdx) return 'active';
    return 'pending';
  };

  return (
    <div className="my-orders-container">
      <div className="my-orders-header">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UtensilsCrossed className="text-primary" />
            My In-Room Dining & Food Orders
          </h1>
          <p className="text-muted text-sm mt-1">
            Track live kitchen preparation, delivery progress, and total dining bill
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn btn-secondary flex items-center gap-2" onClick={fetchOrders} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link to="/order-food" className="btn btn-primary flex items-center gap-2">
            <Plus size={18} />
            Order More Food
          </Link>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card text-center p-12">
          <UtensilsCrossed size={48} className="text-muted mx-auto mb-3" />
          <h3 className="text-lg font-bold">No food orders placed yet</h3>
          <p className="text-muted mt-1 max-w-md mx-auto">
            Order fresh breakfast, chef-crafted curries, starters, desserts, and chilled beverages delivered straight to your room!
          </p>
          <Link to="/order-food" className="btn btn-primary inline-flex items-center gap-2 mt-4">
            <Plus size={16} /> Open Dining Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="guest-order-card">
              <div className="flex justify-between items-start flex-wrap gap-2 pb-3 border-b border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary">{order.orderNumber}</span>
                    <span className="badge badge-primary flex items-center gap-1">
                      <DoorClosed size={12} />
                      {order.roomNumber.startsWith('Room') ? order.roomNumber : `Room ${order.roomNumber}`}
                    </span>
                  </div>
                  <div className="text-xs text-muted flex items-center gap-2 mt-1">
                    <Clock size={12} />
                    Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-muted uppercase font-bold">Order Total</div>
                  <div className="text-xl font-black text-primary">₹{order.total?.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="order-progress-stepper">
                <div className="stepper-line" />
                
                <div className={`stepper-step ${getStepStatus(order.status, 'PENDING')}`}>
                  <div className="stepper-circle">1</div>
                  <div className="stepper-label">Received</div>
                </div>

                <div className={`stepper-step ${getStepStatus(order.status, 'PREPARING')}`}>
                  <div className="stepper-circle">2</div>
                  <div className="stepper-label">Cooking</div>
                </div>

                <div className={`stepper-step ${getStepStatus(order.status, 'READY')}`}>
                  <div className="stepper-circle">3</div>
                  <div className="stepper-label">Ready</div>
                </div>

                <div className={`stepper-step ${getStepStatus(order.status, 'SERVED')}`}>
                  <div className="stepper-circle">4</div>
                  <div className="stepper-label">Delivered</div>
                </div>
              </div>

              {/* Items summary */}
              <div className="mt-4 pt-3 border-t border-border bg-bg-secondary p-3 rounded-md">
                <div className="text-xs font-bold text-muted uppercase mb-2">Order Items:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {order.items && order.items.map((item, idx) => (
                    <div key={item.id || idx} className="flex justify-between items-center py-1 border-b border-border border-dashed">
                      <span>
                        <strong className="text-primary mr-1">{item.quantity}x</strong>
                        {item.item?.name || 'Dish'}
                      </span>
                      <span className="font-semibold text-muted">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                {order.notes && (
                  <div className="mt-2 text-xs text-warning bg-warning-bg p-2 rounded">
                    <strong>Special Instructions:</strong> {order.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
