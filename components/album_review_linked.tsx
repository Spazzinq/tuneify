import React from 'react';
import Image from 'next/image';
import CustomRating from './rating';
import { IconUnkown } from './icons';
import Link from 'next/link';

interface AlbumProps {
    name: string;
    imageUrl: string;
    starRating: number;
    reviewId: string;
}

const Album: React.FC<AlbumProps> = ({ name, imageUrl, starRating, reviewId }) => {
    return (
        <Link href={{
            pathname: "/protected/diary/entry",
            query: {reviewId : reviewId}
        }}> 
            <div className="relative">
                {
                    imageUrl == '' ? <IconUnkown width='150' height='150' className="rounded-lg aspect-square mb-3"></IconUnkown>
                        : <Image src={imageUrl} alt={name} width='150' height='150' className="rounded-lg aspect-square mb-3" />
                }
                <h3 className="text-left text-xl font-bold mb-1">{name}</h3>
                <CustomRating starRating={starRating} />
            </div>
        </ Link>
    );
};
export default Album;
