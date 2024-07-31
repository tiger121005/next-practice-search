'use client'

import React from 'react'
import { ProgramData } from '../types/programData';
import Item from './item';

interface ProgramAllDataProps {
    programAllData: ProgramData[];
}

const ItemList = ({ programAllData }: ProgramAllDataProps) => {
    return (
        <div className='grid lg:grid-cols-3 px-4 py-4 gap-4'>
            {programAllData.map((programData: ProgramData) => (
                <Item programData={programData} />
            ))}
        </div>
    )
}

export default ItemList
