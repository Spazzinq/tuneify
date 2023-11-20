'use client';

import { signIn } from 'next-auth/react';
import { FaSpotify } from 'react-icons/fa';

const SpotifyButton = () => (
    <button className="flex justify-center items-center gap-2 bg-green-500 fill-black px-3 py-2 rounded"
        onClick={() => signIn('spotify', { callbackUrl: '/protected/profile' })}>
        <FaSpotify size={20} />
        <span>Sign In with Spotify</span>
    </button>
);

export default SpotifyButton;