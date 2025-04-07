import Image from "next/image";
import { useState, useEffect } from "react";

export function ImagePreview({ isOpen, onClose, imageUrl, images, alt }) {
  // Inicializar el índice actual basado en la imagen que se está mostrando
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array de imágenes para el carrusel (si no se proporciona, usar la única imagen)
  const imageArray = Array.isArray(images) && images.length > 0 
    ? images 
    : imageUrl ? [imageUrl] : [];
  
  // Actualizar el índice cuando cambie la imagen abierta
  useEffect(() => {
    if (imageUrl && Array.isArray(images)) {
      const index = images.indexOf(imageUrl);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [imageUrl, images]);
  
  // Si no está abierto o no hay imágenes, no mostrar nada
  if (!isOpen || imageArray.length === 0) return null;
  
  // Funciones para navegar entre imágenes
  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Imagen actual para mostrar
  const currentImage = imageArray[currentIndex];
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
        {/* Botón de cierre */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#1E1E1E] text-white rounded-full p-2 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        {/* Botón anterior */}
        {imageArray.length > 1 && (
          <button 
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
        
        {/* Botón siguiente */}
        {imageArray.length > 1 && (
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        )}
        
        <div className="rounded-lg overflow-hidden h-auto max-h-[80vh] w-auto max-w-full">
          <Image
            src={currentImage}
            alt={`${alt || 'Imagen'} ${currentIndex + 1} de ${imageArray.length}`}
            width={1000}
            height={600}
            className="object-contain max-h-[75vh] w-auto h-auto"
            style={{ maxWidth: '100%', maxHeight: '75vh' }}
          />
        </div>
        
        {/* Indicador de posición */}
        {imageArray.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {currentIndex + 1} / {imageArray.length}
          </div>
        )}
      </div>
    </div>
  );
}