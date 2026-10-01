import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');

if (!window.__reactRoot) {
  window.__reactRoot = createRoot(rootElement);
}

window.__reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
