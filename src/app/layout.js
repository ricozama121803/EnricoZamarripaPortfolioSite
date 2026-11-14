import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Enrico Zamarripa | Portfolio',
  description:
    'Enrico Zamarripa: Electrical Engineering student at CSUF and software developer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-neutral-950 font-sans text-neutral-200 antialiased">{children}</body>
    </html>
  )
}
