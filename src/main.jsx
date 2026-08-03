import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';   // ← tokens.css is imported inside global.css already

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);