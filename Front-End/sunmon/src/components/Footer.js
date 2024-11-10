import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Información del sistema */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">SunMon</h3>
            <p className="text-gray-400 text-sm">
              Sistema de Monitoreo de Paneles Solares
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Versión 1.0.0
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-400 hover:text-white">
                  Documentación
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-white">
                  Soporte
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>soporte@sunmon.com</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+56 9 1234 5678</span>
              </li>
            </ul>
          </div>

          {/* Estado del sistema */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Estado del Sistema</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-400">API Operativa</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-400">Base de Datos Activa</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-400">Sensores Conectados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-8 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {currentYear} SunMon. Todos los derechos reservados.</p>
          <p className="mt-2">
            Desarrollado con ❤️ para el monitoreo de paneles solares
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
