import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { IconUnkown } from './icons';

interface AlbumProps {
    name: string;
    imageUrl: string;
    starRating: number;
}

const AlbumLarge: React.FC<AlbumProps> = ({ name, imageUrl, starRating }) => {
    return (
        <div className="relative">
            {
                imageUrl == '' ? <IconUnkown width='150' height='150' className="rounded-lg aspect-square mb-3"></IconUnkown>
                    : <Image src={imageUrl} alt={name} width='150' height='150' className="rounded-lg aspect-square mb-3" />
            }
            <h3 className="text-left text-xl font-bold mb-1">{name}</h3>
            <Rating starRating={starRating} />
        </div>
    );
};
export default AlbumLarge;
