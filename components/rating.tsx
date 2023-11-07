'use client'

import React from 'react'
import { IconStar } from './icons'

interface RatingProps {
    starRating: number;
}

const MAX_RATING = 5.0;
const FIVE_STAR_REM_LENGTH = 8; // rem

const Rating: React.FC<RatingProps> = ({ starRating }) => {
    /* Calculate how much of the stars should be "filled" */
    const percentage = FIVE_STAR_REM_LENGTH * (starRating / MAX_RATING);

    return (
        <div className="flex flex-row relative" onClick={() => { console.log("test") }}>
            {/* Create an array based on the max rating, render a star for each */}
            {Array.from(Array(MAX_RATING).keys()).map((_, i) => (
                <IconStar key={String(i)} className="flex w-18 mr-0.5 text-orange-300" />
            ))}
            {/* Render a div overlayed on top of the stars that are not filled */}
            <div
                className={'absolute h-6 w-32 z-1 bg-black opacity-70'}
                style={{ marginLeft: `${percentage}rem`}}
            />
        </div>
    );
};

export default Rating;
