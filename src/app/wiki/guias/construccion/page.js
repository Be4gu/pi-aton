'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

export default function ConstruccionPage() {
  const [activeTab, setActiveTab] = useState('todos')

  const bases = [
    {
      id: '1',
      nombre: 'Compact 2x2 Bunker',
      categoria: 'compacta',
      descripcion:
        'Una base compacta pero extremadamente segura que ofrece una defensa excepcional contra raids. Utiliza un sistema de búnker con estabilidad manipulada que hace que sea extremadamente costosa de raidear.',
      creador: 'Evil Wurst',
      costoMateriales: 'Medio (5.5k piedra, 2.5k metal)',
      tiempoConstruccion: '15-20 minutos',
      imagen: '/placeholder.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=7MTJvBL18yk',
      ventajas: ['Extremadamente resistente a raids para su tamaño', 'Fácil y rápida de construir', 'Muy eficiente en términos de coste-beneficio'],
      desventajas: ['Espacio interno limitado', 'Menos opciones para expandirse'],
      consejos: [
        'Coloca la base en una zona no muy transitada para evitar ser objetivo',
        'Construye primero la parte del búnker para asegurar tus recursos iniciales',
        'Usa puertas de garaje para el mecanismo del búnker para mayor seguridad'
      ]
    },
    {
      id: '2',
      nombre: 'The Frustrator',
      categoria: 'grande',
      descripcion:
        'Base de tamaño medio con un diseño complejo de pasillos y trampas que hacen el raideo extremadamente complicado y costoso. Incluye varios pisos de defensa con múltiples habitaciones seguras.',
      creador: 'Corrosion Hour',
      costoMateriales: 'Alto (15k piedra, 6k metal)',
      tiempoConstruccion: '1-2 horas',
      imagen: '/placeholder.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=ULrGw3T1v_c',
      ventajas: ['Múltiples capas de defensa', 'Confuso para los raiders', 'Excelente distribución de loot para minimizar pérdidas'],
      desventajas: ['Costosa en materiales', 'Requiere más tiempo para construirse', 'Necesita gestión más compleja del loot'],
      consejos: ['Distribuye tu loot en varias habitaciones seguras', 'Utiliza trampas de fuego en los corredores', 'Crea falsos cuartos fuertes para distraer raiders']
    },
    {
      id: '3',
      nombre: 'Validus 3.0',
      categoria: 'clan',
      descripcion:
        'Base para grupos grandes (8+ jugadores) con múltiples cuartos de herramientas y sistemas defensivos avanzados. Diseñada para resistir raids coordinados de otros clanes grandes.',
      creador: 'TinyRust',
      costoMateriales: 'Muy alto (45k piedra, 20k metal)',
      tiempoConstruccion: '3-5 horas (con equipo)',
      imagen: '/placeholder.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=hUCZo9Tnq6g',
      ventajas: ['Diseñada para muchos jugadores con espacios especializados', 'Sistema de defensa multicapa con varios TC', 'Múltiples puntos de salida para defender'],
      desventajas: ['Extremadamente costosa', 'Requiere coordinación de grupo para construirse', 'Gran huella visual que llama la atención'],
      consejos: ['Asegura la base inicial antes de expandirte', 'Designa áreas específicas para cada jugador', 'Mantén siempre un sistema de puertas externas con autocierre']
    },
    {
      id: '4',
      nombre: 'Solo Starter 2023',
      categoria: 'compacta',
      descripcion:
        'Perfecta para jugadores solitarios que recién comienzan. Esta base prioriza la seguridad temprana con un coste de recursos mínimo, permitiendo establecerte rápidamente.',
      creador: 'Lowko',
      costoMateriales: 'Bajo (2k piedra, 1k metal)',
      tiempoConstruccion: '10 minutos',
      imagen: '/placeholder.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=WkADbJjRmPE',
      ventajas: ['Rápida y económica de construir', 'Buena relación seguridad/recursos', 'Fácil de esconder en el terreno'],
      desventajas: ['Muy limitada en espacio', 'Pocas opciones para expansión', 'No adecuada para grupos'],
      consejos: ['Construye lejos de zonas de alto tráfico', 'Utiliza el búnker como almacén principal', 'Coloca cajas ocultas cerca pero no dentro de la base']
    },
    {
      id: '5',
      nombre: 'Stability Bunker Base',
      categoria: 'mediana',
      descripcion:
        'Base de tamaño medio que aprovecha los mecanismos de estabilidad del juego para crear un búnker prácticamente indestructible sin usar puertas de garaje. Perfecta para 2-3 jugadores.',
      creador: 'PrinceVidz',
      costoMateriales: 'Medio-alto (9k piedra, 4.5k metal)',
      tiempoConstruccion: '30-40 minutos',
      imagen: '/placeholder.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=nKcUw33Ggco',
      ventajas: ['Búnker extremadamente seguro sin necesidad de BP avanzados', 'Buena distribución del espacio interior', 'Fácil acceso a todos los elementos'],
      desventajas: ['Requiere entender bien la mecánica de estabilidad', 'Más cara que una base inicial estándar', 'Necesita planificación cuidadosa'],
      consejos: [
        'Practica el sistema de búnker en un servidor creativo primero',
        'Construye primero la estructura del búnker central',
        'Utiliza trampas de picos en las zonas de acceso principales'
      ]
    },
    {
      id: '6',
      nombre: 'Multi-TC Compound',
      categoria: 'clan',
      descripcion:
        'Complejo sistema de bases conectadas con múltiples cuartos de herramientas que hacen imposible un raid completo. Diseñada para grandes grupos que controlan territorios.',
      creador: 'RustAcademy',
      costoMateriales: 'Extremadamente alto (60k+ piedra, 30k+ metal)',
      tiempoConstruccion: '5-8 horas (con equipo)',
      imagen: '/placeholder.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=N0iBXc96Ow8',
      ventajas: ['Virtualmente indestructible si se mantiene correctamente', 'Permite control territorial extenso', 'Múltiples capas de defensa independientes'],
      desventajas: ['Requiere una enorme cantidad de recursos', 'Necesita un equipo grande para construirse y mantenerse', 'Alta visibilidad que atrae atención no deseada'],
      consejos: [
        'Establece primero un perímetro seguro antes de expandirte',
        'Asigna roles específicos para la gestión de cada sección',
        'Mantén siempre recursos para reparaciones en cada TC'
      ]
    }
  ]

  const filteredBases = activeTab === 'todos' ? bases : bases.filter((base) => base.categoria === activeTab)

  return (
    <>
      <h1 className='text-4xl font-bold mb-6 text-white'>Guías de Construcción</h1>

      <p className='text-lg text-gray-300 mb-8'>
        Domina el arte de construir las bases más seguras y eficientes en Rust con nuestras guías detalladas. Encuentra la base perfecta para tu estilo de juego, desde pequeñas
        estructuras para solistas hasta complejas fortificaciones para clanes.
      </p>

      <div className='mb-6'>
        <div className='flex flex-wrap gap-2 mb-8'>
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-4 py-2 rounded-md ${activeTab === 'todos' ? 'bg-[#33CCFF] text-black font-medium' : 'bg-[#1a1a1a] text-white'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab('compacta')}
            className={`px-4 py-2 rounded-md ${activeTab === 'compacta' ? 'bg-[#33CCFF] text-black font-medium' : 'bg-[#1a1a1a] text-white'}`}
          >
            Compactas
          </button>
          <button
            onClick={() => setActiveTab('mediana')}
            className={`px-4 py-2 rounded-md ${activeTab === 'mediana' ? 'bg-[#33CCFF] text-black font-medium' : 'bg-[#1a1a1a] text-white'}`}
          >
            Medianas
          </button>
          <button
            onClick={() => setActiveTab('grande')}
            className={`px-4 py-2 rounded-md ${activeTab === 'grande' ? 'bg-[#33CCFF] text-black font-medium' : 'bg-[#1a1a1a] text-white'}`}
          >
            Grandes
          </button>
          <button
            onClick={() => setActiveTab('clan')}
            className={`px-4 py-2 rounded-md ${activeTab === 'clan' ? 'bg-[#33CCFF] text-black font-medium' : 'bg-[#1a1a1a] text-white'}`}
          >
            Clanes
          </button>
        </div>

        {filteredBases.map((base) => (
          <div key={base.id} className='mb-12 bg-[#141414] border border-[#333] rounded-lg overflow-hidden'>
            <div className='p-6'>
              <h2 className='text-2xl font-semibold mb-2 text-[#33CCFF]'>{base.nombre}</h2>

              <div className='flex flex-col md:flex-row gap-6 mt-4'>
                <div className='w-full md:w-2/3'>
                  <p className='text-gray-300 mb-4'>{base.descripcion}</p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <p className='text-white'>
                        <span className='font-semibold text-[#33CCFF]'>Creador:</span> {base.creador}
                      </p>
                      <p className='text-white'>
                        <span className='font-semibold text-[#33CCFF]'>Coste de materiales:</span> {base.costoMateriales}
                      </p>
                      <p className='text-white'>
                        <span className='font-semibold text-[#33CCFF]'>Tiempo aproximado:</span> {base.tiempoConstruccion}
                      </p>
                    </div>

                    <div>
                      <h3 className='font-semibold text-white mb-2'>Ventajas:</h3>
                      <ul className='list-disc pl-5 text-gray-300 space-y-1'>
                        {base.ventajas.map((ventaja, index) => (
                          <li key={index}>{ventaja}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <h3 className='font-semibold text-white mb-2'>Desventajas:</h3>
                    <ul className='list-disc pl-5 text-gray-300 space-y-1'>
                      {base.desventajas.map((desventaja, index) => (
                        <li key={index}>{desventaja}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='w-full md:w-1/3'>
                  <div className='bg-[#1a1a1a] rounded-lg overflow-hidden relative aspect-video'>
                    <a href={base.videoUrl} target='_blank' rel='noopener noreferrer' className='block w-full h-full relative'>
                      <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
                        <div className='h-16 w-16 rounded-full bg-[#33CCFF]/80 flex items-center justify-center'>
                          <Play className='h-8 w-8 text-white' />
                        </div>
                      </div>
                      <div className='absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-sm text-white'>Ver tutorial</div>
                      <div className='w-full h-full'>
                        <Image src={base.imagen} alt={base.nombre} width={320} height={180} className='object-cover w-full h-full' />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-3 text-[#33CCFF]'>Consejos de construcción:</h3>
                <div className='bg-[#1a1a1a] border-l-4 border-[#33CCFF] p-4 rounded-r-lg'>
                  <ul className='space-y-2 text-gray-300'>
                    {base.consejos.map((consejo, index) => (
                      <li key={index} className='flex items-start'>
                        <span className='text-[#33CCFF] mr-2'>•</span>
                        <span>{consejo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bg-[#1a1a1a] border border-[#333] p-6 rounded-lg mb-8'>
        <h3 className='text-xl font-semibold mb-4 text-[#33CCFF]'>¿Necesitas ayuda con tu base?</h3>
        <p className='text-gray-300 mb-4'>
          Nuestros expertos en construcción de Rust pueden ayudarte a diseñar, construir o mejorar tu base actual. Contrata a un profesional que te guiará en todo el proceso para
          crear una fortaleza impenetrable.
        </p>
        <a href='/wiki/servicios/diseno-bases' className='inline-block bg-[#33CCFF] text-black font-medium px-4 py-2 rounded-md hover:bg-[#33CCFF]/80 transition-colors'>
          Ver servicio de diseño de bases
        </a>
      </div>

      <div className='text-sm text-gray-400 italic'>
        <p>* Los videos enlazados son tutoriales creados por sus respectivos autores. Piñaton no reclama la autoría de estos diseños.</p>
        <p>* Los tiempos y costes son aproximados y pueden variar según la experiencia del constructor y las circunstancias del servidor.</p>
      </div>
    </>
  )
}
