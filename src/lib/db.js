import { Pool } from 'pg'

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// Función para ejecutar consultas
export async function query(text, params) {
  try {
    const start = Date.now()
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Consulta ejecutada', { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error)
    throw error
  }
}

// Función para verificar la conexión
export async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('Conexión a la base de datos exitosa:', result.rows[0])
    return true
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error)
    return false
  }
}
