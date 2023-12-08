import BoxHoriz from '@/components/box_horiz';
import prisma, { getFromCache, getReviewFromCurrent } from '@/db';
import { redirect } from 'next/navigation';

export default async function Review({ params, searchParams }: { params: { spotifyId: string, type: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  /**
   * Internally defined function to create a review
   * @param formData Data from the form
   */
  async function create(formData: FormData) {
    'use server'

    if (formData) {
      const title = formData.get('title')
      const content = formData.get('content')

      if (title && content) {
        const userItem = await getReviewFromCurrent(params.spotifyId)

        if (userItem) {
          if (userItem.review[0]) {
            await prisma.review.update({
              where: {
                id: userItem.review[0].id,
              },
              data: {
                tuneifyId: userItem.tuneifyId,
                spotifyId: params.spotifyId,
                title: title.toString(),
                stars: Number(searchParams.rating) || 0,
                content: content.toString(),
              },
            })
          } else {
            await prisma.review.create({
              data: {
                tuneifyId: userItem.tuneifyId,
                spotifyId: params.spotifyId,
                title: title.toString(),
                stars: Number(searchParams.rating) || 0,
                content: content.toString(),
              }
            })
          }
        }

        redirect('/protected/diary')
      }
    }
  }

  const data = await getFromCache(params.spotifyId);

  if (data) {
    const userItem = await getReviewFromCurrent(params.spotifyId)

    return (
      <main>
        <BoxHoriz spotifyId={data.spotifyId} type={data.type} title={data.name || ''} subtitle={data.type ? (data.type.charAt(0).toUpperCase() + data.type.substring(1)) : ''} imageUrl={data?.imageUrl || ''} className='justify-center -ml-8' starRating={Number(searchParams.rating) || 0} />
        <form action={create} className="flex flex-col mx-32 gap-5">
          <label htmlFor="title" className="text-3xl">Title</label>
          <textarea required name="title" rows={1} className="block p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..." defaultValue={userItem?.review[0]?.title}></textarea>
          <label htmlFor="content" className="text-3xl">Review</label>
          <textarea required name="content" rows={8} className="block mb-8 p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..." defaultValue={userItem?.review[0]?.content || ''}></textarea>
          <button type="submit" className="px-5 py-2.5 text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-900 hover:bg-gray-700">Publish</button>
        </form>
      </main>
    );
  }
}