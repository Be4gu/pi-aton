/**
 * Utilidades para proteger rutas de API
 */

/**
 * Verifica si una solicitud está autorizada para acceder a la API
 * @param {Request} request - La solicitud HTTP
 * @returns {boolean} - true si la solicitud está autorizada
 */
export function isAuthorizedApiRequest(request) {
  // Verificar header de API key (úsalo para solicitudes server-to-server)
  const apiKey = request.headers.get('x-api-key')
  const isValidApiKey = apiKey === process.env.API_INTERNAL_KEY

  // Verificar si la solicitud viene del mismo origen
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')
  const isFromSameSite = referer && host && referer.includes(host)

  return isValidApiKey || isFromSameSite
}

/**
 * Middleware para rutas de API que rechaza solicitudes no autorizadas
 * @param {Request} request - La solicitud HTTP
 * @returns {Response|null} - Respuesta de error o null si está autorizada
 */
export function apiAuthMiddleware(request) {
  if (!isAuthorizedApiRequest(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado para acceder a esta API' }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  return null
}
