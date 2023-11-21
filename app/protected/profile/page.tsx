import { auth } from "@/auth";
import Navbar from "@/components/nav";
import { JSX } from "react";
import BoxOneLine from "@/components/box_one_line";
import BoxTwoLine from "@/components/box_two_line";
import { Session } from "next-auth";
import { createUser, getFromReview } from "@/db";
import { SpotifyArtist, SpotifyTrack } from "@/spotify";
import { Russo_One } from "next/font/google";

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

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
                <div className="mt-10 mb-20 ml-10">
                    <h2 className="text-4xl text-center pt-6 ml-2 mb-2">Here are your top artists and tracks!</h2>
                    <h3 className="text-2xl text-center ml-2 mb-12">Tell people what you think about them.</h3>
                </div>
            </section>
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
            <div className="mb-8 ml-10">
                <h2 className={russo.className + " text-4xl font-bold mb-6"}>Your Top {type.charAt(0).toUpperCase() + type.substring(1)}</h2>
                <div className="flex flex-row gap-14 ml-4 mr-10 mb-6">
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