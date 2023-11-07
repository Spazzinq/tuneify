'use client'

import React from 'react';
import Image from 'next/image';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

interface LogoProps {
    logoSize: number;
    fontSize: number;
}

const Logo: React.FC<LogoProps> = ({ logoSize, fontSize }) => {
    return (
        <div className="flex">
            <Image src="/icon.svg" alt="Tuneify Logo" width={logoSize} height={logoSize} />
            <a href="" className={russo.className + " text-white text-" + fontSize + "xl font-bold ml-2 mt-1"}>TUNEIFY</a>
        </div>
    );
};
export default Logo;
