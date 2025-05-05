'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { title } from 'process'

// Estructura de navegación de la Wiki
const navigation = [
  {
    title: 'Introducción',
    links: [
      // { title: 'Inicio', href: '/wiki' },
      { title: '¿Qué es Wiki Piñaton?', href: '/wiki' },
    ]
  },
  {
    title: 'Guías',
    links: [
      { title: 'Comandos', href: '/wiki/guias/comandos' },
      { title: 'Construcción', href: '/wiki/guias/construccion' },
      { title: 'Automatización y electricidad', href: '/wiki/guias/automatizacion-electricidad' },
      { title: 'Curiosidades', href: '/wiki/guias/curiosidades' },
    ]
  },
  {
    title: 'Recursos',
    links: [
      { title: 'Preguntas Frecuentes', href: '/wiki/preguntas-frecuentes' },
      { title: 'Términos de Servicio', href: '/wiki/terminos-de-servicio' },
      { title: 'Contacto', href: '/wiki/contacto' }
    ]
  }
]

export function DocsNav() {
  const pathname = usePathname()
  
  return (
    <nav className="w-full md:w-64 flex-none lg:block px-4 md:px-0">
      <div className="sticky top-16 -ml-0.5 h-[calc(100vh-64px)] overflow-y-auto py-6">
        <div className="w-full">
          {navigation.map((section) => (
            <div key={section.title} className="mt-8 first:mt-0">
              <h5 className="mb-3 text-sm font-semibold text-[#33CCFF]">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className={cn(
                        "block text-sm py-1.5 px-2 rounded-md transition-colors",
                        pathname === link.href
                          ? "bg-[#33CCFF]/10 text-[#33CCFF] font-medium"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}