import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://ec2-3-248-227-129.eu-west-1.compute.amazonaws.com:3001/auth/login', form);
    onLogin({ token: res.data.access_token, role: res.data.user.role });
  };

  return (
    <form onSubmit={login} style={{
      maxWidth: 320,
      margin: "50px auto",
      padding: "2rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      />
      <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "10px" }}>Login</button>
    </form>
    
  );
};

export default Login;