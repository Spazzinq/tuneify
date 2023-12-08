import SpotifyButton from '@/components/spotify_button';
import BoxOneLine from '@/components/box_one_line';
import Logo from '@/components/logo';
import { getFromCache, getMostReviewed, getRecentReviews, getTopReviewers, getUser } from "@/db";
import BoxGrid from '@/components/grid';

export default async function Home() {
  return (
    <main>
      <div className="mt-32">
        <div className="flex justify-center mb-2">
          <Logo logoSize={50} fontSize={5} />
        </div>
        <h2 className="text-2xl text-center ml-2 mb-12">Tell your friends what&apos;s good. Join us for a lifetime of discovery.</h2>
        <div className="w-30 flex justify-center mb-32">
          <SpotifyButton />
        </div>
        <div className="ml-10">
          {await formatRecentReviews("Recently Reviewed Artists", 'artist')}
          {await formatRecentReviews("Recently Reviewed Tracks", 'track')}
          {await formatMostReviwed()}
          {/* {await formatTopReviewers()} */}
        </div>
      </div>
    </main>
  )
}

/**
 * Format most recent reviewed items
 * @param title Title of the section
 * @param type Type of the item reviewed
 * @param limit Number of reviews to display
 * @returns HTML code displaying the most recent reviewed items on Tuneify
 */
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

async function formatTopReviewers(title: string = "Top Reviewers") {
  const topReviewers = await getTopReviewers();

  return (
    <BoxGrid title={title}>
      {
        topReviewers.map(async (id) => {
          const user = await getUser(id.tuneifyId);
    
          if (user) {
              return (
              <BoxOneLine key={user.tuneifyId} title={user.name || ''} imageUrl={""} ranking={id._count} />
            );
          }
        })
      }
    </BoxGrid>
  );
}

async function formatMostReviwed(title: string = "Most Reviewed") {
  const mostReviewed = await getMostReviewed();

  return (
    <BoxGrid title={title}>
      {
        mostReviewed.map(async (id) => {
          const cacheEntry = await getFromCache(id.spotifyId);
    
          if (cacheEntry) {
              return (
              <BoxOneLine key={cacheEntry.id} title={cacheEntry.name || ''} imageUrl={cacheEntry.imageUrl} ranking={id._count} />
            );
          }
        })
      }
    </BoxGrid>
  );
}

