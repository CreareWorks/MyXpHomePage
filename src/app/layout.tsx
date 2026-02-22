import type { Metadata, Viewport } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://youta-dev.vercel.app'),
  title: 'youta.dev',
  description: 'Windows XPをモチーフにしたポートフォリオサイト',
  openGraph: {
    title: 'youta.dev',
    description: 'Windows XPをモチーフにしたポートフォリオサイト',
    url: '/',
    siteName: 'youta.dev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'youta.dev',
    description: 'Windows XPをモチーフにしたポートフォリオサイト',
    site: '@creareworks',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}