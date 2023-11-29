import './globals.css'
import type { Metadata } from 'next'
import { Faustina, Inter, News_Cycle } from 'next/font/google'
import { Russo_One } from 'next/font/google';

// These styles apply to every route in the application
import './globals.css'
import Navbar from '@/components/nav';

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
      <body className={news_cycle.className + " tracking-wide"}>
        <Navbar />
        {children}
        <footer className={news_cycle.className + " mt-32 mb-10 text-center text-white"}>Made with love by Team Tuneify.</footer>
      </body>
    </html>
  )
}
