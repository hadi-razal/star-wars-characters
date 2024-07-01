import { useState } from 'react';

export const useCharacters = () => {
    const [characters, setCharacters] = useState([]);

    return {
        characters,
        setCharacters
    };
};
