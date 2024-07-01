import CharacterCard from '@/components/CharacterCard'
import React from 'react'

function Home() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center'>
      <h1 className='text-center font-bold text-[30px]'>All Characters</h1>
      <div className='flex flex-wrap items-center justify-center gap-3'>
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
      </div>
    </div>
  )
}

export default Home