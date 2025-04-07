import Image from 'next/image'
import { useMemo } from 'react'

export function ProfileGallery({ profile, onImageClick }) {
  // Memoizar el procesamiento de imágenes para evitar cálculos innecesarios en cada renderizado
  const { mainImage, additionalImages } = useMemo(() => {
    // Asegurar que tenemos un array de imágenes válido
    const images = Array.isArray(profile.images) ? profile.images : []
    
    // Usar un placeholder si no hay imágenes
    const formattedImages = images.length > 0 ? images : ['/placeholder.svg'] 
    
    return {
      mainImage: formattedImages[0],
      additionalImages: formattedImages.slice(1)
    }
  }, [profile.images])
  
  return (
    <div>
      <div className='aspect-video relative rounded-lg overflow-hidden mb-4 border border-[#3A3A3A]'>
        <Image
          src={mainImage}
          alt={`Trabajo de ${profile.name || 'profesional'}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true} // Cargar la imagen principal con prioridad
          className='object-cover'
          loading="eager"
        />
      </div>
      {additionalImages.length > 0 && (
        <div className='grid grid-cols-3 gap-2'>
          {additionalImages.map((image, index) => (
            <button
              key={index}
              className='aspect-square relative rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#33CCFF] border border-[#3A3A3A]'
              onClick={() => onImageClick(image)}
            >
              <Image
                src={image}
                alt={`Trabajo de ${profile.name || 'profesional'} ${index + 2}`}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                loading="lazy" // Carga diferida para imágenes secundarias
                className='object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}