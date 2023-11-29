import BoxHoriz from '@/components/box_horiz';
import prisma from '@/db';

export default async function Review({ params }: { params: { userId: string } }) {

  return (
    <main>
      <div>
        <div className="my-8 mx-10">
          <h1 className="text-5xl font-bold mb-4">{await getName(params.userId)}&apos;s Reviews</h1>
          <hr></hr>
        </div>
        <div className="mx-20">
          {await getReviews(params.userId)}
        </div>
      </div>
    </main>
  )
}

async function getName(userId: string | undefined) {
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        tuneifyId: Number(userId)
      },
    });

    if (user) {
      return user.name
    }
  }
}

async function getReviews(tuneifyId: string | undefined) {
  if (tuneifyId) {
    const allReviews = await prisma.review.findMany({
      where: {
        tuneifyId: Number(tuneifyId)
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

      if (cacheItem && cacheItem.name && review.content) {
        return (
          <BoxHoriz key={cacheItem.spotifyId} spotifyId={cacheItem.spotifyId} type={cacheItem.type} title={cacheItem.name} subtitle={cacheItem.type.charAt(0).toUpperCase() + cacheItem.type.substring(1)} imageUrl={cacheItem.imageUrl} starRating={review.stars} review={review.content} />
        );
      }

    })

    // returns html 
    return (
      <>
        <div className="grid grid-cols-2 gap-12 ml-10 mr-20 my-12">
          {html}
        </div>
      </>
    );

  }
}