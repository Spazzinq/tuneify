import React from 'react';
import Image from 'next/image'
import CustomRating from './rating';
import { addToCache } from '@/db';

interface BoxTwoLineProps {
    spotifyId?: string;
    type: string;
    title: string;
    imageUrl: string;
    subtitle: string;
    ranking?: number;
    starRating?: number;
}

const BoxTwoLine: React.FC<BoxTwoLineProps> = ({ spotifyId, type, title, subtitle, imageUrl, ranking, starRating }) => {
    const MAX_TITLE_LENGTH = 20;
    const MAX_SUBTITLE_LENGTH = 24;
    const shortTitle = title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + "..." : title;
    const shortSubtitle = subtitle.length > MAX_SUBTITLE_LENGTH ? subtitle.slice(0, MAX_SUBTITLE_LENGTH) + "..." : subtitle;

    if (spotifyId) {
        addToCache(spotifyId, type, title, imageUrl);

        return (
            <div className="relative">
                { ranking ? <h3 className="text-7xl font-bold absolute -left-5 -top-4">{ranking}</h3> : <></> }
                <Image src={imageUrl} alt={title} width='200' height='200' className="rounded-lg mb-4" />
                <div className="flex flex-col mb-1">
                    <h2 className="text-left text-xl font-bold">{shortTitle}</h2>
                    <p className="text-left text-sm">{shortSubtitle}</p>
                </div>
                { starRating ? <CustomRating spotifyId={spotifyId} type={type} starRating={starRating} /> : <></> }
            </div>
        );
    }
};

export default BoxTwoLine;
