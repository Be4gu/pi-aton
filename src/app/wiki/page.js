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
          <h2 className='text-xl font-semibold mb-2 text-[#33CCFF]'>Guías</h2>
          <p className='text-gray-400 mb-4'>Guías paso a paso para contratar profesionales, realizar pagos y dejar valoraciones.</p>
          <Link href='/wiki/guias/como-contratar' className='flex items-center text-[#33CCFF] hover:text-white'>
            Ver guías <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </div>
      </div>

      {/* Primeros pasos */}
      <h2 className='text-2xl font-bold mb-4 text-white border-b border-[#333] pb-2'>Primeros pasos</h2>
      <ol className='space-y-4 mb-10'>
        <li className='flex'>
          <span className='bg-[#33CCFF] text-black font-bold h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0'>1</span>
          <div>
            <h3 className='text-lg font-medium text-white'>Explora nuestra tienda</h3>
            <p className='text-gray-400'>Navega por nuestra selección de profesionales y encuentra el que mejor se adapte a tus necesidades.</p>
          </div>
        </li>
        <li className='flex'>
          <span className='bg-[#33CCFF] text-black font-bold h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0'>2</span>
          <div>
            <h3 className='text-lg font-medium text-white'>Contacta con un profesional</h3>
            <p className='text-gray-400'>Una vez encuentres a un profesional que te interese, contáctalo para discutir tus necesidades específicas.</p>
          </div>
        </li>
        <li className='flex'>
          <span className='bg-[#33CCFF] text-black font-bold h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0'>3</span>
          <div>
            <h3 className='text-lg font-medium text-white'>Disfruta del servicio</h3>
            <p className='text-gray-400'>Coordina los detalles con el profesional y disfruta de un servicio de calidad.</p>
          </div>
        </li>
      </ol>

      {/* Recursos populares */}
      <h2 className='text-2xl font-bold mb-4 text-white border-b border-[#333] pb-2'>Recursos populares</h2>
      <ul className='space-y-2 mb-8'>
        <li>
          <Link href='/wiki/recursos/faq' className='text-[#33CCFF] hover:underline'>
            Preguntas frecuentes
          </Link>
        </li>
        <li>
          <Link href='/wiki/guias/sistema-pagos' className='text-[#33CCFF] hover:underline'>
            Sistema de pagos
          </Link>
        </li>
        <li>
          <Link href='/wiki/recursos/terminos' className='text-[#33CCFF] hover:underline'>
            Términos de servicio
          </Link>
        </li>
        <li>
          <Link href='/wiki/recursos/contacto' className='text-[#33CCFF] hover:underline'>
            Contacto y soporte
          </Link>
        </li>
      </ul>
    </>
  )
}
