import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import LoginNav from '@/components/sign_in_button';
import Logo from '@/components/logo';
import Searchbar from '@/components/search_bar';
import UnknownProfile from '/public/profile.svg';
import { auth } from '@/auth';
import { getCurrentProfPic, getCurrentTuneifyId } from '@/db';

const Navbar: React.FC = async () => {
    const session = await auth();

    return (
        <nav className="mb-6">
            <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-center h-16 gap-5">
                    <Logo logoSize={40} fontSize={3} className="mr-auto" />
                    <Searchbar />
                    <div className="flex">
                        <Link href="/protected/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Profile
                        </Link>
                        <Link href="/protected/diary" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Diary Grid
                        </Link>
                        <Link href={"/protected/user/" + await getCurrentTuneifyId()} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Diary List
                        </Link>
                    </div>
                    <div className="flex flex-row ml-auto">
                        <Image src={await getCurrentProfPic() || UnknownProfile} alt="User's profile picture" className="h-10 w-10 rounded-full mr-2" width={40} height={40} />
                        <LoginNav session={session}></LoginNav>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
