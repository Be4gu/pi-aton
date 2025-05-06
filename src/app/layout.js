import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'Wiki Piñaton | Guías, comandos y trucos para Rust y supervivencia',
  description:
    'La Wiki de Piñaton es el mayor centro de guías, comandos, automatizaciones, construcciones y tips para Rust y juegos de supervivencia. Aprende, domina y comparte con la comunidad. Actualizada a diario.',
  keywords: [
    'wiki rust',
    'comandos rust',
    'guías rust',
    'automatización rust',
    'bases rust',
    'piñaton',
    'piñaton wiki',
    'trucos rust',
    'profesionales rust',
    'servicios rust',
    'supervivencia',
    'comunidad rust',
    'piñaton comunidad',
    'piñaton guías',
    'piñaton tips'
  ],
  openGraph: {
    title: 'Wiki Piñaton | Guías, comandos y trucos para Rust y supervivencia',
    description:
      'La Wiki de Piñaton es el mayor centro de guías, comandos, automatizaciones, construcciones y tips para Rust. Aprende, domina y comparte con la comunidad. Actualizada a diario.',
    url: 'https://piñaton.com/wiki',
    siteName: 'Wiki Piñaton',
    images: [
      {
        url: 'https://piñaton.com/proximamente.png',
        width: 1200,
        height: 630,
        alt: 'Wiki Piñaton - Guías y trucos para Rust'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wiki Piñaton | Guías, comandos y trucos para Rust y supervivencia',
    description:
      'La Wiki de Piñaton es el mayor centro de guías, comandos, automatizaciones, construcciones y tips para Rust y juegos de supervivencia. Aprende, domina y comparte con la comunidad. Actualizada a diario.',
    images: ['https://piñaton.com/proximamente.png']
  },
  icons: {
    icon: '/img-title.ico'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script defer src='https://cloud.umami.is/script.js' data-website-id='75c46d0f-f565-48a7-b2c2-9b7a526fb9b8'></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <div className='flex-grow'>{children}</div>
          <footer className='w-full py-4 bg-[#181818] text-center mt-auto'>
            <a href='https://www.twitch.tv/entrellaves' target='_blank' rel='noopener noreferrer' className='text-[#33CCFF] hover:text-[#00B8D9] font-semibold transition-colors'>
              Created by Entrellaves
            </a>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
