import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForecastAI = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/ai/forecast').then(res => {
      setForecast(res.data);
    });
  }, []);

  if (forecast.length === 0) return null;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <h2>🔮 AI Forecast (Next 10 Days)</h2>
      <table style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Predicted kWh</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((f, i) => (
            <tr key={i}>
              <td>{f.date}</td>
              <td>{f.predicted_kwh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastAI;
