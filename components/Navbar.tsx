'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const links = [
        { id: 1, link: '/', name: 'Home' },
        { id: 2, link: '/dashboard', name: 'Dashboard' },
        { id: 3, link: '/blogs', name: 'Blog' },
        { id: 4, link: '/content', name: 'Contact' },
    ];

    return (
        <nav className="bg-gray-800 text-white fixed w-full z-50">
            <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
                <h1 className="text-2xl font-bold">My Blog</h1>
                <div className="hidden md:flex space-x-4">
                    {links.map(({ id, link, name }) => (
                        <Link key={id} href={link} className="hover:text-gray-400 transition duration-200">
                            {name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        {/* Display UserButton on the right side of the navbar */}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="rounded border border-gray-400 px-3 py-0.5 hover:bg-gray-700 transition duration-200">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <div className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
                        {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </div>
                </div>
            </div>
            {navOpen && (
                <div className="md:hidden bg-gray-700">
                    <ul className="flex flex-col items-center">
                        {links.map(({ id, link, name }) => (
                            <li key={id} className="py-2">
                                <Link href={link} onClick={() => setNavOpen(false)} className="hover:text-gray-400 transition duration-200">
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;