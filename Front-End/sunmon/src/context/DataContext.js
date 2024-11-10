import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [temperatures, setTemperatures] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [voltages, setVoltages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nodes, setNodes] = useState([
    { id: 1, x: 30, y: 70 },
    { id: 2, x: 50, y: 40 },
    { id: 3, x: 70, y: 60 }
  ]);
  const [processedImages, setProcessedImages] = useState([]);

  // Función para actualizar la posición de un nodo
  const updateNodePosition = (nodeId, x, y) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, x, y }
          : node
      )
    );
  };

  // Función para añadir un nuevo nodo
  const addNode = (x, y) => {
    const newId = Math.max(...nodes.map(n => n.id)) + 1;
    setNodes(prevNodes => [...prevNodes, { id: newId, x, y }]);
  };

  // Función para eliminar un nodo
  const removeNode = (nodeId) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
  };

  // Función para obtener las temperaturas
  const fetchTemperatures = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensors/temperatures');
      setTemperatures(response.data);
    } catch (error) {
      console.error('Error al obtener las temperaturas:', error);
      setError('Error al cargar las temperaturas');
    }
  };

  // Función para obtener las fotos
  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensors/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
      setError('Error al cargar las fotos');
    }
  };

  // Función para obtener los voltajes
  const fetchVoltages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensors/voltages');
      setVoltages(response.data);
    } catch (error) {
      console.error('Error al obtener los voltajes:', error);
      setError('Error al cargar los voltajes');
    }
  };

  // Función para actualizar todos los datos
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchTemperatures(),
      fetchPhotos(),
      fetchVoltages()
    ]);
    setLoading(false);
  };

  // Cargar datos iniciales
  useEffect(() => {
    refreshData();
    
    // Actualizar datos cada 5 minutos
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const processImage = async (image) => {
    try {
      const response = await axios.post('http://localhost:5000/api/ml/process-image', {
        imageId: image._id,
        imageBase64: image.photo
      });
      
      setProcessedImages(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{
      temperatures,
      photos,
      voltages,
      loading,
      error,
      refreshData,
      nodes,
      updateNodePosition,
      addNode,
      removeNode,
      processImage,
      processedImages
    }}>
      {children}
    </DataContext.Provider>
  );
};