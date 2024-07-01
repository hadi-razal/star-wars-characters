'use client'

import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'

import { motion } from 'framer-motion';


const CharacterCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }} // Start off-screen above viewport
            animate={{ opacity: 100 }} // Slide down to viewport
            transition={{ duration: 0.5 }} // Animate over 0.5 seconds
            className='w-[300px] border rounded-sm py-2 px-3'>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                        src='https://picsum.photos/300/300'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>Gial Ackbar</Heading>
                        <Text>
                            A veteran commander, Ackbar led the defense of his homeworld, Mon Cala, during the Clone Wars and then masterminded the rebel attack on the second Death Star at the Battle of Endor.
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            $450
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2' className='w-full'>
                        <Button variant='solid' colorScheme='blue' className='bg-gray-900 text-white  hover:bg-gray-800 w-full px-5 py-3'>
                            <Text className='font-light'>More Details</Text>
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default CharacterCard