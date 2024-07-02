'use client';

import { CharacterType } from '@/type';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const CharacterDetailPage: FC = () => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const { characterId } = useParams<{ characterId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchCharacter = async (): Promise<void> => {
      try {
        const response = await axios.get<CharacterType>(`https://swapi.dev/api/people/${characterId}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [characterId]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(characterId));
  }, [characterId]);

  const toggleFavorite = (): void => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = isFavorite
      ? favorites.filter((id: string) => id !== characterId)
      : [...favorites, characterId];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const renderCharacterDetails = (): JSX.Element => {
    if (!character) {
      return <p className="text-center">Character not found.</p>;
    }

    const {
      name,
      height,
      mass,
      gender,
      birth_year,
      hair_color,
      skin_color,
      eye_color,
    } = character;

    return (
      <div className="flex flex-col items-start justify-center px-4 md:px-10 gap-6">
        <div className="relative w-full flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-white bg-gray-800">
          <div onClick={toggleFavorite} className="absolute top-3 right-3 cursor-pointer">
            {isFavorite ? (
              <FaStar color="yellow" size={24} />
            ) : (
              <CiStar color="gray" size={24} />
            )}
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">{name}</h1>
          <div className="w-full flex flex-col md:flex-row md:justify-around gap-6">
            <div>
              <h2 className="text-lg font-semibold text-center">General Information</h2>
              <ul className="list-disc ml-6 mt-2">
                <li>Height: {height} cm</li>
                <li>Mass: {mass} kg</li>
                <li>Gender: {gender}</li>
                <li>Birth Year: {birth_year}</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-center">Appearance</h2>
              <ul className="list-disc ml-6 mt-2">
                <li>Hair Color: {hair_color}</li>
                <li>Skin Color: {skin_color}</li>
                <li>Eye Color: {eye_color}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-md bg-gray-800 text-white">
          <h1 className="text-3xl font-bold text-center mb-4">Description</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, laudantium? Minima voluptas optio, in
            dolorem quaerat fuga velit. Facilis nihil maiores quidem sunt, tempora a, mollitia ad vel id debitis
            placeat vitae iste doloribus praesentium laudantium quas accusantium rem. Minima odit quae porro
            molestiae rerum voluptas soluta odio optio eveniet fugiat recusandae quos?
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-[120px] bg-gray-900">
      {character ? renderCharacterDetails() : <div className="h-[50vh] flex items-center justify-center"><p>Loading...</p></div>}
    </div>
  );
};

export default CharacterDetailPage;

