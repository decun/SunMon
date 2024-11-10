import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../hooks/useData';
import TemperatureChart from './TemperatureChart';
import VoltageChart from './VoltageChart';
import PowerChart from './PowerChart';
import ImageViewer from './ImageViewer';

const NodeDetail = () => {
  const { nodeId } = useParams();
  const { temperatures, voltages, photos, loading, processImage } = useData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [processedImageData, setProcessedImageData] = useState(null);
  const [showProcessed, setShowProcessed] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Actualizar índices cuando cambian las fotos
  useEffect(() => {
    if (photos.length > 0) {
      setSelectedImageIndex(photos.length - 1);
      setStartIndex(Math.max(photos.length - 6, 0));
    }
  }, [photos]);

  // Verificar si hay fotos antes de renderizar
  const currentPhoto = photos[selectedImageIndex];
  const hasPhotos = photos.length > 0;

  // Funciones de navegación
  const handleNext = () => {
    if (startIndex + 6 < photos.length) {
      setStartIndex(startIndex + 6);
    }
  };

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 6));
  };

  const handleProcessImage = async (image) => {
    try {
      const result = await processImage(image);
      setProcessedImageData(result);
      setShowProcessed(true);
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
    }
  };

  // Función para abrir el visor
  const handleViewImage = () => {
    setViewerOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          Cargando datos del nodo...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Panel Solar #{nodeId}
        </h1>
        <div className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Gráficos */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperatura */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Temperatura
            </h2>
            <div className="h-[300px]">
              <TemperatureChart data={temperatures} />
            </div>
          </div>

          {/* Voltaje */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Voltaje
            </h2>
            <div className="h-[300px]">
              <VoltageChart data={voltages} />
            </div>
          </div>

          {/* Corriente y Potencia */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Corriente y Potencia
            </h2>
            <div className="h-[300px]">
              <PowerChart data={voltages} />
            </div>
          </div>

          {/* Resumen de datos */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Resumen de Datos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard
                title="Temperatura Actual"
                value={`${temperatures[temperatures.length - 1]?.temp?.toFixed(1) || 'N/A'}°C`}
                trend="up"
              />
              <DataCard
                title="Voltaje Actual"
                value={`${parseFloat(
                  voltages
                    .filter(item => item.voltage)
                    .slice(-1)[0]?.voltage || 0
                ).toFixed(3)}V`}
                trend="stable"
              />
              <DataCard
                title="Corriente Actual"
                value={`${parseFloat(voltages[voltages.length - 1]?.current || 0).toFixed(3)}A`}
                trend="stable"
              />
              <DataCard
                title="Potencia Actual"
                value={`${parseFloat(voltages[voltages.length - 1]?.power || 0).toFixed(2)}W`}
                trend="up"
              />
            </div>
          </div>
        </div>

        {/* Panel lateral con imagen y detalles */}
        <div className="xl:col-span-1 space-y-6">
          {/* Últimas Imágenes */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {showProcessed ? 'Resultado del Análisis' : 'Últimas Imágenes'}
            </h2>
            
            {/* Toggle entre imagen original y procesada */}
            {processedImageData && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowProcessed(!showProcessed)}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  {showProcessed ? 'Ver Original' : 'Ver Análisis'}
                </button>
              </div>
            )}

            {/* Contenedor de imagen con botón de expandir */}
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4 group">
              {showProcessed && processedImageData ? (
                <>
                  <img
                    src={`data:image/jpeg;base64,${processedImageData.processed_image}`}
                    alt="Análisis del panel"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleViewImage}
                    className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                </>
              ) : (
                hasPhotos && currentPhoto && (
                  <>
                    <img
                      src={`data:image/jpeg;base64,${currentPhoto.photo}`}
                      alt={`Estado del panel - ${currentPhoto.timestamp}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleViewImage}
                      className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </button>
                  </>
                )
              )}
            </div>

            {/* Modal del visor de imágenes */}
            <ImageViewer
              isOpen={viewerOpen}
              onClose={() => setViewerOpen(false)}
              image={showProcessed 
                ? `data:image/jpeg;base64,${processedImageData?.processed_image}`
                : `data:image/jpeg;base64,${currentPhoto?.photo}`
              }
              title={showProcessed ? 'Análisis del Panel' : 'Imagen Original'}
            />

            {/* Botón de procesamiento */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                Capturada: {new Date(currentPhoto?.timestamp).toLocaleString() || 'N/A'}
              </div>
              {!showProcessed && (
                <button
                  onClick={() => handleProcessImage(currentPhoto)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={!currentPhoto || processedImageData}
                >
                  {processedImageData ? 'Procesado' : 'Procesar Imagen'}
                </button>
              )}
            </div>
            
            {/* Selector de imágenes con navegación */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className={`p-2 rounded-lg ${
                  startIndex === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="grid grid-cols-6 gap-2 flex-1">
                {photos.slice(startIndex, startIndex + 6).map((photo, index) => (
                  <button
                    key={photo.timestamp}
                    onClick={() => setSelectedImageIndex(startIndex + index)}
                    className={`aspect-w-16 aspect-h-9 rounded overflow-hidden ${
                      selectedImageIndex === startIndex + index
                        ? 'ring-2 ring-blue-500'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={`data:image/jpeg;base64,${photo.photo}`}
                      alt={`Miniatura ${startIndex + index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={startIndex + 6 >= photos.length}
                className={`p-2 rounded-lg ${
                  startIndex + 6 >= photos.length 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Contador de imágenes */}
            <div className="text-sm text-gray-500 mt-2 text-center">
              Imagen {selectedImageIndex + 1} de {photos.length}
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Información del Panel
            </h2>
            <div className="space-y-3">
              <InfoRow label="ID del Panel" value={nodeId} />
              <InfoRow label="Ubicación" value="Sector A-3" />
              <InfoRow label="Instalación" value="15/03/2024" />
              <InfoRow label="Último Mantenimiento" value="01/03/2024" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjetas de datos
const DataCard = ({ title, value, trend }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
};

// Componente para filas de información
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default NodeDetail; 