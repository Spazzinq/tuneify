import React from 'react';
import Image from 'next/image'
import star from 'components/static/star.svg'
import unfilledStar from 'components/static/unfilled-star.svg'

interface TrackProps {
    trackName: string;
    imageUrl: string;
    albumName: string;
    starRating: number;
}

const TrackLarge: React.FC<TrackProps> = ({ trackName, imageUrl, albumName, starRating }) => {
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

    const MAX_TRACK_LENGTH = 13;
    const MAX_ALBUM_LENGTH = 16;
    const shortTrackName = trackName.length > MAX_TRACK_LENGTH ? trackName.slice(0, MAX_TRACK_LENGTH) + "..." : trackName;
    const shortAlbumName = albumName.length > MAX_ALBUM_LENGTH ? albumName.slice(0, MAX_ALBUM_LENGTH) + "..." : albumName;

    return (
            <div className="p-10">
                <Image src={imageUrl} alt={trackName} width='200' height='200' className="rounded-lg mb-4" />
                <div className="flex flex-col">
                    <h2 className="text-left text-2xl font-bold">{shortTrackName}</h2>
                    <p className="text-left text-lg">{shortAlbumName}</p>
                </div>
                <div className="flex flex-row">
                    {stars}
                </div>
            </div>
        );
};

export default TrackLarge;
