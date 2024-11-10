// src/components/TemperatureChart.js
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const TemperatureChart = ({ data }) => {
  // Procesar y formatear los datos
  const formattedData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    temperatura: parseFloat(item.temp).toFixed(1)
  })).slice(-24); // Mostrar últimas 24 lecturas

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#666' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#666' }}
            domain={['auto', 'auto']}
            label={{
              value: 'Temperatura (°C)',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#666' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            labelStyle={{ color: '#666' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '10px'
            }}
          />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Temperatura"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
