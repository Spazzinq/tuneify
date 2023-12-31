import './globals.css'
import type { Metadata } from 'next'
import { News_Cycle } from 'next/font/google'
import Navbar from '@/components/nav';

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
        <div className={news_cycle.className + " mt-32 mb-10 text-center text-white"}>
          Made with love by Team Tuneify.<br/>
          All data, including images are provided by Spotify.<br/>
          Spotify is not affiliated with Tuneify in any way.
        </div>
      </body>
    </html>
  )
}
