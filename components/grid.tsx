import React, { Suspense } from 'react';
import { Russo_One } from 'next/font/google';

const russo = Russo_One({ subsets: ['latin'], weight: "400" })

interface BoxGridProps {
    title: string;
    limit: number;
    func: Function;
}

const BoxGrid: React.FC<BoxGridProps> = ({ title, limit }) => {
    return (
        <>
            <h2 className={russo.className + " text-4xl font-bold mb-6"}>{title}</h2>
            <div className={"grid grid-cols-" + limit + " gap-6 ml-2 mr-10 mb-12"}>
                {props.children}
            </div>
        </>
    );
};
export default BoxGrid;