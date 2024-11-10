import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import TemperatureChart from './TemperatureChart';
import VoltageChart from './VoltageChart';

const PanelDataView = ({ panelId, data, photos = [], voltages = [] }) => {
  // Obtener la última foto
  const lastPhoto = photos.length > 0 ? photos[photos.length - 1] : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Panel #{panelId} Data View</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">Temperature</h3>
          <TemperatureChart data={data} />
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">Voltage</h3>
          <VoltageChart data={voltages} />
        </div>
        <div className="col-span-1 row-span-2">
          <h3 className="text-lg font-semibold mb-2">Problem Detection Image</h3>
          <div className="bg-gray-200 h-full flex items-center justify-center">
            {lastPhoto ? (
              <img
                src={`data:image/jpeg;base64,${lastPhoto.photo}`}
                alt="Panel Solar"
                className="w-full h-full object-cover"
              />
            ) : (
              <p>No hay imagen disponible</p>
            )}
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">Irradiation</h3>
          <LineChart width={300} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="irradiacion" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-2">Current/Voltage</h3>
          <LineChart width={300} height={200} data={data}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="corriente" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="voltaje" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="col-span-1 mt-6">
          <h3 className="text-lg font-semibold mb-2">Panel Info</h3>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Diagnostic Summary:</strong></p>
            <p>No issues detected</p>
            <p><strong>Average Values:</strong></p>
            <p>Temperature: 28°C</p>
            <p>Irradiation: 275 W/m²</p>
            <p>Current: 2.75A</p>
            <p>Voltage: 10.5V</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelDataView;
