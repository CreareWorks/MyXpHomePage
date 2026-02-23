import type { Metadata, Viewport } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://y-creare.dev'),
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
    <html lang='ja' suppressHydrationWarning prefix="og: https://ogp.me/ns#">
      <body>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}