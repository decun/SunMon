const ImageViewer = ({ isOpen, onClose, image, title }) => {
  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full h-full p-4 md:p-8">
        {/* Controles superiores */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent">
          {/* Título */}
          <div className="text-white px-4 py-2 rounded text-lg font-semibold">
            {title}
          </div>
          
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenedor de la imagen con scroll si es necesario */}
        <div className="w-full h-full flex items-center justify-center overflow-auto">
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="max-w-none h-auto"
              style={{
                maxHeight: 'calc(100vh - 6rem)',
                maxWidth: 'calc(100vw - 6rem)'
              }}
            />
          </div>
        </div>

        {/* Indicador de click para cerrar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
          
        </div>
      </div>
    </div>
  );
};

export default ImageViewer; 