'use client'

import Navbar from '@/components/nav';
import BoxHoriz from '@/components/box_horiz';
import UserReview from '@/components/user_review';
import { useSearchParams } from 'next/navigation'

export default function Entry() {
  const reviewId = useSearchParams().get('reviewId') // to be used to fetch review info from database

  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="flex justify-center flex-col mx-36 mt-10">
        <BoxHoriz title="Album Name" subtitle="Artist" imageUrl="" review={"Review ..."} date="00/00/0000" starRating={4}/>
        <UserReview userName="User Name" imageUrl="" review={"Review ..."} reviewDate="00/00/0000" starRating={4.5}/> 
      </div>

    </main>
  )
}
