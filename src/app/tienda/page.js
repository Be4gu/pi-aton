'use client'

import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Navbar from '@/components/navbar'
import { useState, useEffect } from 'react'

export default function Store() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/profiles')

        if (!response.ok) {
          throw new Error('No se pudieron cargar los perfiles')
        }

        const data = await response.json()
        setProfiles(data)
      } catch (error) {
        console.error('Error al obtener perfiles:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen'>
        <Navbar />
        <main className='container mx-auto px-4 py-8'>
          <h1 className='text-4xl md:text-6xl font-bold text-center text-[#00B8D9] mb-12'>Nuestros Profesionales</h1>
          <div className='flex justify-center items-center h-64'>
            <p className='text-xl text-[#33CCFF]'>Cargando perfiles...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen'>
        <Navbar />
        <main className='container mx-auto px-4 py-8'>
          <h1 className='text-4xl md:text-6xl font-bold text-center text-[#00B8D9] mb-12'>Nuestros Profesionales</h1>
          <div className='flex justify-center items-center h-64 flex-col'>
            <p className='text-xl text-red-500 mb-4'>Error: {error}</p>
            <Button onClick={() => window.location.reload()} className='bg-[#00B8D9] hover:bg-[#33CCFF] text-[#FFFFFF] transition-colors'>
              Intentar de nuevo
            </Button>
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className='min-h-screen'>
      <Navbar />

      <main className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl md:text-6xl font-bold text-center text-[#00B8D9] mb-12'>Nuestros Profesionales</h1>

        {profiles.length === 0 ? (
          <div className='text-center py-10'>
            <p className='text-xl text-[#E0E0E0]'>No se encontraron perfiles disponibles</p>
          </div>
        ) : (
          <>
            {/* Sección de Profesionales Premium */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-center text-[#FFDF00] mb-6'>Servicios Premium</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {profiles
                  .filter((profile) => profile.id === 9 || profile.id === 10)
                  .map((profile) => (
                    <Card key={profile.id} className='bg-[#1E1E1E] border-2 border-[#FFDF00] shadow-lg hover:shadow-[#FFDF00]/20 transition-colors h-[400px] flex flex-col'>
                      <div className='absolute top-0 right-0 bg-[#FFDF00] text-[#1E1E1E] px-3 py-1 rounded-bl-lg font-bold'>PREMIUM</div>
                      <CardContent className='pt-6 flex-grow overflow-hidden'>
                        <div className='flex justify-between items-start mb-4'>
                          <div>
                            <h2 className='text-xl font-bold text-[#FFDF00]'>{profile.name}</h2>
                            <div className='flex items-center gap-1 mt-1'>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < profile.rating ? 'fill-[#FFDF00] text-[#FFDF00]' : 'text-[#3A3A3A]'}`} />
                              ))}
                              <span className='text-sm text-[#E0E0E0]'>({profile.reviews} reseñas)</span>
                            </div>
                          </div>
                          <span className='text-2xl font-bold text-[#FFDF00]'>{profile.price}</span>
                        </div>

                        <div className='mb-4'>
                          <div className='flex items-center gap-2 mb-2'>
                            <span className='text-[#FFFFFF]'>
                              {isNaN(parseFloat(profile.reliability)) ? profile.reliability : `${(parseFloat(profile.reliability) * 100).toFixed(0)}%`}
                            </span>
                            <span className='text-[#E0E0E0]'>Fiabilidad</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='text-[#FFFFFF]'>{profile.completed_orders || profile.completedOrders}</span>
                            <span className='text-[#E0E0E0]'>Encargos Completados</span>
                          </div>
                        </div>

                        <div
                          className={
                            `text-[#E0E0E0] whitespace-pre-line ` +
                            (profile.id === 9 || profile.id === 10
                              ? ''
                              : 'overflow-hidden max-h-[150px] [display:-webkit-box] [WebkitLineClamp:8] [WebkitBoxOrient:vertical] text-ellipsis')
                          }
                          style={profile.id === 9 || profile.id === 10 ? {} : { overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {profile.description}
                        </div>
                      </CardContent>

                      <CardFooter className='flex gap-2 mt-auto'>
                        <Link href={`/profiles/${profile.id}`} className='w-full'>
                          <Button className='w-full bg-[#FFDF00] hover:bg-[#FFE933] text-[#1E1E1E] transition-colors font-bold'>Ver perfil completo</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>{' '}
            {/* Sección de Profesionales Regulares */}
            <div className='mt-12'>
              <h2 className='text-2xl font-bold text-center text-[#00B8D9] mb-6'>Todos los Profesionales</h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[...profiles]
                  .filter((profile) => profile.id !== 9 && profile.id !== 10)
                  .sort(() => Math.random() - 0.5) // Randomiza el orden de los perfiles no premium
                  .map((profile) => (
                    <Card key={profile.id} className='bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#00B8D9] transition-colors h-[400px] flex flex-col'>
                      <CardContent className='pt-6 flex-grow overflow-hidden'>
                        <div className='flex justify-between items-start mb-4'>
                          <div>
                            <h2 className='text-xl font-bold text-[#00B8D9]'>{profile.name}</h2>
                            <div className='flex items-center gap-1 mt-1'>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < profile.rating ? 'fill-[#33CCFF] text-[#33CCFF]' : 'text-[#3A3A3A]'}`} />
                              ))}
                              <span className='text-sm text-[#E0E0E0]'>({profile.reviews} reseñas)</span>
                            </div>
                          </div>
                          <span className='text-2xl font-bold text-[#00B8D9]'>{profile.price}</span>
                        </div>

                        <div className='mb-4'>
                          <div className='flex items-center gap-2 mb-2'>
                            <span className='text-[#FFFFFF]'>
                              {isNaN(parseFloat(profile.reliability)) ? profile.reliability : `${(parseFloat(profile.reliability) * 100).toFixed(0)}%`}
                            </span>
                            <span className='text-[#E0E0E0]'>Fiabilidad</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='text-[#FFFFFF]'>{profile.completed_orders || profile.completedOrders}</span>
                            <span className='text-[#E0E0E0]'>Encargos Completados</span>
                          </div>
                        </div>

                        <div className='text-[#E0E0E0] overflow-hidden max-h-[150px]'>{profile.description}</div>
                      </CardContent>

                      <CardFooter className='flex gap-2 mt-auto'>
                        <Link href={`/profiles/${profile.id}`} className='w-full'>
                          <Button className='w-full bg-[#00B8D9] hover:bg-[#33CCFF] text-[#FFFFFF] transition-colors'>Ver perfil completo</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
