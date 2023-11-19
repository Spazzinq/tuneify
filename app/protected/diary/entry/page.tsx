'use client'

import Navbar from '@/components/nav';
import TrackRating from '@/components/trackRating'; 
import BoxHoriz from '@/components/box_horiz';
import { useSearchParams } from 'next/navigation'
import { auth } from '@/auth';

export default async function Entry() {
  const reviewId = useSearchParams().get('reviewId') // to be used to fetch review info from database

  return (
    <main>
      <Navbar session={await auth()}></Navbar>
      <div className="flex justify-center flex-col mx-36 mt-10">
        <BoxHoriz title="Album Name" subtitle="Artist" imageUrl="" review={"Review ..."} date="00/00/0000" starRating={4}/>
        <TrackRating num={1} trackName={"trackName"} albumName={"albumName"} starRating={5} review={"Some review..."} />     
      </div>

    </main>
  )
}
