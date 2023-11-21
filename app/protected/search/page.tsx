import { auth } from "@/auth";
import Navbar from "@/components/nav";
import { JSX } from "react";
import BoxOneLine from "@/components/box_one_line";
import BoxTwoLine from "@/components/box_two_line";
import { Session } from "next-auth";
import { SpotifyArtist, SpotifyTrack } from "@/spotify";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
    const session = await auth()

    if (searchParams.query) {
        return (
            <main>
                <Navbar session={session}></Navbar>
                <section>
                    {await getTop('artist', session, 10, searchParams.query)}
                    {await getTop('track', session, 10, searchParams.query)}
                </section>
            </main>
        );
    }


}

// TODO: Needs refactoring
async function getTop(type: string, session: Session | null, number: Number, query: string) {
    if (session) {
        let token = session.accessToken

        const response = await fetch("https://api.spotify.com/v1/search?q=" + query + "&type=" + type + "&limit=" + number, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return (
            <div className="my-8 ml-10">
                <h2 className="text-5xl font-bold mb-4">{type.charAt(0).toUpperCase() + type.substring(1)} Results</h2>
                <div className="flex flex-row gap-16 ml-10 mr-20 my-12">
                    {await parseResponse(type, response)}
                </div>
            </div>
        );
    }
}

// TODO: Needs refactoring
async function parseResponse(type: string, response: Response): Promise<JSX.Element | undefined> {
    if (response.status == 204) {
        console.log("204 response from currently playing")
        return;
    }

    const data = await response.json();

    if (type === 'artist') {
        return data.artists.items.map((item: SpotifyArtist, index: Number) => {
            console.log(item)
            return <BoxOneLine key={item.id} spotifyId={item.id} type="artist" title={item.name} imageUrl={item.images[0].url} ranking={Number(index) + 1} starRating={0.01} />
        });
    } else if (type === 'track') {
        return data.tracks.items.map((track: SpotifyTrack, index: Number) => {
            let album = track.album

            return <BoxTwoLine key={track.id} spotifyId={track.id} type="track" title={track.name} subtitle={album.name} imageUrl={album.images[0].url} ranking={Number(index) + 1} starRating={0.01} />
        });
    }

    return <></>;
}