'use client'

import Navbar from '@/components/nav';
import TrackRating from '@/components/trackRating'; 
import AlbumReview from '@/components/album_review';
import { useSearchParams } from 'next/navigation'

export default function Entry() {
  const reviewId = useSearchParams().get('reviewId') // to be used to fetch review info from database

  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="flex justify-center flex-col mx-36 mt-10">
        <AlbumReview albumName="Album Name" artist="Artist" imageUrl="" review={"Review ..."} reviewDate="00/00/0000" starRating={4}/>
        <TrackRating num={1} trackName={"trackName"} albumName={"albumName"} starRating={5} review={"Some review..."} />     
      </div>

    </main>
  )
}
