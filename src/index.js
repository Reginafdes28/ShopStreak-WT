import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Dynamically adding the PayPal script in index.js
const paypalScript = document.createElement('script');
paypalScript.src = "https://www.paypal.com/sdk/js?client-id=ARbP9DI6eIb7gVOCNqUa2BUIYYqZ-IfSkHQsk1c-6EZgb1w9Q3xF26NmBseHNwmE4lZRPVwtBDez3ete&currency=USD"; // Replace with your client ID
paypalScript.async = true;
document.head.appendChild(paypalScript);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
