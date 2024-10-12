import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import MapView from './components/MapView';
import Footer from './components/Footer';

function App() {
  // Estado para los datos del sensor (temperatura y humedad)
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  
  // Función para manejar el envío de datos del sensor
  const submitSensorData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/sensors', {
        temperature,
        humidity,
      });
      console.log('Datos enviados correctamente:', response.data);
    } catch (error) {
      console.error('Error enviando los datos:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <MapView />
        
        {/* Formulario para enviar datos del sensor */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Enviar Datos del Sensor</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Temperatura (°C):</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Introduce la temperatura"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Humedad (%):</label>
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Introduce la humedad"
            />
          </div>
          <button
            onClick={submitSensorData}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Enviar Datos
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
