import React from 'react';
import Image from 'next/image'

interface ArtistProps {
    name: string;
    imageUrl: string;
    ranking: number;
}

const ArtistSquare: React.FC<ArtistProps> = ({ name, imageUrl, ranking }) => {
    return (
        <div className="p-10">
            <div className="flex flex-row mb-4 relative">
                <div className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</div>
                <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square" />
            </div>
            <h2 className="text-left text-2xl font-bold">{name}</h2>
        </div>
    );
};
export default ArtistSquare;
