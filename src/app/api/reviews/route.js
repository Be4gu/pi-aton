import { NextResponse } from 'next/server'
import { getReviewsByProfileId, createReview, initReviewsTable, updateProfileRatingAndReviews } from '@/lib/models/reviews'
import { testConnection } from '@/lib/db'

// Inicializar la tabla cuando se carga el API
let initialized = false

async function initialize() {
  if (!initialized) {
    await testConnection()
    await initReviewsTable()
    initialized = true
  }
}

// Función para asegurar que las reseñas tienen un formato consistente
function formatReview(review) {
  // Asegurarse de que review es un objeto
  if (!review || typeof review !== 'object') {
    console.error('Invalid review object:', review)
    return {
      id: null,
      profile_id: null,
      profileId: null,
      author: '',
      content: '',
      rating: 0,
      date: new Date().toISOString().split('T')[0]
    }
  }

  // Handle date formatting to ensure DD-MM-YYYY format
  // Convertir cualquier formato de fecha a DD-MM-YYYY
  let formattedDate
  try {
    // Intentar crear un objeto Date válido desde cualquier entrada
    const dateObj = review.date instanceof Date ? review.date : new Date(review.date || Date.now())

    // Si la fecha es válida, formatearla como DD-MM-YYYY
    if (!isNaN(dateObj.getTime())) {
      const day = String(dateObj.getDate()).padStart(2, '0')
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const year = dateObj.getFullYear()
      formattedDate = `${day}-${month}-${year}`
    } else {
      throw new Error('Invalid date')
    }
  } catch (e) {
    // Si hay cualquier error, usar la fecha actual formateada como DD-MM-YYYY
    const today = new Date()
    formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`
  }

  return {
    id: review.id,
    profile_id: review.profile_id,
    profileId: review.profile_id, // Para consistencia con el frontend
    author: review.author || '',
    content: review.content || '',
    rating: typeof review.rating === 'number' ? review.rating : parseInt(review.rating) || 0,
    date: formattedDate
  }
}

// GET para obtener todas las reseñas de un perfil específico
export async function GET(request) {
  try {
    await initialize()

    // Obtener el ID del perfil de la URL
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get('profileId')

    if (!profileId) {
      return NextResponse.json({ error: 'Se requiere un ID de perfil' }, { status: 400 })
    }

    const reviews = await getReviewsByProfileId(profileId)
    // Formatear las reseñas antes de enviarlas al cliente
    const formattedReviews = reviews.map(formatReview)

    return NextResponse.json(formattedReviews, { status: 200 })
  } catch (error) {
    console.error('Error en GET /api/reviews:', error)
    // Return empty array with 200 status instead of error to prevent UI issues
    return NextResponse.json([], { status: 200 })
  }
}

// POST para crear una nueva reseña
export async function POST(request) {
  let createdReview = null

  try {
    await initialize()
    const data = await request.json()

    // Verificar los datos requeridos
    if (!data.profileId || !data.author || !data.content || !data.rating) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // Usar la fecha actual formateada como YYYY-MM-DD para guardar en la base de datos
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    // Añadir la fecha actual en formato YYYY-MM-DD desde el servidor
    const reviewData = {
      ...data,
      date: formattedDate
    }

    // Crear la reseña en la base de datos
    createdReview = await createReview(reviewData)

    if (!createdReview) {
      throw new Error('No se pudo guardar la reseña en la base de datos')
    }

    // Actualizar el rating y contador de reseñas del perfil
    let updatedStats
    try {
      updatedStats = await updateProfileRatingAndReviews(data.profileId)
    } catch (statsError) {
      console.error('Error al actualizar estadísticas del perfil:', statsError)
      // Continuamos aunque haya error en las estadísticas, la reseña ya se creó
      updatedStats = { rating: 0, reviews: 0 }
    }

    // Formatear la reseña antes de enviarla al cliente
    const formattedReview = formatReview(createdReview)

    // Retornar la reseña creada junto con las estadísticas actualizadas
    return NextResponse.json(
      {
        review: formattedReview,
        profileStats: updatedStats,
        success: true
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error en POST /api/reviews:', error)

    // Si la reseña se creó pero hubo otro error, informamos al cliente
    if (createdReview) {
      return NextResponse.json(
        {
          error: 'La reseña se guardó pero hubo un error al actualizar las estadísticas',
          partialSuccess: true,
          review: formatReview(createdReview)
        },
        { status: 207 }
      ) // 207 Multi-Status para indicar éxito parcial
    }

    return NextResponse.json(
      {
        error: 'Error al crear la reseña: ' + error.message,
        success: false
      },
      { status: 500 }
    )
  }
}
