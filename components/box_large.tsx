import React, { Suspense } from 'react';
import Image from 'next/image';
import CustomRating from '@/components/rating';
import Skeleton from '@mui/material/Skeleton';
import Tuneify from '/public/tuneify.svg';
import Link from 'next/link';
import EditIcon from '/public/pencil.svg';

interface BoxLargeProps {
    spotifyId: string;
    type: string;
    title: string;
    subtitle?: string;
    imageUrl: string | null;
    contentTitle?: string;
    content?: string;
    date?: string;
    starRating: number;
    className?: string;
    noEdit?: boolean;
}

const BoxLarge: React.FC<BoxLargeProps> = ({ spotifyId, type, title, subtitle, imageUrl, contentTitle, content, date, starRating, className, noEdit }) => {
    return (
        <div className={className}>
            <div className="flex">
                <Link href={"https://open.spotify.com/" + type + "/" + spotifyId} target="_blank">
                    <Suspense fallback={<Skeleton animation="wave" variant="rounded" width={100} height={100} className="bg-gray-700" />}>
                        <Image src={imageUrl || Tuneify} alt={title} width='100' height='100' className="aspect-square" priority />
                    </Suspense>
                </Link>
                <div className="flex flex-col justify-center ml-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {subtitle ? <h2 className="text-xl">{subtitle}</h2> : <></>}
                    {date ? <h3>{date}</h3> : <></>}
                    <div className="flex flex-row">
                        <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} noEdit={noEdit} />
                        { noEdit ? <></> : <Image src={EditIcon} alt="Edit icon" /> }
                    </div>
                </div>
            </div>
            
            {content && contentTitle ? 
            <div className="mt-6 mb-6">
                <h2 className="text-2xl"> {contentTitle} </h2>
                <p className="mt-2 text-sm break-all">{content}</p> 
            </div>
            : <></>}
        </div>

    );
};
export default BoxLarge;