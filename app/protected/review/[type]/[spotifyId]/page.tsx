import { auth } from '@/auth';
import BoxHoriz from '@/components/box_horiz';
import Navbar from '@/components/nav';
import { getFromCache } from '@/db';
import { Session } from 'next-auth';

export default async function Review({ params, searchParams }: { params: { spotifyId: string, type: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  console.log(params);

  const data = await getFromCache(params.spotifyId);

  if (data) {
    return (
      <main>
        <Navbar session={await auth()}></Navbar>
        <BoxHoriz spotifyId={data.spotifyId} type={data.type} title={data.name || ''} subtitle={data.type ? (data.type.charAt(0).toUpperCase() + data.type.substring(1)) : ''} imageUrl={data?.imageUrl || ''} className='justify-center -ml-8' starRating={Number(searchParams.rating) || 0} />
        <form action={create} className="flex flex-col mx-32 gap-5">
            <label htmlFor="title" className="text-3xl">Title</label>
            <textarea id="title" rows={1} className="block p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..."></textarea>
            <label htmlFor="review" className="text-3xl">Review</label>
            <textarea id="review" rows={8} className="block mb-8 p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..."></textarea>
            <button type="submit" className="px-5 py-2.5 text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-900 hover:bg-gray-700">Publish</button>
        </form>
        <footer className="mt-32 mb-10 text-center">Made with love by Team Tuneify.</footer>
      </main>
    );
  }
}

async function getJson(session: Session | null, params: { spotifyId: string, type: string }) {
  if (session) {
    return await fetch("https://api.spotify.com/v1/" + params.type + "/" + params.spotifyId, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    }).then(res => res.json());
  }
}

async function create(formData: FormData) {
  'use server'

  // mutate data
  console.log(formData);
  // revalidate cache
}
