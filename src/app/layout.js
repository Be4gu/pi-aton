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
  description: 'Created by Entrellaves'
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script async defer data-website-id='tu-website-id' src='https://tu-instancia-umami.com/script.js'></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
