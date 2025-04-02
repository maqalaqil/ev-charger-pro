import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLogin = ({ token, role }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken('');
    setRole('');
  };

  const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
  
    const toggleLang = () => {
      const newLang = i18n.language === 'ar' ? 'en' : 'ar';
      i18n.changeLanguage(newLang);
      document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };
  
    return (
      <button
        onClick={toggleLang}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          border: 'none',
          color: '#fff',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {t('toggleLang')}
      </button>
    );
  };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div>
      {/* ✅ Clean Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#fff',
        borderBottom: '2px solid #f0f0f0',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.6rem', color: '#333' }}>
          ⚡ EV Charger Tracker
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'red',
              fontWeight: '600',
              marginRight: '12px',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
            }}
          >
            🔓 Logout
          </button>

          <LanguageSwitcher />
        </div>
      </nav>

      {/* Main Dashboard */}
      <Dashboard token={token} role={role} />
    </div>
  );
};

export default App;
