import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';

const initialImages = [];
const initialIsLoading = false;
const initialError = null;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      initialImages={initialImages}
      initialIsLoading={initialIsLoading}
      initialError={initialError}
    />
  </React.StrictMode>
);



