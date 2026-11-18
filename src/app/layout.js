import './globals.css'
import { Inter } from 'next/font/google'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Enrico Zamarripa | Portfolio',
  description:
    'Enrico Zamarripa: software developer and Electrical Engineering student at CSUF.',
}

export const viewport = { themeColor: '#05070f' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen font-sans text-neutral-200 antialiased">{children}</body>
    </html>
  )
}
