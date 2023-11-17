'use client'

import React from 'react';
import Image from 'next/image';
import { Russo_One } from 'next/font/google';
import Link from 'next/dist/client/link';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

interface LogoProps {
    logoSize: number;
    fontSize: number;
}

const Logo: React.FC<LogoProps> = ({ logoSize, fontSize }) => {
    return (
        <div className="flex">
            <Image src="/icon.svg" alt="Tuneify Logo" width={logoSize} height={logoSize} />
            <Link href="/" className={russo.className + " text-white text-" + fontSize + "xl font-bold ml-2 my-auto"}>TUNEIFY</Link>
        </div>
    );
};
export default Logo;
