import React from 'react';
import Image from 'next/image';
import CustomRating from './rating';
import { IconUnkown } from './icons';
import EditIcon from '@mui/icons-material/Edit';

interface BoxHorizProps {
  spotifyId: string;
  type: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  review?: string;
  date?: string;
  starRating: number;
  className?: string;
}

const BoxHoriz: React.FC<BoxHorizProps> = ({ spotifyId, type, title, subtitle, imageUrl, review, date, starRating, className }) => {
  return (
    <div className={"flex " + className}>
      <Image src={imageUrl} alt={title} width='200' height='200' className="rounded-lg aspect-square" />
      <div className="flex flex-col justify-center ml-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle ? <h2 className="text-xl">{subtitle}</h2> : <></>}
          {date ? <h3>{date}</h3> : <></>}
          <div className="flex flex-row">
            <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} />
            <EditIcon className="mt-1" />
          </div>
          {review ? <span className="mt-4 text-sm">{review}</span> : <></>}
      </div>

    </div>
  );
};
export default BoxHoriz;