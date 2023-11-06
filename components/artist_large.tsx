import React from 'react';
import Image from 'next/image'
import star from 'components/static/star.svg'
import unfilledStar from 'components/static/unfilled-star.svg'

interface ArtistProps {
    name: string;
    imageUrl: string;
    ranking: number;
    starRating: number;
}

const ArtistLarge: React.FC<ArtistProps> = ({ name, imageUrl, ranking, starRating }) => {
    const fullStars = Math.floor(starRating);
    const partialStars = starRating - fullStars;
    const stars = [];

    if (starRating > 0) {
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Image key={i} src={star} alt="star" width='20' height='20' />);
        }
        if (partialStars > 0) {
            stars.push(<Image key={fullStars} src="/half-star.png" alt="half-star" width='20' height='20' />);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            stars.push(<Image key={i} src={unfilledStar} alt="star" width='20' height='20' />);
        }
    }


    return (
        <div className="p-10">
            <div className="flex flex-row mb-4 relative">
                <div className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</div>
                <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square" />
            </div>
            <h2 className="text-left text-2xl font-bold mb-1">{name}</h2>
            <div className="flex flex-row">
                {stars}
            </div>
        </div>
    );
};
export default ArtistLarge;
