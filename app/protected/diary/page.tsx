import Navbar from '@/components/nav';
import Album from '@/components/album';
import Link from 'next/link';

export default function Diary() {
  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div>
        <div className="my-8 mx-10">
          <h1 className="text-5xl font-bold mb-4">Albums</h1>  
          <hr></hr> 
        </div>
        <div className="mx-20">
          <Link href="/protected/diary/entry">
            <Album name={"AlbumName"} imageUrl={""} starRating={4}></Album>
          </Link>
        </div>
      </div>
    </main>
  )
}