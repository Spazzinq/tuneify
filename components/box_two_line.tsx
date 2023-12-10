import React, { Suspense } from 'react';
import Image from 'next/image'
import CustomRating from '@/components/rating';
import { addToCache } from '@/db';
import Skeleton from '@mui/material/Skeleton';
import Tuneify from '/public/tuneify.svg';
import Link from 'next/link';

interface BoxTwoLineProps {
    spotifyId?: string;
    type: string;
    title: string;
    imageUrl: string | null;
    subtitle: string;
    ranking?: number;
    starRating?: number;
}

const BoxTwoLine: React.FC<BoxTwoLineProps> = ({ spotifyId, type, title, subtitle, imageUrl, ranking, starRating }) => {
    const MAX_TITLE_LENGTH = 16;
    const MAX_SUBTITLE_LENGTH = 20;
    const shortTitle = title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + "..." : title;
    const shortSubtitle = subtitle.length > MAX_SUBTITLE_LENGTH ? subtitle.slice(0, MAX_SUBTITLE_LENGTH) + "..." : subtitle;

    if (spotifyId) {
        if (imageUrl) {
            addToCache(spotifyId, type, title, imageUrl);
        }

        return (
            <div className="relative">
                {/* {ranking ? <h3 className="text-5xl font-bold absolute -left-3 -top-3">{ranking}</h3> : <></>} */}
                <Link href={"https://open.spotify.com/" + type + "/" + spotifyId} target="_blank">
                    <Suspense fallback={<Skeleton animation="wave" variant="rounded" width={200} height={200} className="bg-gray-700" />}>
                        <Image src={imageUrl || Tuneify} alt={title} width='200' height='200' className="mb-4" priority />
                    </Suspense>
                </Link>
                <div className="flex flex-col mb-1">
                    <h2 className="text-left text-xl font-bold">{shortTitle}</h2>
                    <p className="text-left text-sm">{shortSubtitle}</p>
                </div>
                {starRating != undefined ? <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} /> : <></>}
            </div>
        );
    }
};

export default BoxTwoLine;
