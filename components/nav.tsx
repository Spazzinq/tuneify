import React, { Suspense } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import LoginNav from './nav_login';
import Logo from '@/components/logo';
import { IconUnkown } from './icons';
import Searchbar from './search';
import { Session } from 'next-auth';

interface NavbarProps {
    session: Session | null
}

const Navbar: React.FC<NavbarProps> = async ({ session }) => {
    return (
        <nav className="bg-gray-800 mb-6">
            <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-center h-16 gap-5">
                    <Logo logoSize={40} fontSize={3} className="mr-auto" />
                    <Searchbar />
                    <div className="flex">
                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                        <Link href="/protected/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Profile
                        </Link>
                        <Link href="/protected/diary" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Diary
                        </Link>
                    </div>
                    <div className="flex flex-row ml-auto">
                        <Image src={session?.user?.image || ''} alt="Profile Picture" placeholder='blur' blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' className="h-10 w-10 rounded-full mr-2" width={40} height={40} />
                        <LoginNav session={session}></LoginNav>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold px-4 rounded">
                            + Review
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
