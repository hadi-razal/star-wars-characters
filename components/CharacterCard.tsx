'use client'

import { CharacterType } from '@/type';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';

interface CharacterCardProps {
    character: CharacterType;
}

/**
 * Component for displaying character card.
 * @param character - The character object.
 * @returns JSX.Element
 */
const CharacterCard: FC<CharacterCardProps> = ({ character }: CharacterCardProps): JSX.Element => {
    const { name, height, mass, gender, birth_year, url } = character;
    const router = useRouter();

    // Extracting the unique number from the URL
    const characterId: string = url.split('/').filter(Boolean).pop()!; // Extract the last segment after splitting by '/'

    // State to manage favorite status
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    // Check initial favorite status on component mount
    useEffect(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(characterId));
    }, [characterId]);

    /**
     * Function to add to favorites.
     */
    const addToFavorite = (): void => {
        let favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(characterId)) {
            favorites.push(characterId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true); // Update local state to reflect favorite status
        }
    };

    /**
     * Function to remove from favorites.
     */
    const removeFromFavorites = (): void => {
        let favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const index = favorites.indexOf(characterId);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(false); // Update local state to reflect favorite status
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-[300px] relative hover:scale-105 transition-transform duration-300 ease-in-out bg-slate-800 p-4 rounded-lg cursor-pointer'
        >
            <div onClick={isFavorite ? removeFromFavorites : addToFavorite} className='absolute top-3 right-3 cursor-pointer'>
                <CiStar color={isFavorite ? 'yellow' : 'gray'} size={24} />
            </div>

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
