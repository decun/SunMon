import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const SystemOverview = () => {
  const { temperatures, voltages, loading } = useContext(DataContext);

  if (loading) {
    return <div className="animate-pulse">Cargando datos...</div>;
  }

  // Calcular promedios y otros datos relevantes
  const avgTemperature = temperatures.length > 0
    ? temperatures.reduce((acc, curr) => acc + curr.temp, 0) / temperatures.length
    : 0;

  const avgVoltage = voltages.length > 0
    ? voltages.reduce((acc, curr) => acc + curr.voltage, 0) / voltages.length
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700">Temperatura Promedio</h3>
        <p className="text-3xl font-bold text-blue-600">{avgTemperature.toFixed(1)}°C</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700">Voltaje Promedio</h3>
        <p className="text-3xl font-bold text-green-600">{avgVoltage.toFixed(2)}V</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700">Estado del Sistema</h3>
        <p className="text-3xl font-bold text-emerald-600">Activo</p>
      </div>
    </div>
  );
};

export default SystemOverview; 