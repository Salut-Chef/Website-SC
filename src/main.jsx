import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from "./Router"

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Router />
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
