import { CharacterType } from '@/type';
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CiStar } from 'react-icons/ci';

interface CharacterCardProps {
    character: CharacterType;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const { name, height, mass, gender, birth_year, url } = character;
    const router = useRouter();

    // Extracting the unique number from the URL
    const characterId = url.split('/').filter(Boolean).pop(); // Extract the last segment after splitting by '/'

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='w-[300px]  relative hover:scale-105 bg-slate-800 p-4 rounded-lg'
        >
            <div className='absolute top-3 right-3 cursor-pointer'>
                <CiStar size={24} />
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
