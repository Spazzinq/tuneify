'use client'

import { signIn, signOut } from 'next-auth/react';
import React from 'react';

interface LoginProps {
    session : any;
}

const Login: React.FC<LoginProps> = ({ session }) => {
    return (
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                    onClick={() => { session && session.user ? signOut() : signIn('spotify', { callbackUrl: 'http://localhost:3000/protected/profile' }) }}>
                                    {session && session.user ? "Sign Out" : "Sign In"}
                                </button>
    );
};
export default Login;
