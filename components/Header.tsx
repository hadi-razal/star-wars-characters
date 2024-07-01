"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const Header = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const router = useRouter()

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Perform search action
            alert(`Searching for: ${searchTerm}`);
            // Replace the above line with your search logic
        }
    };

    return (
        <motion.header
            initial={{ y: '-100%' }} // Start off-screen above viewport
            animate={{ y: 0 }} // Slide down to viewport
            transition={{ duration: 0.5 }} // Animate over 0.5 seconds
            className="flex fixed top-0 z-50 items-center justify-between w-full bg-gray-900 border-b-[0.1px] border-gray-800 py-4 px-8 text-white h-[100px]"
        >
            {/* Star Wars Logo */}
            <div onClick={() => router.push('/')} className="flex items-center justify-center cursor-pointer">
                <Image
                    alt="Star Wars Logo"
                    src="/logo.png"
                    width={100}
                    height={100}
                />
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-center w-1/2">
                <input
                    type="text"
                    placeholder="Search Star Wars..."
                    className="w-full p-2 rounded-l-md bg-gray-800 text-white focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <div className='py-2 px-2 bg-gray-800 border-l-[0.1px] border-gray-700 rounded-r-md cursor-pointer'>
                    <CiSearch size={24} />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;