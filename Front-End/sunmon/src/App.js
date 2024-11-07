// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import MapView from './components/MapView';
import Footer from './components/Footer';
import TemperatureChart from './components/TemperatureChart'; // Importa el nuevo componente

function App() {
  const [temperatures, setTemperatures] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Función para obtener las temperaturas
  const fetchTemperatures = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensors/temperatures');
      setTemperatures(response.data); // Simplemente toma los datos y los almacena
    } catch (error) {
      console.error('Error al obtener las temperaturas:', error);
    }
  };

  // Función para obtener las fotos
  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensors/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
    }
  };

  // Cargar datos cuando se monta el componente
  useEffect(() => {
    fetchTemperatures();
    fetchPhotos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">

        {/* Funcionalidad del mapa */}
        <MapView />

        {/* Tabla para mostrar las temperaturas */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Datos de Temperaturas</h2>
          <table className="table-auto w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Timestamp</th>
                <th className="border border-gray-400 px-4 py-2">Temperatura (°C)</th>
              </tr>
            </thead>
            <tbody>
              {temperatures.length > 0 ? (
                temperatures.map((temp, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">{temp._id}</td>
                    <td className="border border-gray-400 px-4 py-2">{temp.timestamp}</td>
                    <td className="border border-gray-400 px-4 py-2">{temp.temp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border border-gray-400 px-4 py-2 text-center">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Gráfica de Temperaturas */}
        <TemperatureChart data={temperatures} />

        {/* Tabla para mostrar las fotos */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Fotos Recibidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <div key={index} className="border border-gray-400 p-4">
                  <p><strong>ID:</strong> {photo._id}</p>
                  <p><strong>Node ID:</strong> {photo.node_Id}</p>
                  <img src={`data:image/jpeg;base64,${photo.photo}`} alt="Foto" className="w-full h-auto mt-2" />
                  <p><strong>Timestamp:</strong> {photo.timestamp}</p>
                </div>
              ))
            ) : (
              <p>No hay fotos disponibles</p>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default App;
