import React from 'react';
import Image from 'next/image'

interface TrackProps {
    trackName: string;
    imageUrl: string;
    albumName: string;
}

const Track: React.FC<TrackProps> = ({ trackName, imageUrl, albumName }) => {
    return (
            <div style={{border: '2px solid black', padding: '10px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 20fr', alignItems: 'center', maxWidth: '100%'}}>
                <Image src={imageUrl} alt={trackName} style={{width: '50px', height: '50px', borderRadius: '50%'}} />
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                    <h2 style={{textAlign: 'left', fontSize: '1rem', margin: '0'}}>{trackName}</h2>
                    <p style={{textAlign: 'left', fontSize: '0.8rem', margin: '0'}}>{albumName}</p>
                </div>
            </div>
        );
};

export default Track;
