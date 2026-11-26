import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Landing from './pages/landing/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/notfound/NotFound';

// Food & Waiter Operations
import OrderFood from './pages/food/OrderFood';
import WaiterOrders from './pages/waiter/WaiterOrders';
import MyOrders from './pages/food/MyOrders';

// Protected Module Pages
import Dashboard from './pages/dashboard/Dashboard';
import Rooms from './pages/rooms/Rooms';
import RoomTypes from './pages/rooms/RoomTypes';
import Guests from './pages/guests/Guests';
import Bookings from './pages/bookings/Bookings';
import Calendar from './pages/calendar/Calendar';
import FrontDesk from './pages/frontdesk/FrontDesk';
import Billing from './pages/billing/Billing';
import Housekeeping from './pages/housekeeping/Housekeeping';
import Maintenance from './pages/maintenance/Maintenance';
import Staff from './pages/staff/Staff';
import Restaurant from './pages/restaurant/Restaurant';
import Inventory from './pages/inventory/Inventory';
import Expenses from './pages/expenses/Expenses';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';

import './App.css';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: 'var(--font-sm)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: '#ffffff',
            },
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard & Operations Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="room-types" element={<RoomTypes />} />
          <Route path="guests" element={<Guests />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="frontdesk" element={<FrontDesk />} />
          <Route path="billing" element={<Billing />} />
          <Route path="housekeeping" element={<Housekeeping />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="staff" element={<Staff />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="order-food" element={<OrderFood />} />
          <Route path="waiter-orders" element={<WaiterOrders />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
