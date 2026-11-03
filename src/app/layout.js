import './globals.css'
import { JetBrains_Mono } from 'next/font/google'

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Enrico Zamarripa | Portfolio',
  description:
    'Enrico Zamarripa: Electrical Engineering student at CSUF and software developer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
