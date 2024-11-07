// src/components/TemperatureChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TemperatureChart({ data }) {
  // Formatear los datos si es necesario
  const formattedData = data.map(item => ({
    ...item,
    // Asegúrate de que el timestamp esté en un formato legible, por ejemplo, solo la fecha y hora
    timestamp: new Date(item.timestamp).toLocaleString(),
  }));

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Gráfica de Temperaturas</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={formattedData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
