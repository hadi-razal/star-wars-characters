'use client'

import { CharacterType } from '@/type'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { CiStar } from 'react-icons/ci'

const CharacterDetailPage = () => {
    const [character, setCharacter] = useState<CharacterType | null>(null)
    const { characterId } = useParams()

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${characterId}`)
                setCharacter(response.data)
            } catch (error) {
                console.error('Error fetching character:', error)
            }
        }

        fetchCharacter()
    }, [characterId])

    const renderCharacterDetails = () => {
        if (!character) {
            return <p className="text-center">Character not found.</p>
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
        } = character

        return (
            <div className='flex flex-col gap-4 items-center justify-center md:px-10 px-4'>
                <div className="relative w-full flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-800 ">

                    <div className='absolute top-3 right-3 cursor-pointer'>
                        <CiStar size={24} />
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-4">{name}</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <h2 className="text-lg font-semibold">General Information</h2>
                            <ul className="list-disc ml-6">
                                <li>Height: {height} cm</li>
                                <li>Mass: {mass} kg</li>
                                <li>Gender: {gender}</li>
                                <li>Birth Year: {birth_year}</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Appearance</h2>
                            <ul className="list-disc ml-6">
                                <li>Hair Color : {hair_color}</li>
                                <li>Skin Color : {skin_color}</li>
                                <li>Eye Color : {eye_color}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 ">
                    <h1 className="text-3xl font-bold text-center mb-4">Description</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum minima veniam cum id hic repellat minus nulla, odit, reprehenderit neque illo quibusdam consequatur sed ullam qui quam doloribus sit delectus maiores corrupti? Ut praesentium rerum ex ipsum perferendis tempore laudantium fugit. Libero Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, laudantium? Minima voluptas optio, in dolorem quaerat fuga velit. Facilis nihil maiores quidem sunt, tempora a, mollitia ad vel id debitis placeat vitae iste doloribus praesentium laudantium quas accusantium rem. Minima odit quae porro molestiae rerum.voluptas soluta odio optio eveniet fugiat recusandae quos?</p>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-[120px]">
            {character ? renderCharacterDetails() : <div className="h-[50vh] flex items-center justify-center"><p>Loading...</p></div>}
        </div>
    )
}

export default CharacterDetailPage

