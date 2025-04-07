import { NextResponse } from 'next/server'
import { getAllProfiles, createProfile, initProfilesTable } from '@/lib/models/profiles'
import { testConnection } from '@/lib/db'

// Inicializar la tabla cuando se carga el API
let initialized = false

async function initialize() {
  if (!initialized) {
    await testConnection()
    await initProfilesTable()
    initialized = true
  }
}

// GET para obtener todos los perfiles
export async function GET() {
  try {
    await initialize()
    const profiles = await getAllProfiles()
    return NextResponse.json(profiles, { status: 200 })
  } catch (error) {
    console.error('Error en GET /api/profiles:', error)
    return NextResponse.json({ error: 'Error al obtener los perfiles' }, { status: 500 })
  }
}

// POST para crear un nuevo perfil
export async function POST(request) {
  try {
    await initialize()
    const data = await request.json()

    // Verificar los datos requeridos
    if (!data.name || !data.description || !data.price) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const profile = await createProfile(data)
    return NextResponse.json(profile, { status: 201 })
  } catch (error) {
    console.error('Error en POST /api/profiles:', error)
    return NextResponse.json({ error: 'Error al crear el perfil' }, { status: 500 })
  }
}
