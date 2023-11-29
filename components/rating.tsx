'use client'

import React from 'react'
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';

interface RatingProps {
    spotifyId: string;
    type: string;
    starRating: number;
    noEdit?: boolean;
}

const CustomRating: React.FC<RatingProps> = ({ spotifyId, type, starRating, noEdit }) => {
    const router = useRouter();
    const [value, setValue] = React.useState<number | null>(starRating);

    const changeRating = (e: React.ChangeEvent<{}>, newValue: number | null) => {
        setValue(newValue);
        // Redirect to review
        router.push(`/protected/review/${type}s/${spotifyId}?rating=${newValue}`);
    };

    return (
            <Rating className='hue-rotate-90 invert -left-1' name="simple-controlled"
                value={value} precision={0.5} size="large"
                onChange={changeRating} readOnly={noEdit}
            />
    );
};

export default CustomRating;
