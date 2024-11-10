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

const PowerChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No hay datos disponibles
      </div>
    );
  }

  console.log('Datos recibidos:', data); // Para debugging

  const formattedData = data.map(item => {
    // Asegurarse de que los valores sean números
    const currentValue = Number(item.current);
    const powerValue = Number(item.power);

    return {
      time: new Date(item.timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      corriente: isNaN(currentValue) ? 0 : currentValue,
      potencia: isNaN(powerValue) ? 0 : powerValue
    };
  }).slice(-24);

  console.log('Datos formateados:', formattedData); // Para debugging

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
            yAxisId="left"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#666' }}
            domain={['auto', 'auto']}
            label={{
              value: 'Corriente (A)',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#666' }
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#666' }}
            domain={['auto', 'auto']}
            label={{
              value: 'Potencia (W)',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle', fill: '#666' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            formatter={(value, name) => [
              value.toFixed(name === 'corriente' ? 3 : 2),
              name === 'corriente' ? 'A' : 'W'
            ]}
            labelStyle={{ color: '#666' }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '10px'
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="corriente"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Corriente"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="potencia"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Potencia"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PowerChart; 