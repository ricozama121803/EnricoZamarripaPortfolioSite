import './globals.css'
import { Inter, Chakra_Petch, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Enrico Zamarripa | Portfolio',
  description:
    'Enrico Zamarripa: Electrical Engineering student at CSUF and software developer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${chakra.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
