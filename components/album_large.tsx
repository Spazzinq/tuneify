import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { IconUnkown } from './icons';

interface AlbumLargeProps {
    name: string;
    imageUrl: string;
    ranking: number;
    starRating: number;
}

const AlbumLarge: React.FC<AlbumLargeProps> = ({ name, imageUrl, ranking, starRating }) => {
    return (
        <div className="relative">
            <h3 className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</h3>
            {
                imageUrl == '' ? <IconUnkown className="rounded-lg aspect-square mb-3"></IconUnkown>
                    : <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square mb-3" />
            }
            <h3 className="text-left text-xl font-bold mb-1">{name}</h3>
            {
                starRating != 0 ? <Rating starRating={starRating} /> : <></>
            }
        </div>
    );
};
export default AlbumLarge;
