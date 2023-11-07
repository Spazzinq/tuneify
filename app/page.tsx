import SpotifyLogin from '../components/login';
import Navbar from '@/components/nav';
import ArtistLarge from '@/components/artist_large';

export default function Home() {
  return (
    <main>
      <Navbar profileImageUrl={''}></Navbar>
      <div className="mt-20">
        <h1 className="text-6xl text-center font-bold mb-6">Tuneify</h1>
        <h2 className="text-2xl text-center mb-8">Making music accessible. | Join us for a lifetime of discovery.</h2>
        <div className="w-30 flex justify-center mb-32">
          <SpotifyLogin />
        </div>
        <div className="container ml-10">
          <h2 className="text-5xl font-bold mb-4">{('Most Reviewed')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <ArtistLarge name="Taylor Swift" imageUrl="" ranking={1} starRating={4} />
            <ArtistLarge name="Conan Gray" imageUrl="" ranking={2} starRating={4.5} />
            <ArtistLarge name="Bazzi" imageUrl="" ranking={3} starRating={3} />
          </div>
        </div>
      </div>
    </main>
  )
}
