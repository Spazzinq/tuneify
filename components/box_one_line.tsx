import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { addToCache } from '@/db';

interface BoxOneLineProps {
    spotifyId?: string;
    type: string
    title: string;
    imageUrl: string;
    ranking?: number;
    starRating?: number;
}

const BoxOneLine: React.FC<BoxOneLineProps> = async ({ spotifyId, type, title, imageUrl, ranking, starRating }) => {
    const MAX_TITLE_LENGTH = 20;
    const shortTitle = title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + "..." : title;

    if (spotifyId) {
        addToCache(spotifyId, type, title, imageUrl);
    }
    
    return (
        <div className="relative">
            { ranking ? <h3 className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</h3> : <></> }
            <Image src={imageUrl} alt={title} width='200' height='200' className="rounded-lg aspect-square mb-3" />
            <h3 className="text-left text-xl font-bold mb-1">{shortTitle}</h3>
            { starRating ? <Rating starRating={starRating} /> : <></> }
        </div>
    );

};
export default BoxOneLine;
