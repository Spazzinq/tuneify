'use client'

import { signIn, signOut } from 'next-auth/react';
import React from 'react';

interface LoginNavProps {
    session: any;
}

const LoginNav: React.FC<LoginNavProps> = ({ session }) => {
    return (
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold rounded px-4 mr-2"
            onClick={() => { session && session.user ? signOut() : signIn('spotify', { callbackUrl: '/protected/profile' }) }}>
            {session && session.user ? "Sign Out" : "Sign In"}
        </button>
    );
};
export default LoginNav;
