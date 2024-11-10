import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';

const NodeMap = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const { nodes, updateNodePosition, addNode, removeNode, temperatures } = useData();

  // Constantes para los límites (reduciendo el tamaño del nodo)
  const NODE_SIZE = 32; // 8 * 4 (w-8 h-8 en Tailwind)
  const MARGIN = 10;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setIsEditMode(true);
    };
    reader.readAsDataURL(file);
  };

  const handleMapClick = (e) => {
    if (!isEditMode || draggedNode) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Solo crear nodo si se hizo clic directamente en el mapa
    if (e.target === mapRef.current) {
      addNode(x, y);
    }
  };

  const handleNodeDelete = (e, nodeId) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar este nodo?')) {
      removeNode(nodeId);
    }
  };

  const handleDragStart = (e, node) => {
    if (!isEditMode) return;
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    setDraggedNode(node);
  };

  const calculateBoundedPosition = (clientX, clientY) => {
    const rect = mapRef.current.getBoundingClientRect();
    
    // Calcular los límites en píxeles
    const minX = 10;
    const maxX = rect.width - 10;
    const minY = 10;
    const maxY = rect.height - 10;

    // Calcular la posición actual en píxeles
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;

    // Aplicar límites
    const boundedX = Math.min(Math.max(rawX, minX), maxX);
    const boundedY = Math.min(Math.max(rawY, minY), maxY);

    // Convertir a porcentajes
    const x = (boundedX / rect.width) * 100;
    const y = (boundedY / rect.height) * 100;

    return { x, y };
  };

  const handleDrag = (e) => {
    if (!isEditMode || !draggedNode || !e.clientX || !e.clientY) return;
    e.preventDefault();

    const { x, y } = calculateBoundedPosition(e.clientX, e.clientY);
    updateNodePosition(draggedNode.id, x, y);
  };

  const handleDragEnd = () => {
    setDraggedNode(null);
  };

  if (!selectedImage) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Primero sube una imagen del mapa</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-md ${
              isEditMode 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {isEditMode ? 'Finalizar Edición' : 'Editar Nodos'}
          </button>
          <button
            onClick={() => setSelectedImage(null)}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cambiar Imagen
          </button>
        </div>
      </div>
      
      <div 
        ref={mapRef}
        className={`relative h-[600px] bg-gray-100 rounded overflow-hidden ${
          isEditMode ? 'cursor-crosshair' : 'cursor-pointer'
        }`}
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={handleMapClick}
        onDragOver={(e) => e.preventDefault()}
      >
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200`}
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              cursor: isEditMode ? 'move' : 'pointer'
            }}
            draggable={isEditMode}
            onDragStart={(e) => handleDragStart(e, node)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onClick={(e) => {
              e.stopPropagation();
              if (!isEditMode) navigate(`/node/${node.id}`);
            }}
          >
            <div className={`
              bg-blue-500 text-white rounded-full w-full h-full 
              flex items-center justify-center text-sm
              hover:bg-blue-600 transition-colors
              ${isEditMode ? 'ring-2 ring-yellow-400' : ''}
              ${draggedNode?.id === node.id ? 'opacity-50' : ''}
            `}>
              {node.id}
              {isEditMode && (
                <button
                  onClick={(e) => handleNodeDelete(e, node.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-red-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs">
              {temperatures.find(t => t.nodeId === node.id)?.temp || 'N/A'}°C
            </div>
          </div>
        ))}
        
        {isEditMode && (
          <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold text-sm mb-2">Modo Edición Activo</h3>
            <ul className="text-xs text-gray-600">
              <li>• Haz clic en el mapa para añadir un nodo</li>
              <li>• Arrastra los nodos para reubicarlos</li>
              <li>• Haz clic en × para eliminar un nodo</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeMap;