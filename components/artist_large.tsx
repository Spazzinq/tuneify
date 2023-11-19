import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { addToCache } from '@/db';

interface ArtistProps {
    spotifyId: string;
    name: string;
    imageUrl: string;
    ranking: number;
    starRating: number;
}

const ArtistLarge: React.FC<ArtistProps> = async ({ spotifyId, name, imageUrl, ranking, starRating }) => {
    addToCache(spotifyId, 'artist', name, imageUrl);

    return (
        <div className="relative">
            <h3 className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</h3>
            <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square mb-3" />
            <h3 className="text-left text-xl font-bold mb-1">{name}</h3>
            {
                starRating != -1 ? <Rating starRating={starRating} /> : <></>
            }
        </div>
    );

};
export default ArtistLarge;
