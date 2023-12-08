import { auth } from "@/auth";
import BoxOneLine from "@/components/box_one_line";
import BoxTwoLine from "@/components/box_two_line";
import { createUser, getReview, getCurrentTuneifyId } from "@/db";
import { SpotifyArtist, SpotifyTrack, getUserTop } from "@/spotify";
import Link from "next/link";
import Image from 'next/image';
import BoxGrid from "@/components/grid";
import ShareIcon from '/public/share.svg';

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
            <section>
                <div className="mt-20 mb-20 ml-10">
                    <h2 className="text-4xl text-center pt-6 ml-2 mb-2">Here are your top artists and tracks!</h2>
                    <h3 className="text-2xl text-center ml-2 mb-12">Tell us what you think about them.</h3>
                    <Link href={"/protected/user/" + await getCurrentTuneifyId()} target="_blank">
                        <div className="flex justify-center">
                            <Image src={ShareIcon} alt="Share button" />
                            <h3 className="ml-3">Share your reviews</h3>
                        </div>
                    </Link>
                </div>
            </section>
            <div className="ml-10">
                {await formatSpotifyTop("Your Top Artists", 'artists')}
                {await formatSpotifyTop("Your Top Tracks", 'tracks')}
            </div>
        </main>
    );
}

/**
 * Format the user's top entries of the specified type
 * @param title Title of the section
 * @param type Type of entries ('artists' or 'tracks)
 * @returns HTML code displaying the user's top entries of the specified type
 */
async function formatSpotifyTop(title: string, type: string) {
    const data = await getUserTop(type);
    let html = <></>;

    if (type === 'artists') {
        html = data.map(async (item: SpotifyArtist, index: Number) => {
            const reviewItem = await getReview(await getCurrentTuneifyId(), item.id);

            return <BoxOneLine key={item.id} spotifyId={item.id} type="artist" title={item.name} imageUrl={item.images[0].url} ranking={Number(index) + 1} starRating={reviewItem?.stars || 0.01} />
        });
    } else if (type === 'tracks') {
        html = data.map(async (track: SpotifyTrack, index: Number) => {
            const reviewItem = await getReview(await getCurrentTuneifyId(), track.id);

            return <BoxTwoLine key={track.id} spotifyId={track.id} type="track" title={track.name} subtitle={track.album.name} imageUrl={track.album.images[0].url} ranking={Number(index) + 1} starRating={reviewItem?.stars || 0.01} />
        });
    }

    return (
        <BoxGrid title={title}>
            {html}
        </BoxGrid>
    );
}