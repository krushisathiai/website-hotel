import React, { useState, useEffect } from 'react';
import { IndianRupee, Plus, Filter, Search, X, CheckCircle, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'UTILITIES',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/expenses');
      setExpenses(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expenses', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      toast.success('Expense recorded!');
      setShowModal(false);
      fetchExpenses();
    } catch (err) {
      toast.error('Failed to record expense');
    }
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingDown className="text-danger" /> Hotel Operational Expenses
          </h1>
          <p className="text-muted text-sm">Track utilities, laundry costs, staff payroll, maintenance, and supplies</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Record New Expense</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card border-l-4 border-l-danger">
          <span className="text-xs text-muted uppercase font-bold">Total Operating Expenses</span>
          <div className="text-3xl font-black text-danger mt-1">₹{totalExpense.toLocaleString('en-IN')}</div>
          <span className="text-xs text-muted">All categories cumulative</span>
        </div>
        <div className="card border-l-4 border-l-primary">
          <span className="text-xs text-muted uppercase font-bold">Expense Entries Count</span>
          <div className="text-3xl font-black text-primary mt-1">{expenses.length}</div>
          <span className="text-xs text-muted">Recorded line items</span>
        </div>
      </div>

      <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Expense Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount (₹)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td className="font-semibold text-base">{exp.title}</td>
                  <td><span className="badge badge-secondary">{exp.category}</span></td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="font-bold text-danger text-base">₹{exp.amount}</td>
                  <td className="text-xs text-muted">{exp.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Record Hotel Expense</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Expense Title *</label>
                  <input 
                    type="text" 
                    className="input" 
                    required 
                    placeholder="e.g. Monthly Electricity Bill, Kitchen Vegetables Purchase"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      className="input"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="UTILITIES">Electricity / Water / Internet</option>
                      <option value="MAINTENANCE">Maintenance & Repairs</option>
                      <option value="SUPPLIES">Housekeeping Supplies</option>
                      <option value="FOOD_GROCERY">Kitchen / Food Groceries</option>
                      <option value="STAFF_SALARY">Staff Salaries / Perks</option>
                      <option value="MARKETING">Marketing & Advertising</option>
                      <option value="OTHER">Other Misc</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Amount (₹) *</label>
                    <input 
                      type="number" 
                      className="input" 
                      required 
                      min="0"
                      placeholder="e.g. 15000"
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Expense Date</label>
                  <input 
                    type="date" 
                    className="input" 
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notes / Reference Receipt</label>
                  <textarea 
                    className="input" 
                    rows="2"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
