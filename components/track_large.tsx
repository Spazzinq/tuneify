import React from 'react';
import Image from 'next/image'

interface TrackProps {
    trackName: string;
    imageUrl: string;
    albumName: string;
}

const TrackLarge: React.FC<TrackProps> = ({ trackName, imageUrl, albumName }) => {
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
            </div>
        );
};

export default TrackLarge;
