import React from 'react';
import Image from 'next/image';
import Rating from './rating';
import { IconUnkown } from './icons';

interface UserReviewProps {
    userName: string;
    imageUrl: string;
    review: string;
    reviewDate: string;
    starRating: number;
}

const UserReview: React.FC<UserReviewProps> = ({ userName, imageUrl, review, reviewDate, starRating }) => {
    return (
        <div className="flex mb-8">
            {
                imageUrl == '' ? <IconUnkown className="rounded-full aspect-square mb-3" width='100' height='100'></IconUnkown>
                    : <Image src={imageUrl} alt={userName} width='100' height='100' className="rounded-full aspect-square mb-3" />
            }
            <div className="ml-8 mt-2"> 
              <h1 className="text-2xl font-bold">{userName}</h1>
              <h3>{reviewDate}</h3>
              <p> {review} </p>
            </div>
          <div className="ml-4 mt-4">
              <Rating starRating={starRating}></Rating> 
          </div>
        </div>
    );
};
export default UserReview;