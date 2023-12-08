import React, { ReactNode } from 'react';
import { Russo_One } from 'next/font/google';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

interface BoxGridProps {
    title: string;
    children: ReactNode;
}

const BoxGrid = (props: BoxGridProps) => {
    return (
        <>
            <h2 className={russo.className + " text-4xl font-bold mb-6"}>{props.title}</h2>
            {/* <Suspense fallback={<Skeleton animation="wave" variant="rounded" width={1200} height={240} className="bg-gray-800" />}> */}
                <div className={"flex gap-12 ml-6 mr-10 mb-12"}>
                    {props.children}
                </div>
            {/* </Suspense> */}
        </>
    );
};
export default BoxGrid;