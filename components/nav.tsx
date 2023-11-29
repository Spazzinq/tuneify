import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import LoginNav from '@/components/sign_in_button';
import Logo from '@/components/logo';
import Searchbar from '@/components/search_bar';
import Profile from '/public/profile.svg';
import { auth } from '@/auth';

const Navbar: React.FC = async () => {
    const session = await auth();

    return (
        <nav className="bg-gray-800 mb-6">
            <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-center h-16 gap-5">
                    <Logo logoSize={40} fontSize={3} className="mr-auto" />
                    <Searchbar />
                    {/* <NewSearch /> */}
                    <div className="flex">
                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                        <Link href="/protected/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Profile
                        </Link>
                        <Link href="/protected/diary" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Diary List
                        </Link>
                        <Link href="/protected/diary2" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Diary Review
                        </Link>
                    </div>
                    <div className="flex flex-row ml-auto">
                        <Image src={session?.user?.image || Profile} alt="Profile Picture" placeholder='blur' blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' className="h-10 w-10 rounded-full mr-2" width={40} height={40} />
                        <LoginNav session={session}></LoginNav>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
