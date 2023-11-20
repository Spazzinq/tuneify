import Navbar from '@/components/nav';
import { auth } from '@/auth';
import prisma from '@/db';
import BoxOneLine from '@/components/box_one_line';

export async function getReviews(userSpotifyId: string | undefined) {
  if (userSpotifyId) {
    // get tuneifyId given userSpotifyId 
    const user = await prisma.user.findUnique({
      where: {
        userSpotifyId: userSpotifyId
      },
    });

    // retrieve reviews with unique tuneifyId
    if (user) {
      const allReviews = await prisma.review.findMany({
        where: {
          tuneifyId: user.tuneifyId
        },
        take: 32
      })

      // renders html code block
      let html = await allReviews.map(async (review) => {

        const cacheItem = await prisma.cache.findUnique({
          where: {
            spotifyId: review.spotifyId
          },
        })

        if (cacheItem && cacheItem.name) {
          return (
            <BoxOneLine spotifyId={cacheItem.spotifyId} type={cacheItem.type} title={cacheItem.name} imageUrl={cacheItem.imageUrl} starRating={review.stars}></BoxOneLine>
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

export default async function Diary() {
  // on this page, fetch all review from user, display all review using reviewID (which will be used to fetch review info from the database in entry page)
  const session = await auth()

  return (
    <main>
      <Navbar session={await auth()}></Navbar>
      <div>
        <div className="my-8 mx-10">
          <h1 className="text-5xl font-bold mb-4">Your Reviews</h1>
          <hr></hr>
        </div>
        <div className="mx-20">
          {await getReviews(session?.user?.id)}
        </div>
      </div>
    </main>
  )
}