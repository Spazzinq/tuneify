import Navbar from '@/components/nav';
import Album from '@/components/album_review_linked';
import { auth } from '@/auth';
import prisma from '@/db';

export default async function Diary() {
  // on this page, fetch all review from user, display all review using reviewID (which will be used to fetch review info from the database in entry page)
  return (
    <main>
      <Navbar session={await auth()}></Navbar>
      <div>
        <div className="my-8 mx-10">
          <h1 className="text-5xl font-bold mb-4">Albums</h1>  
          <hr></hr> 
        </div>
        <div className="mx-20">
            <Album name={"AlbumName"} imageUrl={""} starRating={4} reviewId={"test ..."}></Album>
        </div>
      </div>
    </main>
  )
}

export async function getReviews(userSpotifyID: string, type: string) {

  // get tuneifyId given userSpotifyId 
  const user = await prisma.user.findUnique({
    where: {
      userSpotifyId: userSpotifyID,
    }
  });

  // retrieve reviews with unique tuneifyId
  if (user) { 
    const allReviews = await prisma.review.findMany({
      where: {
        tuneifyId: user.tuneifyId
      },
      take: 32
    })

    return allReviews;
  }
}

