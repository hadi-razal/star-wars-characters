'use client'

import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface CharacterCardProps {
    character: {
        id: number
        name: string
        height: string
        mass: string
        hairColor: string
        skinColor: string
        birthYear: string
        gender: string
        homeworld: string
        films: string[]
        species: string[]
        vehicles: string[]
        starships: string[]
        created: string
        edited: string
        url: string
    }
    charId: number
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, charId }) => {
    const { name, height, mass, hairColor, skinColor, birthYear, gender, homeworld, films } = character
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-[300px] hover:scale-105 bg-slate-800 p-4 rounded-lg'
        >
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
                            Birth Year: {birthYear}
                        </Text>
                        <Text fontWeight='light' fontSize='sm'>
                            Gender: {gender}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter >
                    <ButtonGroup onClick={() => router.push(`/character/${charId}`)} mt='2' width='full' className='w-full'>
                        <Button variant='solid' colorScheme='blue' className='bg-gray-900 px-2 py-2 w-full'>
                            <Text fontSize='sm' fontWeight='light'>
                                More Details
                            </Text>
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default CharacterCard

