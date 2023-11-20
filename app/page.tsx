import SpotifyButton from '../components/spotifyButton';
import Navbar from '@/components/nav';
import BoxOneLine from '@/components/box_one_line';
import Logo from '@/components/logo';
import { Russo_One } from 'next/font/google';
import prisma from "@/db";
import { auth } from '@/auth';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

async function getRecentlyReviewed(type: string) {
  const cache = await prisma.cache.findMany({
    where: {
      type: type,
    },
    take: 5,
  })

  let html = cache.map((item) => {
    return (
      <BoxOneLine key={item.spotifyId} spotifyId={item.spotifyId} type={type} title={item.name ?? ''} imageUrl={item.imageUrl ?? ''} />
    );
  })

  return (
    <>
      <h2 className={russo.className + " text-5xl font-bold mb-10"}>Recently Reviewed {type.charAt(0).toUpperCase() + type.substring(1)}</h2>
      <div className="flex flex-row gap-16 ml-10 mr-20 my-12">
        {html}
      </div>
    </>
  );
}


export default async function Home() {
  return (
    <main>
      <Navbar session={await auth()}></Navbar>
      <div className="mt-20">
        <div className="flex justify-center mb-2">
          <Logo logoSize={70} fontSize={7} />
        </div>
        <h2 className="text-2xl text-center ml-2 mb-12">Making music accessible. | Join us for a lifetime of discovery.</h2>
        <div className="w-30 flex justify-center mb-24">
          <SpotifyButton />
        </div>
        <div className="container ml-10">
          {await getRecentlyReviewed('artist')}
          {await getRecentlyReviewed('track')}
        </div>
      </div>
    </main>
  )
}
