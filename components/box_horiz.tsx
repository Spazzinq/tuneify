import React from 'react';
import Image from 'next/image';
import CustomRating from './rating';
import { IconUnkown } from './icons';

interface BoxHorizProps {
  spotifyId: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  review?: string;
  date?: string;
  starRating?: number;
  className?: string;
}

const BoxHoriz: React.FC<BoxHorizProps> = ({ spotifyId, title, subtitle, imageUrl, review, date, starRating, className }) => {
  return (
    <div className={"flex " + className}>
      {
        imageUrl == '' ? <IconUnkown className="rounded aspect-square mb-3"></IconUnkown>
          : <Image src={imageUrl} alt={title} width='200' height='200' className="rounded-lg aspect-square mb-3" />
      }
      <div className="flex flex-col justify-center ml-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle ? <h2 className="text-2xl">{subtitle}</h2> : <></>}
          {date ? <h3>{date}</h3> : <></>}
          {review ? <p>{review}</p> : <></>}
          {starRating ? <CustomRating spotifyId={spotifyId} starRating={starRating} /> : <></>}
      </div>

    </div>
  );
};
export default BoxHoriz;