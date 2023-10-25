import { auth } from '@/auth'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tuneify',
  description: 'Tell your friends what’s good.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // code is going into here, but the redirect is not doing anything...
  const session = await auth();
  if (!session) { 
    try {
      redirect("/"); 
    }
    catch (e) {
      console.log("redirecting to /login");
    }
  }
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
