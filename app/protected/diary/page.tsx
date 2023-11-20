import Navbar from '@/components/nav';
import Album from '@/components/album_review_linked';
import { auth } from '@/auth';
import prisma from '@/db';

export async function getReviews(userSpotifyId: string) {

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
    let html = allReviews.map((review) => {
      
      const user = prisma.cache.findUnique({
        where: {
          spotifyId: review.spotifyId
        },
      })

      return (
        <Album name={review.title} imageUrl={user.imageURL} starRating={review.stars} reviewId={review.id}></Album>
      );
    })

    // returns html 
    return (
      <>
        <div className="flex flex-row gap-16 ml-10 mr-20 my-12">
          {html}
        </div>
      </>
    );

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
          <h1 className="text-5xl font-bold mb-4">Albums</h1>  
          <hr></hr> 
        </div>
        <div className="mx-20">
            {await getReviews(session?.user?.id)}
        </div>
      </div>
    </main>
  )
}