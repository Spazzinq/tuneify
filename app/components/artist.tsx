import React from 'react';
import Image from 'next/image'

interface ArtistProps {
    name: string;
    imageUrl: string;
}

const Artist: React.FC<ArtistProps> = ({ name, imageUrl }) => {
    return (
        <div style={{border: '2px solid black', padding: '10px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', maxWidth: '400px'}}>
            <Image src={imageUrl} alt={name} width='100' height='100' style={{borderRadius: '50%'}} />
            <h2 style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{name}</h2>
        </div>
    );
};

export default Artist;
