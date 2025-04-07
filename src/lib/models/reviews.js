import { query } from '../db'

// Inicializar la tabla de reseñas si no existe
export async function initReviewsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      profile_id VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL,
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await query(createTableQuery)
    console.log('Tabla de reseñas inicializada correctamente')
    return true
  } catch (error) {
    console.error('Error al inicializar tabla de reseñas:', error)
    return false
  }
}

// Obtener todas las reseñas para un perfil
export async function getReviewsByProfileId(profileId) {
  try {
    // Verificar que profileId sea válido antes de hacer la consulta
    if (!profileId) {
      console.error('ProfileId inválido:', profileId)
      return []
    }

    const result = await query('SELECT * FROM reviews WHERE profile_id = $1 ORDER BY date DESC', [profileId])
    return result.rows || []
  } catch (error) {
    console.error(`Error al obtener reseñas para el perfil ${profileId}:`, error)
    return [] // Return empty array instead of throwing error to prevent cascade failures
  }
}

// Crear una nueva reseña
export async function createReview(review) {
  const { profileId, author, content, rating, date } = review

  try {
    const result = await query(
      `INSERT INTO reviews 
        (profile_id, author, content, rating, date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [profileId, author, content, rating, date]
    )

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear reseña:', error)
    throw error
  }
}

// Actualizar el perfil con la nueva valoración media y número de reseñas
export async function updateProfileRatingAndReviews(profileId) {
  try {
    // Obtener el promedio de valoraciones y el conteo de reseñas
    const ratingResult = await query(
      `SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews 
       FROM reviews 
       WHERE profile_id = $1`,
      [profileId]
    )

    const avgRating = parseFloat(ratingResult.rows[0].avg_rating) || 0
    const totalReviews = parseInt(ratingResult.rows[0].total_reviews) || 0

    // Actualizar el perfil con los nuevos datos
    await query(
      `UPDATE profiles 
       SET rating = $1, reviews = $2
       WHERE id = $3`,
      [avgRating.toFixed(1), totalReviews, profileId]
    )

    return {
      rating: avgRating.toFixed(1),
      reviews: totalReviews
    }
  } catch (error) {
    console.error(`Error al actualizar rating y reseñas del perfil ${profileId}:`, error)
    throw error
  }
}
