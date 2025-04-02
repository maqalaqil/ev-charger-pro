import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForecastAI from '../ForecastAI';
import ForecastUsage from '../ForecastUsage';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = ({ token, role }) => {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ readingAfter: '', kwhPrice: '', date: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState({ from: '', to: '' });

  const lastReading = records.length > 0 ? records[records.length - 1].readingAfter : 0;
  const lastPricePerKwh = records.length > 0 ? (records[records.length - 1].price / records[records.length - 1].totalCharged) : '';

  useEffect(() => {
    fetchSummary();
    fetchTrend();
    fetchRecords();
  }, []);

  const fetchSummary = async () => {
    let url = 'http://localhost:3001/charging-summary/monthly';
    if (filter.from && filter.to) {
      url += `?from=${filter.from}&to=${filter.to}`;
    }
    const res = await axios.get(url);
    setSummary(res.data);
  };

  const fetchTrend = async () => {
    let url = 'http://localhost:3001/charging-summary/trend';
    if (filter.from && filter.to) {
      url += `?from=${filter.from}&to=${filter.to}`;
    }
    const res = await axios.get(url);
    const formatted = res.data.map(r => ({
      ...r,
      date: new Date(r.date).toLocaleDateString()
    }));
    setTrend(formatted);
  };

  const fetchRecords = async () => {
    const res = await axios.get('http://localhost:3001/charging-records');
    setRecords(res.data);
  };

  const submitRecord = async (e) => {
    e.preventDefault();
    const after = parseFloat(form.readingAfter);
    const kwh = parseFloat(form.kwhPrice);

    if (after <= lastReading) {
      alert(`Reading After must be greater than last reading (${lastReading})`);
      return;
    }

    const payload = { readingAfter: after, kwhPrice: kwh, date: form.date };

    try {
      const res = await axios.post('http://localhost:3001/charging-records', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecords(prev => [...prev, res.data]);
      setForm({ readingAfter: '', kwhPrice: '', date: '' });
      fetchSummary();
      fetchTrend();
    } catch (err) {
      console.error("Failed to add record", err);
    }
  };

  const exportCSV = () => {
    window.open('http://localhost:3001/charging-export/csv', '_blank');
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: darkMode ? '#1e1e1e' : '#fff',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  const thStyle = {
    textAlign: 'center',
    padding: '12px',
    borderBottom: '1px solid #ccc',
  };

  const tdStyle = {
    textAlign: 'center',
    padding: '10px 12px',
    borderBottom: '1px solid #eee',
  };

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'sans-serif',
      backgroundColor: darkMode ? '#121212' : '#f4f4f4',
      color: darkMode ? '#eee' : '#222'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button onClick={exportCSV}>📤 Export CSV</button>
      </div>

      <ForecastAI />
      <ForecastUsage />

      {role !== 'viewer' && (
        <form onSubmit={submitRecord} style={cardStyle}>
          <h3>Add Charging Record</h3>
          <p><strong>Last Reading:</strong> {lastReading}</p>
          <input type="number" step="0.01" placeholder="Reading After"
            value={form.readingAfter}
            onChange={e => setForm({ ...form, readingAfter: e.target.value })}
            required style={{ width: '100%', padding: 8, marginBottom: 8 }} />

          <input type="number" step="0.01" placeholder="Price per kWh"
            value={form.kwhPrice || lastPricePerKwh}
            onChange={e => setForm({ ...form, kwhPrice: e.target.value })}
            required style={{ width: '100%', padding: 8, marginBottom: 8 }} />

          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required style={{ flex: 1, padding: 8 }} />
            <button type="button" onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              setForm({ ...form, date: today });
            }} style={{ padding: '8px 12px' }}>Today</button>
          </div>

          <button type="submit" style={{
            marginTop: 12,
            width: '100%',
            padding: 10,
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 6
          }}>Add Record</button>
        </form>
      )}

      {summary && (
        <div style={cardStyle}>
          <h3>📊 Monthly Summary</h3>
          <ul>
            <li><strong>Total Charged:</strong> {summary.totalCharged.toFixed(2)} kWh</li>
            <li><strong>Total Cost:</strong> {summary.totalCost.toFixed(2)} RY</li>
            <li><strong>Avg Price:</strong> {summary.avgPrice.toFixed(2)} RY/kWh</li>
          </ul>
        </div>
      )}

      <div style={{ ...cardStyle, display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input type="date" value={filter.from} onChange={(e) => setFilter({ ...filter, from: e.target.value })} />
        <input type="date" value={filter.to} onChange={(e) => setFilter({ ...filter, to: e.target.value })} />
        <button onClick={() => {
          fetchSummary();
          fetchTrend();
        }}>Apply Filter</button>
      </div>

      <div style={cardStyle}>
        <h3>📈 Charging Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalCharged" stroke="#10b981" />
            <Line type="monotone" dataKey="price" stroke="#6366f1" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={cardStyle}>
        <h3>📋 All Records</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ backgroundColor: darkMode ? '#333' : '#eee' }}>
                <th style={thStyle}>Before</th>
                <th style={thStyle}>After</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, index) => (
                <tr key={r.id || index}>
                  <td style={tdStyle}>{r.readingBefore}</td>
                  <td style={tdStyle}>{r.readingAfter}</td>
                  <td style={tdStyle}>{r.totalCharged.toFixed(2)}</td>
                  <td style={tdStyle}>{r.price.toFixed(2)}</td>
                  <td style={tdStyle}>{new Date(r.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 'bold', background: darkMode ? '#222' : '#f4f4f4' }}>
                <td colSpan={2} style={tdStyle}>Total</td>
                <td style={tdStyle}>
                  {records.reduce((sum, r) => sum + r.totalCharged, 0).toFixed(2)}
                </td>
                <td style={tdStyle}>
                  {records.reduce((sum, r) => sum + r.price, 0).toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
