// PURGE ALL LEGACY FREE/STAR PREVIEW UNLOCKS (MANDATORY 100% PAID ENFORCEMENT)
try {
  localStorage.removeItem('scopelock_paid_verified_v2');
  localStorage.removeItem('has_starred');
  localStorage.removeItem('github_starred');
  localStorage.removeItem('scopelock_preview_unlocked');
} catch (e) {
  // ignore
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
