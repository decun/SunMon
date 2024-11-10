import React, { useState } from 'react';
import PanelDataView from './PanelDataView';
import './MapView.css';

const MapView = ({ temperatures, photos, voltages }) => {
  const [selectedPanel, setSelectedPanel] = useState(null);

  const handlePanelClick = (panelId) => {
    setSelectedPanel(panelId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {selectedPanel === null ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Solar Panel Locations</h2>
          <div className="bg-gray-300 h-96 rounded-lg relative">
            <img
              src={`${process.env.PUBLIC_URL}/images/Map.jpg`}
              alt="Solar Panels Map"
              className="w-full h-full object-cover"
            />
            <div className="node" style={{ top: '70%', left: '30%' }} onClick={() => handlePanelClick(1)}>
              <span className="tooltip">Panel #1</span>
            </div>
            <div className="node" style={{ top: '40%', left: '50%' }} onClick={() => handlePanelClick(2)}>
              <span className="tooltip">Panel #2</span>
            </div>
            <div className="node" style={{ top: '60%', left: '70%' }} onClick={() => handlePanelClick(3)}>
              <span className="tooltip">Panel #3</span>
            </div>
          </div>
        </>
      ) : (
        <PanelDataView panelId={selectedPanel} data={temperatures} photos={photos} voltages={voltages} />
      )}
    </div>
  );
};

export default MapView;
