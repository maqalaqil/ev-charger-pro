import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';import './i18n'; // Make sure the i18n configuration is imported
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // T

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}