import { auth } from "@/auth";
import Navbar from "@/components/nav";
import { JSX, Key, Suspense } from "react";
import ArtistLarge from "@/components/artist_large";
import TrackLarge from "@/components/track_large";
import AlbumReview from "@/components/album_review";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { createUser } from "@/db";

export default async function Page() {
    const session = await auth()

    const url = session?.user?.image
    const name = session?.user?.name
    const id = session?.user?.id
    const email = session?.user?.email

    if (url && name && id && email) {
        createUser(url, name, id, email)
        // console.log(session)
    } else {
        redirect('/')
    }

    return (
        <main>
            <Navbar profileImageUrl={url}></Navbar>
            <section>
                {await getTop('artists', session, 5)}
                {await getTop('tracks', session, 5)}
            </section>
            <div className="my-8 ml-10">
                <h2 className="text-5xl font-bold mb-10">Recent Reviews</h2>
                <div className="mx-10">
                    <AlbumReview albumName="Album Name" artist="Artist" imageUrl="" review="Review ..." reviewDate="00/00/0000" starRating={4} />
                </div>
            </div>
        </main>
    );
}

// TODO: Needs refactoring
async function getTop(type: string, session: Session | null, number: Number) {
    if (session) {
        let token = session.accessToken

        const response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?limit=" + number, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return (
            <div className="my-8 ml-10">
                <h2 className="text-5xl font-bold mb-4">Top {type.charAt(0).toUpperCase() + type.substring(1)}</h2>
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

    if (type === 'artists') {
        return data.items.map((item: { id: string, name: string; images: { url: string; }[]; }, index: Key | null | undefined) => {
            // html.push(
            return <ArtistLarge key={item.id} spotifyId={item.id} name={item.name} imageUrl={item.images[0].url} ranking={Number(index) + 1} starRating={0} />
            // );
        });
    } else if (type === 'tracks') {
        return data.items.map((track: { album: any; id: Key | null | undefined; name: string; }) => {
            let album = track.album

            // console.log(album)
            // console.log(album.name)
            // console.log(album.images[0].url)

            // html.push(
            return <TrackLarge key={track.id} albumName={album.name} trackName={track.name} imageUrl={album.images[0].url} starRating={1} />
            // );
        });
    }

    return <></>;
}