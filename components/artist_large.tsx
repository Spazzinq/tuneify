import React from 'react';
import Image from 'next/image';
import Rating from './rating';

interface ArtistProps {
    name: string;
    imageUrl: string;
    ranking: number;
    starRating: number;
}

async function getArtistImage(artistName: string) {
    const response = await fetch("https://api.spotify.com/v1/search?q=" + artistName + "&type=artist&limit=1", {
        headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_CLIENT_SECRET}`
        }
    });

    if (response.status == 204) {
        console.log("204 response from currently playing")
        return;
    }

    const data = await response.json();
    console.log(data);
    return data.artists.items[0].images[0].url;
}

const ArtistLarge: React.FC<ArtistProps> = async ({ name, imageUrl, ranking, starRating }) => {
    if (imageUrl == '') {
        // imageUrl = await getArtistImage(name);
    }

    return (
        <div className="relative">
            <h3 className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</h3>
            <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square mb-3" />
            <h3 className="text-left text-xl font-bold mb-1">{name}</h3>
            <Rating starRating={starRating} />
        </div>
    );

};
export default ArtistLarge;
