import { NextResponse } from 'next/server'
import { getProfileById, updateProfile, deleteProfile } from '@/lib/models/profiles'

// GET para obtener un perfil específico
export async function GET(request, context) {
  try {
    const { params } = await context
    const id = params.id
    const profile = await getProfileById(id)

    if (!profile) {
      return new Response('Profile not found', { status: 404 })
    }

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// PUT para actualizar un perfil existente
export async function PUT(request, { params }) {
  try {
    const id = params.id
    const data = await request.json()

    // Verificar que el perfil existe
    const existingProfile = await getProfileById(id)
    if (!existingProfile) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    // Actualizar el perfil
    const updatedProfile = await updateProfile(id, data)
    return NextResponse.json(updatedProfile, { status: 200 })
  } catch (error) {
    console.error(`Error en PUT /api/profiles/${params.id}:`, error)
    return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 })
  }
}

// DELETE para eliminar un perfil
export async function DELETE(request, { params }) {
  try {
    const id = params.id

    // Verificar que el perfil existe
    const existingProfile = await getProfileById(id)
    if (!existingProfile) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    // Eliminar el perfil
    await deleteProfile(id)
    return NextResponse.json({ message: 'Perfil eliminado correctamente' }, { status: 200 })
  } catch (error) {
    console.error(`Error en DELETE /api/profiles/${params.id}:`, error)
    return NextResponse.json({ error: 'Error al eliminar el perfil' }, { status: 500 })
  }
}
