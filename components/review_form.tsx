'use client'

import React from 'react';

const ReviewForm = () => {
    return (
        <form action={create} className="flex flex-col mx-32 gap-5">
            <label htmlFor="title" className="text-3xl">Title</label>
            <textarea id="title" rows={1} className="block p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..."></textarea>
            <label htmlFor="review" className="text-3xl">Review</label>
            <textarea id="review" rows={8} className="block mb-8 p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..."></textarea>
            <button type="submit" className="px-5 py-2.5 text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-900 hover:bg-gray-700">Publish</button>
        </form>
    );
};
export default ReviewForm;

async function create(formData: FormData) {
    'use server'

    // mutate data
    console.log(formData);
    // revalidate cache
}