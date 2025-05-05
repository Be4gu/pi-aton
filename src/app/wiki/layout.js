'use client'

import Navbar from '@/components/navbar'
import { DocsNav } from '@/components/wiki/DocsNav'

export default function WikiLayout({ children }) {
  return (
    <div className='min-h-screen bg-[#0E0E0E]'>
      <Navbar />

      <div className='border-t border-[#222]'>
        {/* Header de la documentación */}
        <header className='bg-[#141414] py-10 border-b border-[#222]'>
          <div className='container mx-auto px-4'>
            <h1 className='text-3xl font-bold text-[#33CCFF]'>Wiki Piñaton</h1>
            <p className='text-gray-400 mt-2'>Todo lo que necesitas para dejar de ser una piñata y convertirte en una auténtica leyenda de la Rivals.</p>
          </div>
        </header>

        {/* Contenido principal con sidebar */}
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col md:flex-row gap-10'>
            {/* Sidebar de navegación */}
            <div className='w-full md:w-64 flex-shrink-0 order-2 md:order-1'>
              <DocsNav />
            </div>

            {/* Contenido principal */}
            <main className='flex-grow order-1 md:order-2'>
              <article className='prose prose-invert prose-blue max-w-none'>
                <div className='bg-[#141414] rounded-lg border border-[#333] p-6 md:p-8'>{children}</div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
