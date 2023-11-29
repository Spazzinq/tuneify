import BoxLarge from '@/components/box_large';
import { getAllReviews, getCurrentTuneifyId, getName } from '@/db';
import Link from 'next/link';

export default async function Review({ params }: { params: { userId: string } }) {

  return (
    <main>
      <div>
        <div className="flex items-center my-8 mx-10">
          <h1 className="text-5xl font-bold mb-4">{await getName(Number(params.userId))}&apos;s Reviews</h1>
          <Link href={"/protected/user/" + await getCurrentTuneifyId()} target="_blank">
            <div className="flex ml-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <h3 className="ml-2">Share your reviews</h3>
            </div>
          </Link>
        </div>
        <div className="mx-20">
          {await formatReviews(Number(params.userId))}
        </div>
      </div>
    </main>
  )
}

async function formatReviews(tuneifyId: number | undefined) {
  if (tuneifyId) {
    const allReviews = await getAllReviews(tuneifyId);
    let html;

    if (allReviews) {
      html = allReviews.map(async (review) => {
        if (review.cache) {
          return (
            <BoxLarge key={review.spotifyId} spotifyId={review.spotifyId} type={review.cache.type}
              title={review.cache.name || ''} subtitle={review.cache.type.charAt(0).toUpperCase() + review.cache.type.substring(1)}
              imageUrl={review.cache.imageUrl} starRating={review.stars} content={review.content || ''}
              noEdit={await getCurrentTuneifyId() != tuneifyId} className="p-4 rounded-lg drop-shadow-lg bg-slate-800" />
          );
        }

      })
    }
    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 ml-10 mr-20 my-12">
        {html}
      </div>
    );
  }
}