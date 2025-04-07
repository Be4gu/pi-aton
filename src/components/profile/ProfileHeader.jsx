import { Star, Heart, Shield, Package, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'

export function ProfileHeader({ profile, onContactClick }) {
  // Memoizar todos los cálculos de valores para evitar recálculos innecesarios
  const profileData = useMemo(() => {
    // Asegurar valores seguros para evitar errores de hidratación
    // Si hay reseñas, mostrar el rating guardado, si no hay reseñas (reviews === 0) forzar rating a 0
    const reviews = typeof profile.reviews === 'number' ? profile.reviews : 0
    const rating = reviews > 0 ? (typeof profile.rating === 'number' ? profile.rating : 0) : 0
    
    // Siempre usar reliability de la base de datos o 0 si no existe
    const reliability = typeof profile.reliability === 'number' 
      ? profile.reliability 
      : (typeof profile.reliability === 'string' ? parseFloat(profile.reliability) : 0)
    
    // Calcular el porcentaje una vez para asegurar consistencia
    const reliabilityPercent = Math.round(reliability * 100)
    
    // Usar completed_orders de DB si existe, o completedOrders como fallback, o 0
    const completedOrders = typeof profile.completed_orders === 'number' 
      ? profile.completed_orders 
      : (typeof profile.completedOrders === 'number' ? profile.completedOrders : 0)

    // Generar el array de estrellas una sola vez con soporte para valoraciones decimales
    const starsArray = Array.from({ length: 5 }).map((_, i) => {
      // Para cada estrella, determinar si está completamente llena, parcialmente llena o vacía
      if (i < Math.floor(rating)) {
        return { key: i, filled: true, partial: false, index: i } // Estrella completa
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        return { key: i, filled: true, partial: true, percentage: Math.round((rating % 1) * 100), index: i } // Estrella parcial
      } else {
        return { key: i, filled: false, partial: false, index: i } // Estrella vacía
      }
    })

    return {
      rating,
      reviews,
      reliabilityPercent,
      completedOrders,
      starsArray
    }
  }, [profile.rating, profile.reviews, profile.reliability, profile.completedOrders, profile.completed_orders])

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4 text-primary-blue'>{profile.name}</h1>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <div className='flex items-center mb-2'>
            {profileData.starsArray.map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < profile.rating ? 'fill-[#33CCFF] text-[#33CCFF]' : 'text-[#3A3A3A]'}`} />
            ))}
            <span className='ml-2 text-sm text-gray-400'>({profileData.reviews} reseñas)</span>
          </div>
        </div>
        <div className='text-right md:block hidden'>
          <div className='text-2xl font-bold text-[#33CCFF]'>{profile.price}</div>
          <div className='text-sm text-gray-400'>por servicio</div>
        </div>
      </div>

      {/* Sección destacada de fiabilidad, encargos completados y precio */}
      <div className='flex flex-wrap gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333] mb-6'>
        <div className='flex-1 min-w-[120px] flex items-center gap-2'>
          <Shield className='w-5 h-5 text-[#33CCFF] flex-shrink-0' />
          <div>
            <div className='text-lg font-bold text-white'>{profileData.reliabilityPercent}%</div>
            <div className='text-sm text-gray-300'>Fiabilidad</div>
          </div>
        </div>
        
        <div className='flex-1 min-w-[120px] flex items-center gap-2'>
          <Package className='w-5 h-5 text-[#33CCFF] flex-shrink-0' />
          <div>
            <div className='text-lg font-bold text-white'>{profileData.completedOrders}</div>
            <div className='text-sm text-gray-300'>Encargos Completados</div>
          </div>
        </div>
        
        <div className='flex-1 min-w-[120px] flex items-center gap-2 md:hidden'>
          <DollarSign className='w-5 h-5 text-[#33CCFF] flex-shrink-0' />
          <div>
            <div className='text-lg font-bold text-white'>{profile.price}</div>
            <div className='text-sm text-gray-300'>por servicio</div>
          </div>
        </div>
      </div>

      <p className='text-gray-300 mb-6'>{profile.description}</p>
      <div className='flex gap-2 mb-6'>
        <Button
          className='flex-1 bg-primary-blue hover:bg-[#33CCFF] text-white'
          onClick={onContactClick}
        >
          Contactar
        </Button>
      </div>
    </div>
  )
}