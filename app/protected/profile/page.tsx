import { auth } from "@/auth";
import Artist from "@/components/artist";
import Track from "@/components/track";
import Image from 'next/image'
import Navbar from "@/components/nav";
import { Key } from "react";
import ArtistSquare from "@/components/artist_square";
import TrackLarge from "@/components/track_large";

export default async function Page() {
    const session = await auth()

    return (
        <section>
            <Navbar></Navbar>
            <div className="container">
                <h2 className="mt-4 font-medium text-emerald-500">Logged in as:</h2>
                {sessionData(session)}

                
                <div className="my-8">
                    <h2 className="text-2xl font-bold">Top Artists</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        {getTop('artists', session, 5)}
                    </div>
                </div>

                <div className="my-8">
                    <h2 className="text-2xl font-bold">Top Tracks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                        {getTop('tracks', session, 5)}
                    </div>
                </div>
            </div>
        </section>
    );
}

async function getTop(type: string, session: { user: { accessToken: any; }; }, number : Number) {
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
                <ArtistSquare key={index} name={item.name} imageUrl={item.images[0].url} />
            );
        });
    } else if (type === 'tracks') {
        html = data.items.map((track: { album: any; id: Key | null | undefined; name: string; }) => {
            let album = track.album

            // console.log(album)
            // console.log(album.name)
            // console.log(album.images[0].url)

            return (
                <TrackLarge key={track.id} albumName={album.name} trackName={track.name} imageUrl={album.images[0].url} />
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
                        <Image src={user.image} width='50' height='50' alt={""} />
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