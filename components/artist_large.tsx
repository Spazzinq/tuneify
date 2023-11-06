import React from 'react';
import Image from 'next/image';
import Rating from './rating';

interface ArtistProps {
    name: string;
    imageUrl: string;
    ranking: number;
    starRating: number;
}

const ArtistLarge: React.FC<ArtistProps> = ({ name, imageUrl, ranking, starRating }) => {
    return (
        <div className="p-10">
            <div className="flex flex-row mb-3 relative">
                <div className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</div>
                <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square" />
            </div>
            <h2 className="text-left text-xl font-bold mb-1">{name}</h2>
            <Rating starRating={starRating} />
        </div>
    );
};
export default ArtistLarge;
