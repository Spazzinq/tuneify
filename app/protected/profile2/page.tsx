import { auth } from "@/auth";
import Navbar from "@/components/nav";
import { JSX, Key, Suspense } from "react";
import { Session } from "next-auth";
import { createUser, getFromCache, getFromReview } from "@/db";
import { SpotifyArtist, SpotifyTrack } from "@/spotify";
import Image from 'next/image'
import BoxHoriz from "@/components/box_horiz";

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
                <Image src={session?.user?.image || ''} alt="Profile Picture" placeholder='blur' blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' className="h-20 w-20 rounded-full mr-2" width={40} height={40} />
            </section>
            <section>
                <div className="my-8 ml-10">
                <h2 className="text-5xl font-bold mb-10"> Your Recent Reviews</h2>
                <div className="mx-10">
                    <BoxHoriz spotifyId={""} type="" title="Album Name" subtitle="Artist" imageUrl="" review="Review ..." date="00/00/0000" starRating={4} />
                </div>
            </div>
            </section>
        </main>
    );
}