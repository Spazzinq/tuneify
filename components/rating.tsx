'use client'

import React, { useEffect } from 'react'
import { IconStar } from './icons'
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';

interface RatingProps {
    spotifyId: string;
    type: string;
    starRating: number;
}

const MAX_RATING = 5.0;
const FIVE_STAR_REM_LENGTH = 8; // rem

const CustomRating: React.FC<RatingProps> = ({ spotifyId, type, starRating }) => {
    /* Calculate how much of the stars should be "filled" */
    // const percentage = FIVE_STAR_REM_LENGTH * (starRating / MAX_RATING);
    const [value, setValue] = React.useState<number | null>(starRating);

    let link = '/protected/review/' + type + 's/' + spotifyId;

    return (
        <div>
            <Rating className='invert -left-1' name="simple-controlled"
                value={starRating} precision={0.5} size="large"
                onChange={(event, newValue) => {
                    setValue(newValue);

                    useEffect(() => {
                        useRouter().push('/protected/review/' + type + 's/' + spotifyId + "?rating=" + newValue) })
                }}
            />
        </div>
    );
};

// {/* <div className="flex flex-row relative">
//                 {/* Create an array based on the max rating, render a star for each */}
//                 {Array.from(Array(MAX_RATING).keys()).map((_, i) => (
//                     <IconStar key={String(i)} className="flex w-18 mr-0.5 text-orange-300" />
//                 ))}
//                 {/* Render a div overlayed on top of the stars that are not filled */}
//                 <div
//                     className={'absolute h-6 w-32 z-1 bg-black opacity-70'}
//                     style={{ marginLeft: `${percentage}rem` }}
//                 />
//                 <div className='absolute h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-4 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 {/* <div className='absolute left-6 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-9 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-12 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute y-12 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-18 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-21 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-24 h-6 w-3 z-2 bg-emerald-400 opacity-70' />
//                 <div className='absolute left-27 h-6 w-3 z-2 bg-emerald-400 opacity-70' /> */}
//             </div> */}

export default CustomRating;
