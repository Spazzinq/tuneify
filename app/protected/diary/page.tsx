import Navbar from '@/components/nav';
import { IconUnkown } from '@/components/icons';
import Rating from '@/components/rating';
import TrackRating from '@/components/trackRating'; 
import AlbumReview from '@/components/album_review';
import Album from '@/components/album';

export default function Diary() {
  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="flex justify-center flex-col mx-36 mt-10">
        <h1 className="text-5xl font-bold mb-4">Albums</h1>   
      </div>
      <div className="mx-20">
        <Album name={"AlbumName"} imageUrl={""} starRating={4}></Album>
      </div>

    </main>
  )
}