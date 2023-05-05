import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/DarkModeContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <AuthContextProvider>
     <App />
    </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
