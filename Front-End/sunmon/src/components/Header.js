import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../hooks/useData';

const Header = () => {
  const location = useLocation();
  const { loading, error, refreshData } = useData();

  const navigation = [
    { name: 'Dashboard', path: '/' },
    { name: 'Configuración', path: '/settings' },
    { name: 'Análisis', path: '/analysis' },
  ];

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="SunMon Logo" 
                className="h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16"
              />
              <span className="text-xl font-bold text-gray-800">SunMon</span>
            </Link>
          </div>

          {/* Navegación principal */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                } px-3 py-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Controles del lado derecho */}
          <div className="flex items-center space-x-4">
            {/* Botón de actualización */}
            <button
              onClick={refreshData}
              disabled={loading}
              className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md 
                ${loading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}
            >
              <svg 
                className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>

            {/* Indicador de estado */}
            {error ? (
              <span className="text-red-600 text-sm">
                Error de conexión
              </span>
            ) : (
              <span className="text-green-600 text-sm">
                Conectado
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
