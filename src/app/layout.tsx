import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const displayFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solidgroundconcrete.com'),
  title: {
    default: 'Solid Ground Concrete — Ready-Mix & Construction Concrete',
    template: '%s | Solid Ground Concrete',
  },
  description:
    'Commercial and residential concrete services across Southern California. Ready-mix delivery, industrial slabs, decorative concrete, foundations, and structural pours. Licensed & bonded.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solidgroundconcrete.com',
    siteName: 'Solid Ground Concrete',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-concrete-950 text-concrete-100 font-body antialiased">
        {children}
      </body>
    </html>
  )
}
