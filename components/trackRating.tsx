import React from 'react';
import Image from 'next/image'
import Rating from './rating';
import Track from './track';

interface TrackRatingProps {
    num: number;
    trackName: string;
    albumName: string;
    starRating: number;
    review: string;
}

const TrackRating: React.FC<TrackRatingProps> = ({ num, trackName, albumName, starRating, review }) => {
    return (
        <div className="flex"> 
            <h1>{num}.</h1>
            <Track trackName={trackName} imageUrl={""} albumName={albumName}/>
            <div className="flex flex-col ml-6">
                <Rating starRating={starRating} />
                <p>{review}</p>
            </div>
        </div>
    );
};

export default TrackRating;
