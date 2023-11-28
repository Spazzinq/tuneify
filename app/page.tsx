import SpotifyButton from '@/components/spotify_button';
import Navbar from '@/components/nav';
import BoxOneLine from '@/components/box_one_line';
import Logo from '@/components/logo';
import { Russo_One } from 'next/font/google';
import prisma from "@/db";
import { auth } from '@/auth';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

async function getRecentlyReviewed(type: string) {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      cache: {
        type: type,
      },
    },
    select: {
      spotifyId: true,
      cache: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
    take: 5
  });

  let html = reviews.map((item) => {
    return (
      <BoxOneLine key={item.spotifyId} spotifyId={item.spotifyId} type={type} title={item.cache.name ?? ''} imageUrl={item.cache.imageUrl ?? ''} />
    );
  })

  return (
    <>
      <h2 className={russo.className + " text-4xl font-bold mb-6"}>Recently Reviewed {type.charAt(0).toUpperCase() + type.substring(1) + "s"}</h2>
      <div className="grid grid-cols-5 gap-6 ml-2 mr-10 mb-12">
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
          <Logo logoSize={50} fontSize={5} />
        </div>
        <h2 className="text-2xl text-center ml-2 mb-12">Making music accessible | Join us for a lifetime of discovery</h2>
        <div className="w-30 flex justify-center mb-24">
          <SpotifyButton />
        </div>
        <div className="ml-10">
          {await getRecentlyReviewed('artist')}
          {await getRecentlyReviewed('track')}
        </div>
      </div>
    </main>
  )
}
