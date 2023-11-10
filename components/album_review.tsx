import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { IconUnkown } from './icons';

interface AlbumReviewProps {
    albumName: string;
    artist: string;
    imageUrl: string;
    review: string;
    reviewDate: string;
    starRating: number;
}

const AlbumReview: React.FC<AlbumReviewProps> = ({ albumName, artist, imageUrl, review, reviewDate, starRating }) => {
    return (
        <div className="flex mb-8">
            {
                imageUrl == '' ? <IconUnkown className="rounded-lg aspect-square mb-3"></IconUnkown>
                    : <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square mb-3" />
            }
            <div className="ml-8 mt-7"> 
              <h1 className="text-5xl font-bold">{albumName}</h1>
              <h2 className="text-2xl">{artist}</h2>
              <h3>{reviewDate}</h3>
              <p> {review} </p>
            </div>
          <div className="ml-4 mt-11">
              <Rating starRating={starRating}></Rating> 
          </div>
        </div>
    );
};
export default AlbumReview;