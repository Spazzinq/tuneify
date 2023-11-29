import Navbar from '@/components/nav';
import { auth } from '@/auth';
import prisma from '@/db';
import BoxOneLine from '@/components/box_one_line';
import Link from 'next/link';
import { Session } from 'next-auth';
import { getTuneifyId } from '@/db';

export default async function Diary() {
  // on this page, fetch all review from user, display all review using reviewID (which will be used to fetch review info from the database in entry page)
  const session = await auth()

  return (
    <main>
      <Navbar session={await auth()}></Navbar>
      <div>
        <div className="flex items-center my-8 mx-10">
          <h1 className="text-5xl font-bold mb-4">Your Reviews</h1>
          <Link href={"/protected/user/" + await getTuneifyId(session)} target="_blank">
            <div className="flex ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <h3 className="ml-2">Share your reviews</h3>
            </div>
          </Link>
        </div>
        <div className="mx-20">
          {await getReviews(session?.user?.id)}
        </div>
      </div>
    </main>
  )
}

async function getReviews(userSpotifyId: string | undefined) {
  if (userSpotifyId) {
    // get tuneifyId given userSpotifyId 
    const user = await prisma.user.findUnique({
      where: {
        userSpotifyId: userSpotifyId
      },
    })

    // retrieve reviews with unique tuneifyId
    if (user) {
      const allReviews = await prisma.review.findMany({
        where: {
          tuneifyId: user.tuneifyId
        },
        take: 32
      })

      // renders html code block
      let html = allReviews.map(async (review) => {

        const cacheItem = await prisma.cache.findUnique({
          where: {
            spotifyId: review.spotifyId
          },
        })

        if (cacheItem && cacheItem.name) {
          return (
            <BoxOneLine key={cacheItem.spotifyId} spotifyId={cacheItem.spotifyId} type={cacheItem.type} title={cacheItem.name} imageUrl={cacheItem.imageUrl} starRating={review.stars}></BoxOneLine>
          );
        }

      })

      // returns html 
      return (
        <>
          <div className="flex flex-row flex-wrap gap-12 ml-10 mr-20 my-12">
            {html}
          </div>
        </>
      );
    }
  }
}