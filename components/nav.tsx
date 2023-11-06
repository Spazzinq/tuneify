import React from 'react';
import Image from 'next/image'

interface NavbarProps {
    profileImageUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ profileImageUrl }) => {
    return (
        <nav className="bg-gray-800 mb-6">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex">
                        <Image src={profileImageUrl} alt="Tuneify Logo" width={40} height={40} />
                        <a href="" className="text-white text-2xl font-bold ml-2 mt-1">Tuneify</a>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <a href="/protected/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Profile
                            </a>
                            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Journal
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row">
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
