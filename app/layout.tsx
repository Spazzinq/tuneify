import './globals.css'
import type { Metadata } from 'next'
import { Faustina, Inter, News_Cycle } from 'next/font/google'
import { Russo_One } from 'next/font/google';

// These styles apply to every route in the application
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const faustina = Faustina({ subsets: ['latin'] })
const russo = Russo_One({ subsets: ['latin'], weight: "400" })
const news_cycle = News_Cycle({ subsets: ['latin'], weight: "700" })


export const metadata: Metadata = {
  title: 'Tuneify',
  description: 'Tell your friends what’s good.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={news_cycle.className + " tracking-wide"}>{children}</body>
    </html>
  )
}
