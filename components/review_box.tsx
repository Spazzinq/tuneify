import React from 'react';

interface ReviewBoxProps {
}

const ReviewBox: React.FC<ReviewBoxProps> = ({}) => {

    return (
    <form className="mx-36">
        <label className="block mb-5 text-3xl">Your Review</label>
        <textarea id="message" rows={8} className="block mb-5 p-2.5 w-full rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Write your thoughts here..."></textarea>
        <button type="submit" className="inline-flex items-center px-5 py-2.5 text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-gray-900 hover:bg-gray-700">Publish</button>
    </form>
    );
};

export default ReviewBox;
