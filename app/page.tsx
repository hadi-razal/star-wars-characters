'use client';

import CharacterCard from '@/components/CharacterCard';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get('https://swapi.dev/api/people/?page=2');
        setCharacters(res.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className='flex flex-col gap-3 items-center justify-center mt-[120px] mb-10'>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='text-center font-extrabold text-5xl'
      >
        All Characters
      </motion.h1>
      <div className='flex flex-wrap items-center justify-center gap-3'>
        {characters.map((character: any, index: number) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;