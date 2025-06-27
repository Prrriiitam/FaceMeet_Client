import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketProvider';
import { GoogleOAuthProvider } from "@react-oauth/google";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <SocketProvider>
    <App />
  </SocketProvider>
  </GoogleOAuthProvider>
    </BrowserRouter>
);
