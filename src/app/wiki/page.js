'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function WikiPage() {
  return (
    <>
      <h1 className='text-4xl font-bold mb-6 text-white'>Introducción</h1>
      <p className='text-xl text-gray-300 mb-8'>
        La wiki está enfocada a todo tipo de jugadores, desde principiantes hasta experimentados. En ella se recopilan todas las curiosidades posibles, bases meta, automatizaciones
        de todo tipo; en resumen, todas las frikadas que me voy encontrando, reunidas en un solo lugar.
      </p>

      <div className='grid md:grid-cols-2 gap-6 mb-12'>
        {/* Secciones principales de la documentación */}

        <div className='bg-[#1a1a1a] border border-[#333] p-6 rounded-lg hover:border-[#33CCFF] transition-colors'>
          <h2 className='text-xl font-semibold mb-2 text-[#33CCFF]'>Comandos</h2>
          <p className='text-gray-400 mb-4'>Comandos útiles para mejorar tu experiencia en el juego.</p>
          <Link href='/wiki/guias/comandos' className='flex items-center text-[#33CCFF] hover:text-white'>
            Ver comandos <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </div>
        <div className='bg-[#1a1a1a] border border-[#333] p-6 rounded-lg hover:border-[#33CCFF] transition-colors'>
          <h2 className='text-xl font-semibold mb-2 text-[#33CCFF]'>Construcciones</h2>
          <p className='text-gray-400 mb-4'>Las mejores bases y construcciones para tu experiencia en el juego.</p>
          <Link href='/wiki/guias/construccion' className='flex items-center text-[#33CCFF] hover:text-white'>
            Ver construcciones <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </div>
        <div className='bg-[#1a1a1a] border border-[#333] p-6 rounded-lg hover:border-[#33CCFF] transition-colors'>
          <h2 className='text-xl font-semibold mb-2 text-[#33CCFF]'>Automatización y electricidad</h2>
          <p className='text-gray-400 mb-4'>Las mejores automatizaciones tanto para zergs como para jugadores en solitario.</p>
          <Link href='/wiki/guias/automatizacion-electricidad' className='flex items-center text-[#33CCFF] hover:text-white'>
            Ver automatización y electricidad <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </div>
      </div>

      {/* Recursos populares */}
      <h2 className='text-2xl font-bold mb-4 text-white border-b border-[#333] pb-2'>Recursos populares</h2>
      <ul className='space-y-2 mb-8'>
        <li>
          <Link href='/wiki/preguntas-frecuentes' className='text-[#33CCFF] hover:underline'>
            Preguntas frecuentes
          </Link>
        </li>
        <li>
          <Link href='/wiki/terminos-de-servicio' className='text-[#33CCFF] hover:underline'>
            Términos de servicio
          </Link>
        </li>
        <li>
          <Link href='/wiki/contacto' className='text-[#33CCFF] hover:underline'>
            Contacto y soporte
          </Link>
        </li>
      </ul>
    </>
  )
}
