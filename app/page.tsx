import SpotifyButton from '../components/login';
import Navbar from '@/components/nav';
import ArtistLarge from '@/components/artist_large';
import Image from 'next/image'
import Logo from '@/components/logo';
import { Russo_One } from 'next/font/google';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const russo = Russo_One({ subsets: ['latin'], weight: "400" })

export default async function Home() {
  const allUsers = await prisma.cache.findMany()
  console.log(allUsers)
  
  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="mt-20">
        <div className="flex justify-center mb-2">
          <Logo logoSize={70} fontSize={7} />
        </div>
        <h2 className="text-2xl text-center ml-2 mb-12">Making music accessible. | Join us for a lifetime of discovery.</h2>
        <div className="w-30 flex justify-center mb-32">
          <SpotifyButton />
        </div>
        <div className="container ml-10">
          <h2 className={russo.className + " text-5xl font-bold mb-10"}>Most Reviewed</h2>
          <div className="grid grid-cols-3 ml-10">
            <ArtistLarge name="Taylor Swift" imageUrl="" ranking={1} starRating={3} />
            <ArtistLarge name="Conan Gray" imageUrl="" ranking={2} starRating={4.5} />
            <ArtistLarge name="Bazzi" imageUrl="" ranking={3} starRating={3} />
          </div>
        </div>
      </div>
      <footer className="mt-32 mb-10 text-center">Made with love by Team Tuneify.</footer>
    </main>
  )
}
