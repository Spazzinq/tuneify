import React from 'react';

interface ArtistTextProps {
    name: string;
    ranking: number;
}

const ArtistText: React.FC<ArtistTextProps> = async ({ name, ranking }) => {
    return (
        <div className="flex">
            <h3 className="text-7xl font-bold">{ranking}</h3>
            <h3 className="text-left text-xl font-bold mb-1">{name}</h3>
        </div>
    );

};
export default ArtistText;
