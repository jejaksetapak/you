import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import ConfigRouter from './router/ConfigRouter';
import './App.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigRouter/>
  </React.StrictMode>
);
reportWebVitals();
