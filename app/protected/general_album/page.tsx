'use client'

import Navbar from '@/components/nav';
import AlbumReview from '@/components/album_review';
import UserReview from '@/components/user_review';
import { useSearchParams } from 'next/navigation'

export default function Entry() {
  const reviewId = useSearchParams().get('reviewId') // to be used to fetch review info from database

  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="flex justify-center flex-col mx-36 mt-10">
        <AlbumReview albumName="Album Name" artist="Artist" imageUrl="" review={"Review ..."} reviewDate="00/00/0000" starRating={4}/>
        <UserReview userName="User Name" imageUrl="" review={"Review ..."} reviewDate="00/00/0000" starRating={4.5}/> 
      </div>

    </main>
  )
}
