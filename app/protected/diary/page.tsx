import { getAllReviews } from '@/db';
import BoxOneLine from '@/components/box_one_line';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentTuneifyId } from '@/db';
import ShareIcon from '/public/share.svg';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

export default async function Diary() {
  return (
    <main>
      <div className="">
        <div className="flex items-center my-8 mx-10">
          <h1 className={russo.className + " text-5xl font-bold"}>Your Reviews</h1>
          <Link href={"/protected/user/" + await getCurrentTuneifyId()} target="_blank">
            <div className="flex ml-5">
              <Image src={ShareIcon} alt="Share button" />
              <h3 className="ml-2">Share your reviews</h3>
            </div>
          </Link>
        </div>
        <div className="mx-20">
          {await formatReviews()}
        </div>
      </div>
    </main>
  )
}

/**
 * Format user's reviews
 * @returns HTML code displaying user's review
 */
async function formatReviews() {
  const allReviews = await getAllReviews(await getCurrentTuneifyId());
  let html;

  if (allReviews) {
    html = allReviews.map(async (review) => {
      if (review.cache) {
        return (
          <BoxOneLine key={review.spotifyId} spotifyId={review.spotifyId} type={review.cache.type} title={review.cache.name || ''} imageUrl={review.cache.imageUrl} starRating={review.stars}></BoxOneLine>
        );
      }

    })
  }
  return (
    <div className="flex flex-row flex-wrap gap-12 ml-10 mr-20 my-12">
      {
        html
      }
    </div>
  );
}