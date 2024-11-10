// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import NodeDetail from './components/NodeDetail';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Página principal - Dashboard */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Página de detalle de nodo */}
              <Route path="/node/:nodeId" element={<NodeDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
