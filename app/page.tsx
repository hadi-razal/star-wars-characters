"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard';
import { motion } from 'framer-motion';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data } = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

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
        {characters.map((character, index) => (
          <CharacterCard charId={index} key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
