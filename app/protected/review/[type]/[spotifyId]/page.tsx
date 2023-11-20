import { auth } from '@/auth';
import BoxHoriz from '@/components/box_horiz';
import Navbar from '@/components/nav';
import prisma, { getFromCache } from '@/db';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export default async function Review({ params, searchParams }: { params: { spotifyId: string, type: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  console.log(params);

  async function create(formData: FormData) {
    'use server'

    const tuneifyId = await prisma.user.findUnique({
      where: {
        userSpotifyId: await auth().then(session => session?.user?.id)
      }
    }).then(user => user?.tuneifyId);

    if (tuneifyId && formData.get('title') && formData.get('review')) {
      const found = await prisma.review.findFirst({
        where: {
          tuneifyId: tuneifyId,
          spotifyId: params.spotifyId,
        }
      })

      if (found) {
        console.log(await prisma.review.update({
          where: {
            id: found.id
          },
          data: {
            tuneifyId: tuneifyId,
            spotifyId: params.spotifyId,
            title: formData.get('title').toString(),
            stars: Number(searchParams.rating),
            content: formData.get('review').toString(),
          },
        }))
      } else {
        await prisma.review.create({
          data: {
            tuneifyId: tuneifyId,
            spotifyId: params.spotifyId,
            title: formData.get('title').toString(),
            stars: Number(searchParams.rating),
            content: formData.get('review').toString(),
          }
        })
      }

      redirect('/protected/diary')
    }
  }


  const data = await getFromCache(params.spotifyId);

  if (data) {
    const review = await prisma.review.findFirst({
      where: {
        tuneifyId: await prisma.user.findUnique({
          where: {
            userSpotifyId: await auth().then(session => session?.user?.id)
          }
        }).then(user => user?.tuneifyId),
        spotifyId: data.spotifyId
      }
    })

    console.log(review)


    return (
      <main>
          <Navbar session={await auth()}></Navbar>
          <BoxHoriz spotifyId={data.spotifyId} type={data.type} title={data.name || ''} subtitle={data.type ? (data.type.charAt(0).toUpperCase() + data.type.substring(1)) : ''} imageUrl={data?.imageUrl || ''} className='justify-center -ml-8' starRating={Number(searchParams.rating) || 0} />
          <form action={create} className="flex flex-col mx-32 gap-5">
            {/* <input type="hidden" value={searchParams.rating} /> */}
            <label htmlFor="title" className="text-3xl">Title</label>
            <textarea name="title" rows={1} className="block p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..." defaultValue={review?.title}></textarea>
            <label htmlFor="review" className="text-3xl">Review</label>
            <textarea name="review" rows={8} className="block mb-8 p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..." defaultValue={review?.content || ''}></textarea>
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