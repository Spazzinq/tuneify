import { auth } from "@/auth";
import Navbar from "@/components/nav";
import { JSX, Key, Suspense } from "react";
import BoxOneLine from "@/components/box_one_line";
import BoxTwoLine from "@/components/box_two_line";
import { Session } from "next-auth";
import { createUser, getFromCache, getFromReview } from "@/db";
import { SpotifyArtist, SpotifyTrack } from "@/spotify";

export default async function Page() {
    const session = await auth()

    const url = session?.user?.image
    const name = session?.user?.name
    const id = session?.user?.id
    const email = session?.user?.email

    if (name && id && email) {
        createUser(url || '', name, id, email)
    }

    return (
        <main>
            <Navbar session={session}></Navbar>
            <section>
                {await getTop('artists', session, 5)}
                {await getTop('tracks', session, 5)}
            </section>
            {/* <div className="my-8 ml-10">
                <h2 className="text-5xl font-bold mb-10">Recent Reviews</h2>
                <div className="mx-10">
                    <BoxHoriz spotifyId={""} type="" title="Album Name" subtitle="Artist" imageUrl="" review="Review ..." date="00/00/0000" starRating={4} />
                </div>
            </div> */}
        </main>
    );
}

// TODO: Needs refactoring
async function getTop(type: string, session: Session | null, number: Number) {
    if (session && session.user) {
        let token = session.accessToken

        const response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?limit=" + number, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return (
            <div className="my-8 ml-10">
                <h2 className="text-5xl font-bold mb-4">Your Top {type.charAt(0).toUpperCase() + type.substring(1)}</h2>
                <div className="flex flex-row gap-16 ml-10 mr-20 my-12">
                    {await parseResponse(session.user.id, type, response)}
                </div>
            </div>
        );
    }
}

// TODO: Needs refactoring
async function parseResponse(userSpotifyId: string, type: string, response: Response): Promise<JSX.Element | undefined> {
    if (response.status == 204) {
        console.log("204 response from currently playing")
        return;
    }

    const data = await response.json();

    if (type === 'artists') {
        return data.items.map(async (item: SpotifyArtist, index: Number) => {
            const reviewItem = await getFromReview(userSpotifyId, item.id);

            return <BoxOneLine key={item.id} spotifyId={item.id} type="artist" title={item.name} imageUrl={item.images[0].url} ranking={Number(index) + 1} starRating={reviewItem?.stars || 0.01} />
        });
    } else if (type === 'tracks') {
        return data.items.map(async (track: SpotifyTrack, index: Number) => {
            const reviewItem = await getFromReview(userSpotifyId, track.id);

            return <BoxTwoLine key={track.id} spotifyId={track.id} type="track" title={track.name} subtitle={track.album.name} imageUrl={track.album.images[0].url} ranking={Number(index) + 1} starRating={reviewItem?.stars || 0.01} />
        });
    }

    return <></>;
}