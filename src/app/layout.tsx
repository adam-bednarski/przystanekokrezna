import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const SITE_URL = 'https://przystanekokrezna.pl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Przystanek Okrężna',
    template: '%s | Przystanek Okrężna',
  },
  description: 'Przystanek Okrężna – przytulny apartament w Ząbkowicach Śląskich z parkingiem i klimatyzacją.',
  keywords: [
    'Przystanek Okrężna',
    'apartament Ząbkowice Śląskie',
    'noclegi Kotlina Kłodzka',
    'Owl Mountains accommodation',
    'apartament z parkingiem',
  ],
  applicationName: 'Przystanek Okrężna',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  alternates: {
    canonical: '/',
    languages: {
      'pl-PL': '/pl',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Przystanek Okrężna',
    title: 'Przystanek Okrężna – Apartment in Ząbkowice Śląskie',
    description: '55 m² apartament z parkingiem, klimatyzacją i świetnymi opiniami gości.',
    locale: 'pl_PL',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/photos/682164891.jpg',
        width: 1200,
        height: 800,
        alt: 'Salon apartamentu Przystanek Okrężna',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@przystanekokrezna',
    title: 'Przystanek Okrężna – przytulny apartament w Kotlinie Kłodzkiej',
    description: 'Zarezerwuj nocleg w apartamencie Przystanek Okrężna. Parking, klimatyzacja i doskonałe recenzje.',
    images: ['/photos/682164891.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={`${poppins.variable} ${playfair.variable} pb-[env(safe-area-inset-bottom)]`}>
        {children}
      </body>
    </html>
  )
}
