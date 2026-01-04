import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Youta Xp Portfolio',
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
        {children}
      </body>
    </html>
  )
}