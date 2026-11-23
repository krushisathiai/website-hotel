import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4 text-center">
      <div className="card max-w-md p-8">
        <AlertCircle size={64} className="text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-black mb-2">404</h1>
        <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
        <p className="text-muted text-sm mb-6">
          The requested hospitality suite or page URL does not exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn btn-primary w-full justify-center">
          <Home size={18} /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
