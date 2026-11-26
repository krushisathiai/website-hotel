import React, { useState, useEffect } from 'react';
import { Package, Plus, AlertCircle, CheckCircle, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'LINEN',
    quantity: 10,
    unit: 'pcs',
    minThreshold: 5,
    unitPrice: 100
  });

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/inventory');
      setItems(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inventory', {
        ...formData,
        quantity: parseInt(formData.quantity) || 0,
        minThreshold: parseInt(formData.minThreshold) || 5,
        unitPrice: parseFloat(formData.unitPrice) || 0
      });
      toast.success('Inventory item added');
      setShowModal(false);
      fetchInventory();
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="text-primary" /> Stock & Inventory Management
          </h1>
          <p className="text-muted text-sm">Track linen, toiletries, kitchen raw materials, and low-stock alerts</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Add Stock Item</span>
        </button>
      </div>

      <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>In Stock</th>
                <th>Unit</th>
                <th>Unit Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const isLow = item.quantity <= item.minThreshold;
                return (
                  <tr key={item.id}>
                    <td className="font-semibold text-base">{item.name}</td>
                    <td><span className="badge badge-secondary">{item.category}</span></td>
                    <td className="font-bold text-lg">{item.quantity}</td>
                    <td className="text-muted">{item.unit || 'pcs'}</td>
                    <td>₹{item.unitPrice || 0}</td>
                    <td>
                      {isLow ? (
                        <span className="badge badge-danger flex items-center gap-1 w-max">
                          <AlertCircle size={12} /> Low Stock
                        </span>
                      ) : (
                        <span className="badge badge-success flex items-center gap-1 w-max">
                          <CheckCircle size={12} /> Adequate
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      {showModal && (
        <div className="room-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="room-modal" onClick={e => e.stopPropagation()}>
            <div className="room-modal-header">
              <h2 className="text-lg font-bold">Add Inventory Item</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="room-modal-body">
                <div className="form-group">
                  <label className="form-label">Item Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    required 
                    placeholder="e.g. King Size Bedsheets, Luxury Shampoo Bottles"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                      <option value="LINEN">Linen & Bedding</option>
                      <option value="TOILETRIES">Toiletries & Bath</option>
                      <option value="KITCHEN">Kitchen & Grocery</option>
                      <option value="CLEANING">Cleaning Supplies</option>
                      <option value="STATIONERY">Office & Stationery</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Unit of Measure</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="pcs, boxes, kg, litres"
                      value={formData.unit}
                      onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label">Current Stock</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="0"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Low Stock Alert Level</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="1"
                      value={formData.minThreshold}
                      onChange={e => setFormData({ ...formData, minThreshold: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unit Cost (₹)</label>
                    <input 
                      type="number" 
                      className="input" 
                      min="0"
                      value={formData.unitPrice}
                      onChange={e => setFormData({ ...formData, unitPrice: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="room-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
