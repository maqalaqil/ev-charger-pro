import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForecastUsage = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    axios.get('http://ec2-3-248-227-129.eu-west-1.compute.amazonaws.com:3001/ai/forecast/usage')
      .then(res => setForecast(res.data))
      .catch(() => setForecast({ error: "Failed to load forecast" }));
  }, []);

  if (!forecast) return <p>Loading usage forecast...</p>;
  if (forecast.error) return <p style={{ color: 'red' }}>{forecast.error}</p>;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <h2>📊 Usage Forecast (Next 30 Days)</h2>
      <p><strong>Estimated Total:</strong> {forecast.predicted_total_kwh} kWh</p>
      <p><strong>Daily Avg:</strong> {forecast.avg_kwh_per_day} kWh/day</p>
      <p><small>Based on last {forecast.based_on_days} days of usage</small></p>
    </div>
  );
};

export default ForecastUsage;
