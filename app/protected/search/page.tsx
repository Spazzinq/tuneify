import BoxOneLine from "@/components/box_one_line";
import BoxTwoLine from "@/components/box_two_line";
import { SpotifyArtist, SpotifyTrack, getSearchTop } from "@/spotify";
import { redirect } from "next/navigation";
import BoxGrid from "@/components/grid";
import { getReviewFromCurrent } from "@/db";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
    if (searchParams.query) {
        return (
            <main>
                <div className="mt-10 ml-10">
                    {await formatTopQueries("Artist Results", searchParams.query, 'artist')}
                    {await formatTopQueries("Track Results", searchParams.query, 'track')}
                </div>
            </main>
        );
    } else {
        redirect('/protected/profile')
    }
}
/**
 * Format top search queries
 * @param title Title of the section
 * @param query Query to search
 * @param type Type of query ('artist' or 'track')
 * @param limit Number of results to display
 * @returns HTML code displaying the top queries of the specified type
 */
async function formatTopQueries(title: string, query: string, type: string, limit: Number = 5) {
    const data = await getSearchTop(query, type, limit);
    let html = <></>;

    if (type === 'artist') {
        html = data.artists.items.map(async (artist: SpotifyArtist, index: Number) => {
            const reviewEntry = await getReviewFromCurrent(artist.id);

            return <BoxOneLine key={artist.id} spotifyId={artist.id} type="artist" title={artist.name} imageUrl={artist.images[1]?.url || ''} ranking={Number(index) + 1} starRating={reviewEntry ? reviewEntry.stars : 0.01} />
        });
    } else if (type === 'track') {
        html = data.tracks.items.map(async (track: SpotifyTrack, index: Number) => {
            const reviewEntry = await getReviewFromCurrent(track.id);
            const album = track.album

            return <BoxTwoLine key={track.id} spotifyId={track.id} type="track" title={track.name} subtitle={album.name} imageUrl={album.images[1]?.url || ''} ranking={Number(index) + 1} starRating={reviewEntry ? reviewEntry.stars : 0.01} />
        });
    }

    return (
        <BoxGrid title={title}>
            {html}
        </BoxGrid>
    );
}