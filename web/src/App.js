import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
