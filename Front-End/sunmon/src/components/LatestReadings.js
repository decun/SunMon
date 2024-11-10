import React from 'react';
import { useData } from '../hooks/useData';

const LatestReadings = () => {
  const { temperatures, voltages, loading } = useData();

  if (loading) {
    return <div className="animate-pulse">Cargando últimas lecturas...</div>;
  }

  const getLatestReadings = () => {
    return [
      {
        id: 1,
        temp: temperatures[0]?.temp || 'N/A',
        voltage: voltages[0]?.voltage || 'N/A',
        timestamp: new Date().toLocaleString()
      },
      {
        id: 2,
        temp: temperatures[1]?.temp || 'N/A',
        voltage: voltages[1]?.voltage || 'N/A',
        timestamp: new Date().toLocaleString()
      },
      {
        id: 3,
        temp: temperatures[2]?.temp || 'N/A',
        voltage: voltages[2]?.voltage || 'N/A',
        timestamp: new Date().toLocaleString()
      }
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Últimas Lecturas</h2>
      <div className="space-y-4">
        {getLatestReadings().map(reading => (
          <div key={reading.id} className="border-b pb-2">
            <h3 className="font-semibold">Panel #{reading.id}</h3>
            <p>Temperatura: {reading.temp}°C</p>
            <p>Voltaje: {reading.voltage}V</p>
            <p className="text-sm text-gray-500">{reading.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReadings; 