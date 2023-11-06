'use client'

import React from 'react'
import Image from 'next/image'
import { IconStar } from './icons'
import star from 'components/static/star.svg'
import unfilledStar from 'components/static/unfilled-star.svg'

interface RatingProps {
    starRating: number;
}

const MAX_RATING = 5;

const Rating: React.FC<RatingProps> = ({ starRating }) => {
    /* Calculate how much of the stars should be "filled" */
    const percentage = Math.round((starRating / MAX_RATING) * 100);

    return (
        <div className="flex flex-row" onClick={() => { console.log("test") }}>
            {/* Create an array based on the max rating, render a star for each */}
            {Array.from(Array(MAX_RATING).keys()).map((_, i) => (
                <IconStar key={String(i)} className="flex w-18 mr-0.5 text-emerald-500 fill-emerald-500" />
            ))}
            {/* Render a div overlayed on top of the stars that are not filled */}
            <div
                className="absolute z-1 bg-black opacity-70"
                style={{ width: `${100 - percentage}%` }}
            />
        </div>
    );
};

export default Rating;
