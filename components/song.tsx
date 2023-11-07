import React from 'react';
import Image from 'next/image'
import Rating from './rating';

interface SongProps {
    num: number;
    name: string;
    starRating: number;
    review: string;
}

const Song: React.FC<SongProps> = ({ num, name, starRating, review }) => {
    return (
        <div className="flex"> 
            <h1>{num}. {name}</h1>
            <div className="flex flex-col ml-6">
                <Rating starRating={starRating} />
                <p>{review}</p>
            </div>
        </div>




        // <div style={{border: '2px solid black', padding: '10px', borderRadius: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', maxWidth: '400px'}}>
        //     <Image src={imageUrl} alt={name} width='100' height='100' style={{borderRadius: '50%'}} />
        //     <h2 style={{textAlign: 'center', fontSize: '2rem', fontWeight: 'bold'}}>{name}</h2>
        // </div>
    );
};

export default Song;
