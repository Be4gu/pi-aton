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
        <script defer src='https://cloud.umami.is/script.js' data-website-id='75c46d0f-f565-48a7-b2c2-9b7a526fb9b8'></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
