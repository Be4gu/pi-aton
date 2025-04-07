import { query } from '../db'

// Función para inicializar la tabla de perfiles si no existe
export async function initProfilesTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price VARCHAR(50) NOT NULL,
      rating DECIMAL(3,1) NOT NULL,
      reviews INTEGER NOT NULL,
      reliability DECIMAL(3,2) NOT NULL,
      completed_orders INTEGER NOT NULL,
      images TEXT[] NOT NULL,
      badges TEXT[] NOT NULL
    );
  `

  try {
    await query(createTableQuery)
    console.log('Tabla de perfiles inicializada correctamente')
    return true
  } catch (error) {
    console.error('Error al inicializar tabla de perfiles:', error)
    return false
  }
}

// Obtener todos los perfiles
export async function getAllProfiles() {
  try {
    const result = await query('SELECT * FROM profiles ORDER BY id')
    return result.rows
  } catch (error) {
    console.error('Error al obtener perfiles:', error)
    throw error
  }
}

// Obtener un perfil por ID
export async function getProfileById(id) {
  try {
    const result = await query('SELECT * FROM profiles WHERE id = $1', [id])
    return result.rows[0]
  } catch (error) {
    console.error(`Error al obtener perfil con ID ${id}:`, error)
    throw error
  }
}

// Crear un nuevo perfil
export async function createProfile(profile) {
  const { name, description, price, rating, reviews, reliability, completedOrders, images, badges } = profile

  // Asegurar que las rutas de imágenes comiencen con /
  const formattedImages = Array.isArray(images) ? images.map((img) => (img.startsWith('/') ? img : `/${img}`)) : []

  try {
    const result = await query(
      `INSERT INTO profiles 
        (name, description, price, rating, reviews, reliability, completed_orders, images, badges) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [name, description, price, rating, reviews, reliability, completedOrders, formattedImages, badges]
    )

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear perfil:', error)
    throw error
  }
}

// Actualizar un perfil
export async function updateProfile(id, profile) {
  const { name, description, price, rating, reviews, reliability, completedOrders, images, badges } = profile

  // Asegurar que las rutas de imágenes comiencen con /
  const formattedImages = Array.isArray(images) ? images.map((img) => (img.startsWith('/') ? img : `/${img}`)) : []

  try {
    const result = await query(
      `UPDATE profiles 
       SET name = $1, description = $2, price = $3, rating = $4, reviews = $5, 
           reliability = $6, completed_orders = $7, images = $8, badges = $9
       WHERE id = $10
       RETURNING *`,
      [name, description, price, rating, reviews, reliability, completedOrders, formattedImages, badges, id]
    )

    return result.rows[0]
  } catch (error) {
    console.error(`Error al actualizar perfil con ID ${id}:`, error)
    throw error
  }
}

// Eliminar un perfil
export async function deleteProfile(id) {
  try {
    const result = await query('DELETE FROM profiles WHERE id = $1 RETURNING id', [id])
    return result.rows[0]
  } catch (error) {
    console.error(`Error al eliminar perfil con ID ${id}:`, error)
    throw error
  }
}

// Migrar los perfiles estáticos a la base de datos
export async function migrateStaticProfiles(profiles) {
  try {
    // Verificar si ya hay datos en la tabla
    const existingProfiles = await query('SELECT COUNT(*) FROM profiles')

    if (parseInt(existingProfiles.rows[0].count) > 0) {
      console.log('La tabla de perfiles ya contiene datos, omitiendo migración')
      return
    }

    // Insertar los perfiles en la base de datos
    for (const profile of profiles) {
      await createProfile({
        name: profile.name,
        description: profile.description,
        price: profile.price,
        rating: profile.rating,
        reviews: profile.reviews,
        reliability: profile.reliability,
        completedOrders: profile.completedOrders,
        images: profile.images,
        badges: profile.badges
      })
    }

    console.log('Perfiles migrados correctamente a la base de datos')
  } catch (error) {
    console.error('Error al migrar perfiles:', error)
    throw error
  }
}
