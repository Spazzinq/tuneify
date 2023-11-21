import React, { Suspense } from 'react';
import Image from 'next/image';
import { addToCache } from '@/db';
import CustomRating from '@/components/rating';
import Skeleton from '@mui/material/Skeleton';
import Tuneify from '/public/tuneify.svg';

interface BoxOneLineProps {
    spotifyId?: string;
    type: string
    title: string;
    imageUrl: string;
    ranking?: number;
    starRating?: number;
}

const BoxOneLine: React.FC<BoxOneLineProps> = async ({ spotifyId, type, title, imageUrl, ranking, starRating }) => {
    const MAX_TITLE_LENGTH = 16;
    const shortTitle = title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + "..." : title;

    if (spotifyId) {
        addToCache(spotifyId, type, title, imageUrl);

        return (
            <div className="relative">
                {ranking ? <h3 className="text-5xl font-bold drop-shadow-lg absolute -left-3 -top-3">{ranking}</h3> : <></>}
                <div className='mb-3'>
                    <Suspense fallback={<Skeleton animation="wave" variant="rounded" width={200} height={200} className="bg-gray-700" />}>
                        <Image src={imageUrl || Tuneify} alt={title} width='200' height='200' className="rounded-lg aspect-square" />
                    </Suspense>
                </div>

                <h3 className="text-left text-xl font-bold">{shortTitle}</h3>
                {starRating ? <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} /> : <></>}
            </div>
        );
    }
};
export default BoxOneLine;
