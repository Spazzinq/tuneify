import React from 'react';
import Image from 'next/image'
import Rating from './rating';

interface TrackProps {
    trackName: string;
    imageUrl: string;
    albumName: string;
    starRating: number;
}

const TrackLarge: React.FC<TrackProps> = ({ trackName, imageUrl, albumName, starRating }) => {
    const MAX_TRACK_LENGTH = 12;
    const MAX_ALBUM_LENGTH = 13;
    const shortTrackName = trackName.length > MAX_TRACK_LENGTH ? trackName.slice(0, MAX_TRACK_LENGTH) + "..." : trackName;
    const shortAlbumName = albumName.length > MAX_ALBUM_LENGTH ? albumName.slice(0, MAX_ALBUM_LENGTH) + "..." : albumName;

    return (
            <div className="p-10">
                <Image src={imageUrl} alt={trackName} width='200' height='200' className="rounded-lg mb-4" />
                <div className="flex flex-col">
                    <h2 className="text-left text-xl font-bold">{shortTrackName}</h2>
                    <p className="text-left text-base">{shortAlbumName}</p>
                </div>
                <Rating starRating={starRating}  />
            </div>
        );
};

export default TrackLarge;
