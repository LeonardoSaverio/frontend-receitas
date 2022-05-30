import React from 'react';
import './global.css'

import { AuthProvider } from "./contexts/auth";
import IndexRoutes from './routes';

function App() {
  return (
    <>
      <AuthProvider>
        <IndexRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
