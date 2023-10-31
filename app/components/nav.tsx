import React from 'react';

interface NavbarProps {
    links: { name: string; url: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
    return (
        <nav className="bg-gray-800">
            <ul className="flex justify-between items-center py-4 px-6">
                {/* <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Tuneify
                    </a>
                </li> */}
                <ul className="flex justify-between items-center space-x-4">
                    {links.map((link) => (
                        <li key={link.url}>
                            <a
                                href={link.url}
                                className="text-gray-300 hover:text-white"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </ul>
        </nav>
    );
};

export default Navbar;
