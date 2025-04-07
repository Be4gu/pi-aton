'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, X } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { ReviewCard } from '@/components/profile/ReviewCard'
import { ImagePreview } from '@/components/profile/ImagePreview'
import { ContactModal } from '@/components/profile/ContactModal'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileGallery } from '@/components/profile/ProfileGallery'
import Navbar from '@/components/navbar'

export default function ProfilePage() {
  const router = useRouter()
  const { id } = useParams()
  const { data: session } = useSession()
  const [selectedImage, setSelectedImage] = useState(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [reviewsError, setReviewsError] = useState(null)

  // Memoizar la URL para evitar recreaciones innecesarias
  const profileApiUrl = useMemo(() => `/api/profiles/${id}`, [id])
  const reviewsApiUrl = useMemo(() => `/api/reviews?profileId=${id}`, [id])

  // Factorizar la función fetchProfile usando useCallback para evitar recreaciones
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(profileApiUrl, { next: { revalidate: 300 } })

      if (!response.ok) {
        throw new Error('No se pudo cargar el perfil')
      }

      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Error al obtener el perfil:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [profileApiUrl])

  // Factorizar la función fetchReviews usando useCallback
  const fetchReviews = useCallback(async () => {
    if (!id) return

    try {
      setReviewsLoading(true)
      setReviewsError(null)

      const response = await fetch(reviewsApiUrl, { next: { revalidate: 300 } })

      if (!response.ok) {
        throw new Error('No se pudieron cargar las reseñas')
      }

      const data = await response.json()

      if (data && data.error) {
        throw new Error(data.error)
      }

      setReviews(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error al obtener reseñas:', error)
      setReviewsError('No se pudieron cargar las reseñas. Intente más tarde.')
    } finally {
      setReviewsLoading(false)
    }
  }, [id, reviewsApiUrl])

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id, fetchProfile])

  useEffect(() => {
    if (profile) {
      fetchReviews()
    }
  }, [profile, fetchReviews])

  // Memoizar funciones de manejo de eventos para evitar recreaciones
  const handleCreateReview = useCallback(() => {
    if (session) {
      setIsReviewModalOpen(true)
    } else {
      setIsLoginModalOpen(true)
    }
  }, [session])

  const handleSubmitReview = useCallback(async () => {
    if (!session || !reviewText.trim()) return

    try {
      const reviewData = {
        profileId: id,
        author: session.user.name,
        content: reviewText,
        rating: rating
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      })

      const result = await response.json()

      if (response.ok || response.status === 207) {
        const newReview = result.review || (result.partialSuccess ? result.review : null)

        if (newReview) {
          setReviews((prevReviews) => [newReview, ...prevReviews])

          if (result.profileStats) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              rating: result.profileStats.rating,
              reviews: result.profileStats.reviews
            }))
          }

          setIsReviewModalOpen(false)
          setRating(5)
          setReviewText('')

          if (result.partialSuccess) {
            alert('Tu reseña se guardó correctamente pero hubo un problema al actualizar las estadísticas. La página podría necesitar ser recargada.')
          }

          return
        }
      }

      throw new Error(result.error || 'Error desconocido al enviar la reseña')
    } catch (error) {
      console.error('Error al enviar la reseña:', error)
      alert('Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.')
    }
  }, [session, reviewText, rating, id])

  const handleLoginRedirect = useCallback(() => {
    signIn('twitch', { callbackUrl: window.location.href })
  }, [])

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image)
  }, [])

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  // Usar el campo `rating` directamente del perfil para renderizar las estrellas
  const starsArray = useMemo(() => {
    const avgRating = profile?.rating || 0 // Usar el rating del perfil

    return Array.from({ length: 5 }).map((_, i) => {
      if (i < Math.floor(avgRating)) {
        return { key: i, filled: true, partial: false } // Estrella completa
      } else if (i === Math.floor(avgRating) && avgRating % 1 !== 0) {
        return { key: i, filled: true, partial: true } // Estrella parcial
      } else {
        return { key: i, filled: false, partial: false } // Estrella vacía
      }
    })
  }, [profile?.rating])

  // Componentes cargando y error
  if (loading) {
    return (
      <>
        <Navbar />
        <div className='container mx-auto px-4 py-8 text-white'>
          <div className='flex items-center justify-center h-64'>
            <p className='text-xl text-[#33CCFF]'>Cargando perfil...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !profile) {
    return (
      <>
        <Navbar />
        <div className='container mx-auto px-4 py-8 text-white'>
          <h1 className='text-2xl font-bold mb-4 text-[#33CCFF]'>Perfil no encontrado</h1>
          <p className='mb-4 text-white/70'>{error || 'No se pudo cargar este perfil'}</p>
          <Button variant='ghost' onClick={handleGoBack} className='text-[#33CCFF] hover:text-white hover:bg-[#33CCFF]/20'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Volver
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 py-8 text-white'>
        <Button variant='ghost' onClick={handleGoBack} className='mb-6 text-[#33CCFF] hover:text-white hover:bg-[#33CCFF]/20'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Volver
        </Button>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Columna izquierda - Galería de imágenes */}
          <ProfileGallery profile={profile} onImageClick={handleImageClick} />

          {/* Columna derecha - Información del perfil */}
          <div>
            <ProfileHeader profile={profile} onContactClick={() => setIsVideoModalOpen(true)} />

            <div className='flex justify-between items-center mb-4 mt-6'>
              <h3 className='text-xl font-semibold text-[#33CCFF]'>Reseñas recientes</h3>
              <Button onClick={handleCreateReview} variant='outline' className='border-[#33CCFF] text-white bg-[#33CCFF]/20 hover:bg-[#33CCFF]/30 hover:text-white'>
                <Star className='mr-2 h-4 w-4' /> Añadir reseña
              </Button>
            </div>
            <div className={`space-y-4 ${reviews.length > 5 ? 'max-h-[500px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
              {reviewsLoading ? (
                <p className='text-center text-gray-400'>Cargando reseñas...</p>
              ) : reviewsError ? (
                <p className='text-center text-red-500'>{reviewsError}</p>
              ) : reviews.length > 0 ? (
                reviews.map((review, index) => <ReviewCard key={review.id || index} {...review} />)
              ) : (
                <p className='text-center text-gray-400'>No hay reseñas para este perfil. ¡Sé el primero en dejar una!</p>
              )}
            </div>
          </div>
        </div>

        {/* Modales */}
        {selectedImage && (
          <ImagePreview
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
            imageUrl={selectedImage}
            images={profile?.images || []}
            alt={`Trabajo de ${profile.name}`}
          />
        )}

        {isVideoModalOpen && <ContactModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />}

        {/* Modal para crear reseñas (solo para usuarios con sesión) */}
        {isReviewModalOpen && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' onClick={() => setIsReviewModalOpen(false)}>
            <div className='bg-[#1E1E1E] p-6 rounded-lg max-w-lg w-full border border-[#33CCFF]/30' onClick={(e) => e.stopPropagation()}>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-[#33CCFF]'>Crear Reseña como {session?.user?.name}</h3>
                <Button variant='ghost' size='icon' onClick={() => setIsReviewModalOpen(false)} className='text-white hover:bg-white/10 h-8 w-8'>
                  <X className='h-5 w-5' />
                </Button>
              </div>

              <div className='mb-4'>
                <p className='text-white mb-2'>Valoración:</p>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`cursor-pointer w-8 h-8 ${star <= rating ? 'fill-[#33CCFF] text-[#33CCFF]' : 'text-[#3A3A3A]'}`} onClick={() => setRating(star)} />
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <p className='text-white mb-2'>Comentario:</p>
                <textarea
                  className='w-full bg-[#2A2A2A] text-white border border-[#3A3A3A] rounded p-2 focus:outline-none focus:border-[#33CCFF] min-h-[100px]'
                  placeholder='Comparte tu opinión sobre este profesional...'
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <div className='flex justify-end gap-2'>
                <Button variant='ghost' onClick={() => setIsReviewModalOpen(false)} className='text-white hover:bg-white/10'>
                  Cancelar
                </Button>
                <Button className='bg-[#33CCFF] text-black font-medium hover:bg-[#33CCFF]/80' onClick={handleSubmitReview} disabled={!reviewText.trim()}>
                  Enviar Reseña
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para usuarios sin sesión */}
        {isLoginModalOpen && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' onClick={() => setIsLoginModalOpen(false)}>
            <div className='bg-[#1E1E1E] p-6 rounded-lg max-w-md w-full border border-[#3A3A3A]' onClick={(e) => e.stopPropagation()}>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-[#33CCFF]'>Iniciar sesión para continuar</h3>
                <Button variant='ghost' size='icon' onClick={() => setIsLoginModalOpen(false)} className='text-white hover:bg-white/10 h-8 w-8'>
                  <X className='h-5 w-5' />
                </Button>
              </div>

              <p className='text-gray-300 mb-2'>Para añadir una reseña, necesitas iniciar sesión con tu cuenta de Twitch.</p>
              <p className='text-gray-300 mb-6'>
                Esto se hace para evitar faltas de respeto innecesarias. En caso de que las hubiera, el streamer podrá tomar las medidas necesarias.
              </p>

              <div className='flex justify-end gap-2'>
                <Button variant='ghost' onClick={() => setIsLoginModalOpen(false)} className='text-white hover:bg-white/10'>
                  Cancelar
                </Button>
                <Button className='gradient-btn border-0 text-white font-medium bg-[#33CCFF] hover:bg-[#33CCFF]/80' onClick={handleLoginRedirect}>
                  Iniciar sesión con Twitch
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
