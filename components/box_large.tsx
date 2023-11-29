import React, { Suspense } from 'react';
import Image from 'next/image';
import CustomRating from '@/components/rating';
import Skeleton from '@mui/material/Skeleton';
import Tuneify from '/public/tuneify.svg';
import Link from 'next/link';

interface BoxLargeProps {
    spotifyId: string;
    type: string;
    title: string;
    subtitle?: string;
    imageUrl: string | null;
    content?: string;
    date?: string;
    starRating: number;
    className?: string;
    noEdit?: boolean;
}

const BoxLarge: React.FC<BoxLargeProps> = ({ spotifyId, type, title, subtitle, imageUrl, content, date, starRating, className, noEdit }) => {
    return (
        <div className={className}>
            <div className="flex">
                <Link href={"https://open.spotify.com/" + type + "/" + spotifyId} target="_blank">
                    <Suspense fallback={<Skeleton animation="wave" variant="rounded" width={100} height={100} className="bg-gray-700" />}>
                        <Image src={imageUrl || Tuneify} alt={title} width='100' height='100' className="rounded-lg aspect-square" />
                    </Suspense>
                </Link>
                <div className="flex flex-col justify-center ml-6">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    {subtitle ? <h2 className="text-xl">{subtitle}</h2> : <></>}
                    {date ? <h3>{date}</h3> : <></>}
                    <div className="flex flex-row">
                        <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} noEdit={noEdit} />
                        { noEdit ? <></> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg> }

                    </div>
                </div>
            </div>
            {content ? <p className="mt-4 text-sm break-all">{content}</p> : <></>}
        </div>

    );
};
export default BoxLarge;