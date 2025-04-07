import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Permitir todas las solicitudes que no sean de la API
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Permitir las rutas de autenticación NextAuth
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  // Verificar si la solicitud viene de nuestro propio sitio
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')
  const isFromSameSite = referer && referer.includes(host)

  // Verificar si el usuario está autenticado
  const session = await getToken({ req: request })

  // En modo desarrollo, permitir solicitudes desde localhost
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isLocalhost = request.headers.get('host')?.includes('localhost')

  // Si es el mismo sitio o el usuario está autenticado o es localhost en desarrollo, permitir
  if (isFromSameSite || session || (isDevelopment && isLocalhost)) {
    return NextResponse.next()
  }

  // Para solicitudes externas no autorizadas, devolver error 403
  return new NextResponse(JSON.stringify({ success: false, message: 'API access denied' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
}

export const config = {
  matcher: ['/api/:path*']
}
