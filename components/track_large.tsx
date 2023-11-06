import React from 'react';
import Image from 'next/image'

interface TrackProps {
    trackName: string;
    imageUrl: string;
    albumName: string;
}

const TrackLarge: React.FC<TrackProps> = ({ trackName, imageUrl, albumName }) => {
    const MAX_LENGTH = 13;
    const shortTrackName = trackName.length > MAX_LENGTH ? trackName.slice(0, MAX_LENGTH) + "..." : trackName;
    const shortAlbumName = albumName.length > MAX_LENGTH ? albumName.slice(0, MAX_LENGTH) + "..." : albumName;

    return (
            <div className="border-2 border-black p-10 rounded-lg grid grid-cols-1fr-20fr max-w-full">
                <Image src={imageUrl} alt={trackName} width='200' height='200' className="rounded-lg mb-4" />
                <div className="flex flex-col">
                    <h2 className="text-left text-2xl font-bold mb-2">{shortTrackName}</h2>
                    <p className="text-left text-lg">{shortAlbumName}</p>
                </div>
            </div>
        );
};

export default TrackLarge;
