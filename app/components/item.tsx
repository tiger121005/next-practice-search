import { ProgramData } from '../types/programData';
import React from 'react'

interface ProgramDataProps {
    programData: ProgramData;
}

const Item = ({ programData }: ProgramDataProps) => {
    const { title, descript, team, place, category } = programData
    return (
        <div className='bg-white text-black'>
            <h1 className='text-3xl font-bold px-4 pt-4'>{title}</h1>
            <h2 className='text-xl px-4'>{team}</h2>
            <p className='text-sm px-4 py-5'>{descript}</p>

            <div className='flex justify-between px-4 py-4'>
                <h3>{place}</h3>
                <h3>{category}</h3>
            </div>
        </div>
    )
}

export default Item
