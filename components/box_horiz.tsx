import React, { Suspense } from 'react';
import Image from 'next/image';
import CustomRating from '@/components/rating';
import Skeleton from '@mui/material/Skeleton';
import Tuneify from '/public/tuneify.svg';
import Link from 'next/link';
import EditIcon from '/public/pencil.svg';

interface BoxHorizProps {
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

const BoxHoriz: React.FC<BoxHorizProps> = ({ spotifyId, type, title, subtitle, imageUrl, content, date, starRating, className, noEdit }) => {
    return (
        <div className={"flex " + className}>
            <Link href={"https://open.spotify.com/" + type + "/" + spotifyId} target="_blank">
                <Suspense fallback={<Skeleton animation="wave" variant="rounded" width={200} height={200} className="bg-gray-700" />}>
                    <Image src={imageUrl || Tuneify} alt={title} width='200' height='200' className="rounded-lg aspect-square" priority />
                </Suspense>
            </Link>
            <div className="flex flex-col justify-center ml-6">
                <h1 className="text-3xl font-bold">{title}</h1>
                {subtitle ? <h2 className="text-xl">{subtitle}</h2> : <></>}
                {date ? <h3>{date}</h3> : <></>}
                <div className="flex flex-row">
                    <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} noEdit={noEdit} />
                    { noEdit ? <></> : <Image src={EditIcon} alt="Edit icon" /> }

                </div>
                {content ? <span className="mt-4 text-sm break-all">{content}</span> : <></>}
            </div>

        </div>
    );
};
export default BoxHoriz;