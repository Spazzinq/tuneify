import { auth } from "@/auth";
import Navbar from "@/components/nav";
import { Key } from "react";
import ArtistLarge from "@/components/artist_large";
import TrackLarge from "@/components/track_large";
import AlbumReview from "@/components/album_review";
import { Session } from "next-auth";

export default async function Page() {
    const session = await auth()
    const url = session?.user?.image
    const name = session?.user?.name

    const categories = ['artists', 'tracks']

    return (
        <main>
            <Navbar profileImageUrl={url || ''}></Navbar>
            {/* <h2 className="text-2xl font-bold text-center mb-4">Welcome, {name}!</h2> */}
            {/* <div className="text-center">{sessionData(session)}</div> */}
            <section>
                {categories.map((category) => {
                    return (
                        <div key={category} className="my-8 ml-10">
                            <h2 className="text-5xl font-bold mb-4">{('Top ' + category[0].toUpperCase() + category.substring(1))}</h2>
                            <div className="flex flex-row gap-16 ml-10 mr-20 my-12">
                                {getTop(category, session, 5)}
                            </div>
                        </div>
                    )
                })}
            </section>
            <div className="my-8 ml-10"> 
                <h2 className="text-5xl font-bold mb-10">Recent Reviews</h2>
                <div className="mx-10"> 
                <AlbumReview albumName="Album Name" artist="Artist" imageUrl="" review="Review ..." reviewDate="00/00/0000" starRating={4}/>
                </div>
            </div>
        </main>
    );
}

async function getTop(type: string, session: Session | null, number: Number) {
    if (session) {
        let token = session.accessToken

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
    let html = <></>; // return fragment if no data

    if (type === 'artists') {
        html = data.items.map((item: { name: string; images: { url: string; }[]; }, index: Key | null | undefined) => {
            return (
                <ArtistLarge key={item.name} name={item.name} imageUrl={item.images[0].url} ranking={Number(index) + 1} starRating={0} />
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

function sessionData(session: Session | null) {
    if (session) {
        const { user } = session;
        if (user) {
            return (
                <div>
                    <ul className="mt-4">
                        {Object.keys(user).map((key) => (
                            <li key={key}>
                                <strong>{key}: </strong>
                                <span className="font-light">
                                    {user[key as keyof typeof user]}
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