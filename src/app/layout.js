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
  title: 'Piñaton.com',
  description: 'Created by Entrellaves',
  icons: {
    icon: '/img-title.ico' // Corregido: cambiado de img-title.ico a img-title.png
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
