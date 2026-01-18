import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'youta.dev',
  description: 'Windows XPをモチーフにしたポートフォリオサイト',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return(
    <html lang='ja'>
      <body>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}