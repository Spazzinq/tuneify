import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { auth } from '@/auth';
import Login from './nav_login';
import Logo from '@/components/logo';

interface NavbarProps {
    profileImageUrl: string;
}

const Navbar: React.FC<NavbarProps> = async ({ profileImageUrl }) => {
    return (
        <nav className="bg-gray-800 mb-6">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <Logo logoSize={40} fontSize={3} />
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <Link href="/protected/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Profile
                            </Link>
                            <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Journal
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <Login session={await auth()}></Login>
                        <Image src={profileImageUrl} alt="Profile Picture" className="h-10 w-10 rounded-full" width={40} height={40} />
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-4">
                            + Log
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
