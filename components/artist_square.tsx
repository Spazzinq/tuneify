import React from 'react';
import Image from 'next/image'

interface ArtistProps {
    name: string;
    imageUrl: string;
}

const ArtistSquare: React.FC<ArtistProps> = ({ name, imageUrl }) => {
    return (
        <div className="border-2 border-black p-10 rounded-lg max-w-md grid grid-cols-1 grid-rows-auto-1fr items-center">
            <div className="flex justify-center">
                <Image src={imageUrl} alt={name} width='100' height='100' className="self-start aspect-square" />
            </div>
            <h2 className="text-center text-2xl font-bold my-0 mt-4">{name}</h2>
        </div>
    );
};
export default ArtistSquare;
