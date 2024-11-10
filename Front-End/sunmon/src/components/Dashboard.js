import React from 'react';
import NodeMap from './NodeMap';
import SystemOverview from './SystemOverview';
import LatestReadings from './LatestReadings';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Panel superior con resumen del sistema */}
      <SystemOverview />

      {/* Mapa de nodos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NodeMap />
        </div>
        <div className="lg:col-span-1">
          <LatestReadings />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 