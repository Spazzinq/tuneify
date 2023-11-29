import SpotifyButton from '@/components/spotify_button';
import BoxOneLine from '@/components/box_one_line';
import Logo from '@/components/logo';
import { Russo_One } from 'next/font/google';
import { getRecentReviews } from "@/db";
import BoxGrid from '@/components/grid';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

async function formatRecentReviews(title: string, type: string, limit: number = 5) {
  const reviews = await getRecentReviews(type, limit);

  return (
    <BoxGrid title={title}>
      {
        reviews.map((item) => {
          return (
            <BoxOneLine key={item.spotifyId} spotifyId={item.spotifyId} type={type} title={item.cache.name ?? ''} imageUrl={item.cache.imageUrl ?? ''} />
          );
        })
      }
    </BoxGrid>
  );
}


export default async function Home() {
  return (
    <main>
      <div className="mt-20">
        <div className="flex justify-center mb-2">
          <Logo logoSize={50} fontSize={5} />
        </div>
        <h2 className="text-2xl text-center ml-2 mb-12">Tell your friends what&apos;s good. Join us for a lifetime of discovery.</h2>
        <div className="w-30 flex justify-center mb-24">
          <SpotifyButton />
        </div>
        <div className="ml-10">
          {await formatRecentReviews("Recently Reviewed Artists", 'artist')}
          {await formatRecentReviews("Recently Reviewed Tracks", 'track')}
        </div>
      </div>
    </main>
  )
}
