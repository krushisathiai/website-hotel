import React, { useState, useEffect, useContext } from 'react';
import { 
  UtensilsCrossed, Plus, Minus, ShoppingBag, Search, Sparkles, 
  CheckCircle2, Clock, MapPin, AlertCircle, Trash2, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import './OrderFood.css';

export default function OrderFood() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [cart, setCart] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Order Details
  const [roomNumber, setRoomNumber] = useState('102');
  const [guestName, setGuestName] = useState(user?.name || '');
  const [orderNotes, setOrderNotes] = useState('');

  const fetchMenuAndRooms = async () => {
    try {
      setLoading(true);
      const [menuRes, roomsRes] = await Promise.all([
        api.get('/restaurant/menu'),
        api.get('/rooms').catch(() => ({ data: [] }))
      ]);

      const catData = Array.isArray(menuRes.data) ? menuRes.data : [];
      setCategories(catData);

      const rData = Array.isArray(roomsRes.data) ? roomsRes.data : (roomsRes.data?.rooms || []);
      setRooms(rData);
      if (rData.length > 0 && !roomNumber) {
        setRoomNumber(String(rData[0].number));
      }
    } catch (err) {
      toast.error('Failed to load menu. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuAndRooms();
  }, []);

  // Cart operations
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`Added ${item.name} to cart`, { duration: 1500 });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setCart([]);

  // Filter items
  const allItems = categories.flatMap((cat) =>
    (cat.items || []).map((item) => ({ ...item, categoryName: cat.name }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchCategory = activeCategory === 'ALL' || item.categoryName === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchVeg = !vegOnly || item.isVeg;
    return matchCategory && matchSearch && matchVeg;
  });

  // Calculate totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstAmount = Math.round(cartSubtotal * 0.05); // 5% GST for restaurant
  const grandTotal = cartSubtotal + gstAmount;

  // Handle Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      return toast.error('Your cart is empty! Add food items first.');
    }
    if (!roomNumber) {
      return toast.error('Please enter or select a room number.');
    }

    try {
      setSubmitting(true);
      const payload = {
        roomNumber: String(roomNumber),
        guestName: guestName || user?.name || 'Hotel Guest',
        notes: orderNotes,
        items: cart.map((i) => ({ itemId: i.id, quantity: i.quantity })),
      };

      const res = await api.post('/restaurant/orders', payload);
      toast.success(`Order #${res.data.orderNumber || 'Success'} placed! Delivery to Room ${roomNumber}`, {
        duration: 4000,
        icon: '🍲',
      });
      setCart([]);
      setOrderNotes('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place food order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="order-food-page">
      {/* Header Banner */}
      <div className="order-food-header">
        <div className="header-info">
          <div className="header-badge">
            <Sparkles size={14} />
            <span>Fast In-Room Dining & Restaurant</span>
          </div>
          <h1>Delicious Food & Drinks</h1>
          <p>Order fresh meals, snacks & beverages directly to your room in 1-click.</p>
        </div>

        {/* Quick Room Selector */}
        <div className="header-room-select">
          <div className="room-select-box">
            <MapPin size={16} className="pin-icon" />
            <div className="select-meta">
              <label>DELIVER TO</label>
              <select value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)}>
                {rooms.length > 0 ? (
                  rooms.map((r) => (
                    <option key={r.id} value={r.number}>
                      Room {r.number} ({r.roomType?.name || 'Standard'})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="101">Room 101 (Executive Suite)</option>
                    <option value="102">Room 102 (Deluxe Double)</option>
                    <option value="103">Room 103 (Presidential)</option>
                    <option value="201">Room 201 (Standard)</option>
                    <option value="Dining Table 1">Dining Table 1</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Menu on Left, Live Cart on Right) */}
      <div className="food-main-layout">
        {/* Menu Section */}
        <div className="food-menu-section">
          {/* Controls: Search & Filters */}
          <div className="menu-controls-bar">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search dishes, curries, drinks, desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={`veg-filter-btn ${vegOnly ? 'active' : ''}`}
              onClick={() => setVegOnly(!vegOnly)}
            >
              <span className="veg-dot" />
              <span>Veg Only</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="category-pills-bar">
            <button
              type="button"
              className={`cat-pill ${activeCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveCategory('ALL')}
            >
              All Items ({allItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cat-pill ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                {cat.name} ({cat.items?.length || 0})
              </button>
            ))}
          </div>

          {/* Food Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="empty-menu-box">
              <UtensilsCrossed size={48} />
              <h3>No dishes found</h3>
              <p>Try searching for something else or clear filters.</p>
            </div>
          ) : (
            <div className="dishes-grid">
              {filteredItems.map((dish) => {
                const inCart = cart.find((i) => i.id === dish.id);
                return (
                  <div key={dish.id} className="dish-card">
                    <div className="dish-header">
                      <span className={`veg-badge ${dish.isVeg ? 'veg' : 'non-veg'}`}>
                        <span className="dot" />
                      </span>
                      <span className="dish-category">{dish.categoryName}</span>
                    </div>

                    <h3 className="dish-name">{dish.name}</h3>
                    <p className="dish-desc">{dish.description || 'Deliciously prepared by our hotel chefs.'}</p>

                    <div className="dish-footer">
                      <div className="dish-price">
                        <span className="currency">₹</span>
                        <span className="amount">{dish.price}</span>
                      </div>

                      {inCart ? (
                        <div className="qty-control">
                          <button type="button" onClick={() => updateQuantity(dish.id, -1)}>
                            <Minus size={14} />
                          </button>
                          <span className="qty-num">{inCart.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(dish.id, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="add-dish-btn"
                          onClick={() => addToCart(dish)}
                        >
                          <Plus size={15} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Cart Sidebar */}
        <div className="food-cart-sidebar">
          <div className="cart-card">
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={20} />
                <h3>Your Order Cart</h3>
              </div>
              {cart.length > 0 && (
                <button type="button" className="clear-cart-link" onClick={clearCart}>
                  Clear
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <UtensilsCrossed size={40} className="empty-icon" />
                <p>No food items selected yet.</p>
                <span>Click "+ Add" on any dish to order.</span>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="cart-form">
                {/* Cart Items List */}
                <div className="cart-items-scroll">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="item-meta">
                        <span className="item-title">{item.name}</span>
                        <span className="item-unit-price">₹{item.price} each</span>
                      </div>
                      <div className="item-actions">
                        <div className="qty-control small">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="item-total-price">₹{item.price * item.quantity}</span>
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Target Info */}
                <div className="cart-delivery-box">
                  <div className="cart-field">
                    <label>Guest Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="cart-field">
                    <label>Special Instructions (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Less spicy, send extra spoons"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="cart-bill-summary">
                  <div className="bill-row">
                    <span>Food Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  <div className="bill-row">
                    <span>Restaurant GST (5%)</span>
                    <span>₹{gstAmount}</span>
                  </div>
                  <div className="bill-row total">
                    <span>Total Amount</span>
                    <span className="gold-text">₹{grandTotal}</span>
                  </div>
                  <span className="bill-note">✓ Charges will be routed to Room {roomNumber} Bill</span>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  className="btn btn-primary place-order-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="spinner small" />
                      <span>Sending to Kitchen...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Place Order</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
