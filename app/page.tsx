import SpotifyButton from '../components/login';
import Navbar from '@/components/nav';
import ArtistLarge from '@/components/artist_large';
import Image from 'next/image'
import Logo from '@/components/logo';
import { Russo_One } from 'next/font/google';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const russo = Russo_One({ subsets: ['latin'], weight: "400" })


async function getRecentlyReviewed() {
  const cache = await prisma.cache.findMany({
    take: 5,
  })

  let html = cache.map((item, index) => {
    // console.log(item.imageUrl)
    return (
      <ArtistLarge name={item.name ?? ''} imageUrl={item.imageUrl ?? ''} ranking={index + 1} starRating={-1} />
    );
  })

  prisma.$disconnect()

  return html;
}


export default async function Home() {
  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="mt-20">
        <div className="flex justify-center mb-2">
          <Logo logoSize={70} fontSize={7} />
        </div>
        <h2 className="text-2xl text-center ml-2 mb-12">Making music accessible. | Join us for a lifetime of discovery.</h2>
        <div className="w-30 flex justify-center mb-24">
          <SpotifyButton />
        </div>
        <div className="container ml-10">
          <h2 className={russo.className + " text-5xl font-bold mb-10"}>Recently Reviewed</h2>
          <div className="flex flex-row gap-16 ml-10 mr-20 my-12">
            {
              // getRecentlyReviewed()
            }
          </div>
        </div>
      </div>
      <footer className="mt-32 mb-10 text-center">Made with love by Team Tuneify.</footer>
    </main>
  )
}
