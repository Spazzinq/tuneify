import { auth } from "@/auth";
import { Session } from "next-auth";
import { signOut } from "next-auth/react"
import Artist from "@/app/components/artist";
import Track from "@/app/components/track";
import Image from 'next/image'

export default async function Page() {
    const session = await auth()

    return (
        <section className="py-24">
            <div className="container">
                <h2 className="mt-4 font-medium text-emerald-500">Logged in as:</h2>
                {sessionData(session)}
                {getTop('artists', session)}
                {getTop('tracks', session)}
            </div>
        </section>
    );
}

async function getTop(type : String, session: Session | null) {
    if (session && session.user) {
        let token = session.user.accessToken

        const response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?limit=3", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return parseResponse(type, response);
    }
}

async function parseResponse(type : String, response: any) {
    if (response.status == 204) {
        console.log("204 response from currently playing")
        return;
    }

    const data = await response.json();
    let html = '';

    if (type === 'artists') {
        html = data.items.map((item: any, index: any) => {
            return (
                <Artist key={index} name={item.name} imageUrl={item.images[0].url} />
            );
        });
    } else if (type === 'tracks') {
        html = data.items.map((track: any) => {
            let album = track.album

            // console.log(album)
            // console.log(album.name)
            // console.log(album.images[0].url)

            return (
                <Track key={track.id} albumName={album.name} trackName={track.name} imageUrl={album.images[0].url} />
            );
        });
    }
        

    return html;
}

function sessionData(session: Session | null) {
    if (session) {
        const { user } = session;
        if (user) {
            return (
                <div>
                    <ul className="mt-4">
                        <Image src={user.image} />
                        {Object.keys(user).map((key, index) => (
                            <li key={index}>
                                <strong>{key}: </strong>
                                <span className="font-light">
                                    {user[key as keyof typeof user]}
                                </span>
                            </li>
                        ))}
                    </ul>
                    {/* <button
                        onClick={signOut({ callbackUrl: "http://localhost:3000/" })}
                    >
                        Sign out
                    </button> */}
                    
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