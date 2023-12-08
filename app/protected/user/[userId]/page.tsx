import BoxLarge from '@/components/box_large';
import { getAllReviews, getCurrentTuneifyId, getName } from '@/db';
import Link from 'next/link';
import Image from 'next/image';
import ShareIcon from '/public/share.svg';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

export default async function Review({ params }: { params: { userId: string } }) {
  return (
    <main>
      <div className="flex items-center my-8 mx-10">
      <h1 className={russo.className + " text-5xl font-bold"}>{await getName(Number(params.userId))}&apos;s Reviews</h1>
        <Link href={"/protected/user/" + await getCurrentTuneifyId()} target="_blank">
          <div className="flex ml-5">
            <Image src={ShareIcon} alt="Share button" />
            <h3 className="ml-2">Share your reviews</h3>
          </div>
        </Link>
      </div>
      <div className="mx-20">
        {await formatReviews(Number(params.userId))}
      </div>
    </main>
  )
}

/**
 * Format all reviews by a user
 * @param tuneifyId Tuneify ID of a user
 * @returns HTML code displaying all reviews by a user
 */
async function formatReviews(tuneifyId: number | undefined) {
  if (tuneifyId) {
    const allReviews = await getAllReviews(tuneifyId);

    if (allReviews) {
      return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 ml-10 mr-20 my-12">
        {
          allReviews.map(async (review) => {
            if (review.cache) {
              return (
                <BoxLarge key={review.spotifyId} spotifyId={review.spotifyId} type={review.cache.type}
                  title={review.cache.name || ''} subtitle={review.cache.type.charAt(0).toUpperCase() + review.cache.type.substring(1)}
                  imageUrl={review.cache.imageUrl} starRating={review.stars} contentTitle={review.title || ''} content={review.content || ''}
                  noEdit={await getCurrentTuneifyId() != tuneifyId} className="p-7 rounded-lg drop-shadow-lg bg-slate-900" />
              );
            }
          })
        }
      </div>
    );
    }
  }
}