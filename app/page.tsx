'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard';
import { motion } from 'framer-motion';
import { CharacterType } from '@/type';

/**
 * Home component displaying a list of characters from the Star Wars API.
 * 
 * @returns JSX.Element
 */
const Home: React.FC = (): JSX.Element => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false); // State for loading more characters

  useEffect(() => {
    const fetchCharacters = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<{ results: CharacterType[] }>(`https://swapi.dev/api/people/?page=${pageNumber}`);
        // Avoid duplicate entries of the first character
        if (pageNumber === 1) {
          setCharacters([...data.results]);
        } else {
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [pageNumber]);

  const loadMoreCharacters = async (): Promise<void> => {
    setIsLoadingMore(true);
    try {
      const nextPageNumber = pageNumber + 1;
      const { data } = await axios.get<{ results: CharacterType[] }>(`https://swapi.dev/api/people/?page=${nextPageNumber}`);
      setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      setPageNumber(nextPageNumber);
    } catch (error) {
      console.error('Error fetching more characters:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className='flex flex-col gap-3 items-center justify-center mt-[120px] mb-10'>
      {isLoading && characters.length === 0 ? (
        <div className='h-[50vh] flex items-center justify-center'>
          <p>Loading...</p>
        </div>
      ) : (
        <>
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
              <CharacterCard key={index} character={character} />
            ))}
          </div>
          <button
            onClick={loadMoreCharacters}
            disabled={isLoadingMore} // Disable button while loading more characters
            className={`mt-3 px-4 py-2 rounded-md bg-blue-500 text-white ${isLoadingMore ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

