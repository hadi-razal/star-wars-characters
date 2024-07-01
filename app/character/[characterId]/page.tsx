'use client'

import { CharacterType } from '@/type';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CharacterDetailPage = () => {
    const [character, setCharacter] = useState<CharacterType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { characterId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        const fetchCharacter = async () => {
            try {
                const { data } = await axios.get(`https://swapi.dev/api/people/${characterId}`);
                setCharacter(data);
            } catch (error) {
                console.error('Error fetching character:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, [characterId]);

    return (
        <div className='mt-[120px]'>
            {isLoading ? (
                <p>Loading...</p>
            ) : character ? (
                <div>
                    <h1 className='text-red-800'>{character.name}</h1>
                    <ul>
                        <li>Height: {character.height}</li>
                        <li>Mass: {character.mass}</li>
                        <li>Gender: {character.gender}</li>
                    </ul>
                </div>
            ) : (
                <p>Character not found.</p>
            )}
        </div>
    );
};

export default CharacterDetailPage;

