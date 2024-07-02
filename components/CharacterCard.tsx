'use client';

import { CharacterType } from '@/type';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

interface CharacterCardProps {
    character: CharacterType;
}

/**
 * Renders a card component for a specific character.
 *
 * @param {CharacterCardProps} props - The props object containing the character data.
 * @returns {JSX.Element} The rendered character card component.
 */
const CharacterCard: FC<CharacterCardProps> = ({ character }: CharacterCardProps): JSX.Element => {
    const { name, height, mass, gender, birth_year, url } = character;
    const router = useRouter();

    // Extracting the unique number from the URL
    const characterId: string = url.split('/').filter(Boolean).pop()!; // Extract the last segment after splitting by '/'
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(characterId));
    }, [characterId]);

    const toggleFavorite = (): void => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites: string[] = isFavorite
            ? favorites.filter((id: string) => id !== characterId)
            : [...favorites, characterId];

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='sm:w-[300px] w-full relative ease-in-out shadow-md bg-slate-800  p-4 rounded-lg cursor-pointer'
        >
            <button onClick={toggleFavorite} className="cursor-pointer bg-transparent border-none p-0 m-0">
                {isFavorite ? <FaStar color="yellow" size={24} /> : <CiStar color="gray" size={24} />}
            </button>

            <Card maxW='sm' borderRadius='lg' overflow='hidden'>
                <CardBody>
                    <Stack spacing='2'>
                        <Heading textAlign='center' size='md' fontWeight='bold'>
                            {name}
                        </Heading>
                        <Text fontWeight='light' fontSize='sm'>
                            Height: {height} cm
                        </Text>
                        <Text fontWeight='light' fontSize='sm'>
                            Birth Year: {birth_year}
                        </Text>
                        <Text fontWeight='light' fontSize='sm'>
                            Gender: {gender}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup onClick={() => router.push(`/character/${characterId}`)} mt='2' width='full' className='w-full'>
                        <Button variant='solid' colorScheme='blue' className='bg-gray-900 px-2 py-2 w-full rounded-md'>
                            <Text fontSize='sm' fontWeight='light'>
                                More Details
                            </Text>
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default CharacterCard;
