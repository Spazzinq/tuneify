import React from 'react';
import Image from 'next/image'
import { IconUnkown } from './icons';

interface TrackProps {
    trackName: string;
    imageUrl: string;
    albumName: string;
}

const Track: React.FC<TrackProps> = ({ trackName, imageUrl, albumName }) => {
    return (
            <div style={{border: '2px solid black', padding: '10px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 20fr', alignItems: 'center', maxWidth: '100%'}}>
                {imageUrl == '' ? <IconUnkown width='50' height='50' className="rounded-full"></IconUnkown>
                :<Image src={imageUrl} alt={trackName} width='50' height='50' style={{borderRadius: '50%'}} />
                }
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                    <h2 style={{textAlign: 'left', fontSize: '1rem', margin: '0'}}>{trackName}</h2>
                    <p style={{textAlign: 'left', fontSize: '0.8rem', margin: '0'}}>{albumName}</p>
                </div>
            </div>
        );
};



//     imageUrl == '' ? <IconUnkown className="rounded-lg aspect-square mb-3"></IconUnkown>
//     : <Image src={imageUrl} alt={name} width='200' height='200' className="rounded-lg aspect-square mb-3" />
// }
export default Track;
