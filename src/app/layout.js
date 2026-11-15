import './globals.css'
import { Nunito } from 'next/font/google'

const sans = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'], variable: '--font-sans' })

export const metadata = {
  title: 'Enrico Zamarripa | Portfolio',
  description:
    'Enrico Zamarripa: software developer and Electrical Engineering student at CSUF.',
}

export const viewport = { themeColor: '#f2f3f5' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen font-sans text-slate-700 antialiased">{children}</body>
    </html>
  )
}
