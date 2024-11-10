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

const VoltageChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  // Procesar y formatear los datos
  const formattedData = data
    .filter(item => item.voltage) // Solo incluir datos que tengan voltaje
    .map(item => ({
      time: new Date(item.timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      voltaje: parseFloat(item.voltage).toFixed(2)
    }))
    .slice(-24); // Mostrar últimas 24 lecturas

  if (formattedData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No hay datos de voltaje disponibles
      </div>
    );
  }

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
              value: 'Voltaje (V)',
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
            dataKey="voltaje"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Voltaje"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoltageChart;