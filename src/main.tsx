import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("main.tsx script execution started");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("CRITICAL: Failed to find the root element with ID 'root'");
} else {
  console.log("Root element found, initializing React...");
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
