import { auth } from "@/auth";
import Image from 'next/image'
import Navbar from "@/components/nav";
import { Key } from "react";
import ArtistLarge from "@/components/artist_large";
import TrackLarge from "@/components/track_large";

export default async function Page() {
    const session = await auth()

    const categories = ['artists', 'tracks']

    return (
        <main>
            <Navbar profileImageUrl={ session.user.image }></Navbar>
            <h2 className="text-3xl font-bold text-center mb-4">Welcome, { session.user.name }</h2>
            <p className="text-center">{sessionData(session)}</p>
            <div className="container">


                {categories.map((category) => (
                    <div className="my-8">
                        <h2 className="text-5xl font-bold mb-4">{('Top ' + category[0].toUpperCase() + category.substring(1))}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                            {getTop(category, session, 5)}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

async function getTop(type: string, session: { user: { accessToken: any; }; }, number: Number) {
    if (session && session.user) {
        let token = session.user.accessToken

        const response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?limit=" + number, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return parseResponse(type, response);
    }
}

async function parseResponse(type: string, response: Response) {
    if (response.status == 204) {
        console.log("204 response from currently playing")
        return;
    }

    const data = await response.json();
    let html = '';

    if (type === 'artists') {
        html = data.items.map((item: { name: string; images: { url: string; }[]; }, index: Key | null | undefined) => {
            return (
                <ArtistLarge key={index} name={item.name} imageUrl={item.images[0].url} ranking={Number(index) + 1} starRating={0} />
            );
        });
    } else if (type === 'tracks') {
        html = data.items.map((track: { album: any; id: Key | null | undefined; name: string; }) => {
            let album = track.album

            // console.log(album)
            // console.log(album.name)
            // console.log(album.images[0].url)

            return (
                <TrackLarge key={track.id} albumName={album.name} trackName={track.name} imageUrl={album.images[0].url} starRating={1} />
            );
        });
    }


    return html;
}

function sessionData(session: { user: any; }) {
    if (session) {
        const { user } = session;
        if (user) {
            return (
                <div>
                    <ul className="mt-4">
                        {Object.keys(user).map((key, index) => (
                            <li key={index}>
                                <strong>{key}: </strong>
                                <span className="font-light">
                                    {user[key]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    return (
        <p className="mt-4 text-red-500">
            Problem with session, please try again
        </p>
    );
}