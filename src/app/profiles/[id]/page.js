'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, X, Volume2, VolumeX } from 'lucide-react'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
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
  const [reviewTextModalOpen, setReviewTextModalOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [reviewsError, setReviewsError] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  const profileApiUrl = useMemo(() => `/api/profiles/${id}`, [id])
  const reviewsApiUrl = useMemo(() => `/api/reviews?profileId=${id}`, [id])

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

  const handleCreateReview = useCallback(() => {
    // Siempre mostramos el modal de reseña con las opciones primero
    setIsReviewModalOpen(true)
  }, [])

  const handleSubmitReview = useCallback(async () => {
    // Ahora permitimos reseñas anónimas o con sesión
    if (!reviewText.trim()) return

    try {
      const reviewData = {
        profileId: id,
        author: session?.user?.name || 'Anónimo',
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

          // Cerrar todos los modales
          setReviewTextModalOpen(false)
          setIsReviewModalOpen(false)

          // Reiniciar valores
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
    setIsReviewModalOpen(false)

    // Si ya tiene sesión iniciada, mostrar directamente el formulario de reseña
    if (session?.user) {
      setReviewTextModalOpen(true)
    } else {
      // Si no tiene sesión, guardar estado y redirigir a login
      localStorage.setItem('wantsToReview', 'true')
      signIn('twitch', { callbackUrl: window.location.href })
    }
  }, [session])

  // Verificar si el usuario regresa después de autenticarse y quería dejar una reseña
  useEffect(() => {
    if (session?.user && localStorage.getItem('wantsToReview') === 'true') {
      // Limpiar el flag
      localStorage.removeItem('wantsToReview')
      // Mostrar el modal de reseña de texto directamente
      setReviewTextModalOpen(true)
    }
  }, [session])

  const handleAnonymousContinue = useCallback(() => {
    // Mostrar el formulario para añadir reseña como anónimo
    setReviewTextModalOpen(true)
  }, [])

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image)
  }, [])
  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  const starsArray = useMemo(() => {
    const avgRating = profile?.rating || 0

    return Array.from({ length: 5 }).map((_, i) => {
      if (i < Math.floor(avgRating)) {
        return { key: i, filled: true, partial: false }
      } else if (i === Math.floor(avgRating) && avgRating % 1 !== 0) {
        return { key: i, filled: true, partial: true }
      } else {
        return { key: i, filled: false, partial: false }
      }
    })
  }, [profile?.rating])
  // Función para manejar el silencio del audio
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !isMuted
      audioRef.current.muted = newMutedState
      setIsMuted(newMutedState)
      if (!newMutedState) {
        // Si se desmutea, intenta reproducir el audio
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {}) // Silencia el error si el navegador bloquea el autoplay
        }
      }
    }
  }, [isMuted])

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
          <p className='mb-4 text-white/70'>{error || 'No se pudo cargar este perfil'}</p>{' '}
          <Button variant='ghost' onClick={handleGoBack} className='text-[#33CCFF] hover:text-white hover:bg-[#33CCFF]/20'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Volver
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Audio especial para el perfil 9 */}
      {id === '9' && <audio ref={audioRef} src='/chicken_remix.mp3' autoPlay loop style={{ display: 'none' }} />}
      <Navbar />
      <div className='container mx-auto px-4 py-8 text-white'>
        <Button variant='ghost' onClick={handleGoBack} className='mb-6 text-[#33CCFF] hover:text-white hover:bg-[#33CCFF]/20'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Volver
        </Button>
        <div className='grid md:grid-cols-2 gap-8'>
          <ProfileGallery profile={profile} onImageClick={handleImageClick} />

          <div>
            <ProfileHeader profile={profile} onContactClick={() => setIsVideoModalOpen(true)} showMusicControl={id === '9'} isMuted={isMuted} onToggleMute={toggleMute} />

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

        {isReviewModalOpen && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' onClick={() => setIsReviewModalOpen(false)}>
            <div className='bg-[#1E1E1E] p-6 rounded-lg max-w-lg w-full border border-[#33CCFF]/30' onClick={(e) => e.stopPropagation()}>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-[#33CCFF]'>Crear Reseña</h3>
                <Button variant='ghost' size='icon' onClick={() => setIsReviewModalOpen(false)} className='text-white hover:bg-white/10 h-8 w-8'>
                  <X className='h-5 w-5' />
                </Button>
              </div>

              <div className='mb-4'>
                <p className='text-white mb-2'>Tu reseña aparecerá como:</p>
                <p className='text-gray-300 mb-4'>{session?.user?.name || 'Anónimo'}</p>
              </div>

              <div className='flex justify-end gap-2'>
                {!session?.user && (
                  <Button variant='outline' onClick={handleAnonymousContinue} className='border border-[#33CCFF] text-[#33CCFF] hover:bg-[#33CCFF]/10'>
                    Anónimo
                  </Button>
                )}
                <Button className='bg-[#33CCFF] text-black font-medium hover:bg-[#33CCFF]/80' onClick={handleLoginRedirect}>
                  {session?.user ? 'Continuar' : 'Con Twitch'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {reviewTextModalOpen && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' onClick={() => setReviewTextModalOpen(false)}>
            <div className='bg-[#1E1E1E] p-6 rounded-lg max-w-lg w-full border border-[#33CCFF]/30' onClick={(e) => e.stopPropagation()}>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-[#33CCFF]'>Añadir Reseña</h3>
                <Button variant='ghost' size='icon' onClick={() => setReviewTextModalOpen(false)} className='text-white hover:bg-white/10 h-8 w-8'>
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

              <div className='mb-4'>
                <textarea
                  className='w-full p-2 rounded-lg bg-[#2A2A2A] text-white border border-[#33CCFF]/30 focus:outline-none focus:ring-2 focus:ring-[#33CCFF]'
                  rows={4}
                  placeholder='Escribe tu reseña aquí...'
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <div className='flex justify-end'>
                <Button className='bg-[#33CCFF] text-black font-medium hover:bg-[#33CCFF]/80' onClick={handleSubmitReview}>
                  Enviar Reseña
                </Button>
              </div>
            </div>
          </div>
        )}

        {isLoginModalOpen && (
          <div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50' onClick={() => setIsLoginModalOpen(false)}>
            <div className='bg-[#1E1E1E] p-6 rounded-lg max-w-md w-full border border-[#3A3A3A]' onClick={(e) => e.stopPropagation()}>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-[#33CCFF]'>Iniciar sesión para continuar</h3>
                <Button variant='ghost' size='icon' onClick={() => setIsLoginModalOpen(false)} className='text-white hover:bg-white/10 h-8 w-8'>
                  <X className='h-5 w-5' />
                </Button>
              </div>
              <p className='text-gray-300 mb-4'>Para dejar una reseña, necesitas iniciar sesión con tu cuenta de Twitch.</p>
              <div className='flex justify-end'>
                <Button onClick={() => signIn('twitch')} className='bg-[#33CCFF] text-black font-medium hover:bg-[#33CCFF]/80'>
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
