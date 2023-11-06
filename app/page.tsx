import SpotifyLogin from '../components/login';
import Navbar from '@/components/nav';

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      {/* <Nav2></Nav2> */}
      <SpotifyLogin />
    </main>
  )
}
