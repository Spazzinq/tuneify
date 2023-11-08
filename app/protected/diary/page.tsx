import SpotifyLogin from '@/components/login';
import Navbar from '@/components/nav';
import ArtistLarge from '@/components/artist_large';
import Artist from '@/components/artist';
import TrackLarge from '@/components/track_large';
import { IconUnkown } from '@/components/icons';
import Image from 'next/image';
import Rating from '@/components/rating';
import TrackRating from '@/components/trackRating'; 


export default function Diary() {
  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="flex">
        <Image src={""} alt={""} width='200' height='200' className="rounded-lg mb-4 mr-8" />
        <div> 
            <h1 className="text-3xl font-bold">Album Name</h1>
            <h2>Artist</h2>
            <h3>Date of Review</h3>
            <p> It's good! </p>
        </div>
        <div>
            <Rating starRating={4}></Rating> 
        </div>
      </div>
      <TrackRating num={1} trackName={"trackName"} albumName={"albumName"} starRating={5} review={"Some review..."} />     


    </main>
  )
}
