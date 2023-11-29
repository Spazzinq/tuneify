import BoxOneLine from "@/components/box_one_line";
import BoxTwoLine from "@/components/box_two_line";
import { SpotifyArtist, SpotifyTrack, getSearchTop } from "@/spotify";
import { redirect } from "next/navigation";
import BoxGrid from "@/components/grid";

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

async function formatTopQueries(title: string, query: string, type: string, limit: Number = 5) {
    const data = await getSearchTop(query, type, limit);
    let html = <></>;

    if (type === 'artist') {
        html = data.artists.items.map((item: SpotifyArtist, index: Number) => {
            console.log(item)
            return <BoxOneLine key={item.id} spotifyId={item.id} type="artist" title={item.name} imageUrl={item.images[1]?.url || ''} ranking={Number(index) + 1} starRating={0.01} />
        });
    } else if (type === 'track') {
        html = data.tracks.items.map((track: SpotifyTrack, index: Number) => {
            let album = track.album

            return <BoxTwoLine key={track.id} spotifyId={track.id} type="track" title={track.name} subtitle={album.name} imageUrl={album.images[1]?.url || ''} ranking={Number(index) + 1} starRating={0.01} />
        });
    }

    return (
        <BoxGrid title={title}>
            {html}
        </BoxGrid>
    );
}