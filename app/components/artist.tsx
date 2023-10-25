import React from 'react';

interface ArtistProps {
    name: string;
    imageUrl: string;
}

const Artist: React.FC<ArtistProps> = ({ name, imageUrl }) => {
    return (
        <div style={{border: '2px solid black', padding: '10px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', maxWidth: '400px'}}>
            <img src={imageUrl} alt={name} style={{width: '100px', height: '100px', borderRadius: '50%'}} />
            <h2 style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{name}</h2>
        </div>
    );
};

export default Artist;
