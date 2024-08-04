'use server'

// import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ProgramData } from '@/app/types/programData';
import prisma from "@/lib/prismaClient"
// import { NextResponse } from "next/server";
import { z } from 'zod';
import { searchFormSchema } from '@/app/action/formSchema';
import { Key } from 'react';

// interface Keyword {
//     keyword: string
//     places: string[]
//     categories: string[]
// }

// export const searchProgram = async ({ keyword, places, categories }: Keyword) => {

//     if ((keyword.length === 0 && places.length === 0) && categories.length === 0) {
//         const data: ProgramData[] = await prisma.program.findMany();
//         console.log('all')
//         console.log(data)
//         return data;
//     } else if (keyword.length === 0 && places.length === 0) {
//         const data: ProgramData[] = await searchCategories({ keyword, places, categories })
//         return data;
//     } else if (keyword.length === 0 && categories.length === 0) {
//         const data: ProgramData[] = await searchPlaces({ keyword, places, categories })
//         return data;
//     } else if ( places.length === 0 && categories.length === 0) {
//         const data: ProgramData[] = await searchKeyword({ keyword, places, categories })
//         return data;
//     } else if (keyword.length === 0) {
//         const data: ProgramData[] = await searchPlacesCategories({ keyword, places, categories })
//         return data;
//     } else if (places.length === 0) {
//         const data: ProgramData[] = await searchKeywordCategories({ keyword, places, categories })
//         return data;
//     } else if (categories.length === 0) {
//         const data: ProgramData[] = await searchKeywordPlaces({ keyword, places, categories })
//         return data;
//     } else {
//         const data: ProgramData[] = await searchAll({ keyword, places, categories })
//         return data;
//     }

// }

// const searchKeyword = async ({ keyword }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             OR: [
//                 { title: { contains: keyword } },
//                 { descript: { contains: keyword } }
//             ]
//         }
//     });
//     return data
// }

// const searchPlaces = async ({ places }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             place: { in: places }
//         }
//     })
//     return data
// }

// const searchCategories = async ({ categories }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             category: { in: categories }
//         }
//     })
//     return data
// }

// const searchPlacesCategories = async ({ places, categories }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             AND: [
//                 { place: { in: places } },
//                 { category: { in: categories } }
//             ]
//         }
//     })
//     return data
// }

// const searchKeywordCategories = async ({ keyword, categories }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             AND: [
//                 { OR: [
//                     { title: { contains: keyword } },
//                     { descript: { contains: keyword } }
//                 ]},
//                 { category: { in: categories } }
//             ]
//         }
//     })
//     return data
// }

// const searchKeywordPlaces = async ({ keyword, places }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             AND: [
//                 { OR: [
//                     { title: { contains: keyword } },
//                     { descript: { contains: keyword } }
//                 ]},
//                 { place: { in: places } }
//             ]
//         }
//     })
//     return data
// }

// const searchAll = async ({ keyword, places, categories }: Keyword) => {
//     const data: ProgramData[] = await prisma.program.findMany({
//         where: {
//             AND: [
//                 {
//                     OR: [
//                         { title: { contains: keyword } },
//                         { descript: { contains: keyword } }
//                     ]
//                 },
//                 { place: { in: places } },
//                 { category: { in: categories } }
//             ]
//         }
//     });
//     return data
// }

import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import { searchProgram } from '@/app/action/searchProgram';


// const prisma = new PrismaClient();

interface Keyword {
    keyword: string;
    places: string[];
    categories: string[];
}

export async function GET(req: NextRequest) {
    console.log(req)
    const { searchParams } = new URL(req.url);
    console.log(searchParams)
    const keyword = searchParams.get('keyword') || '';
    const places = searchParams.getAll('places') || [];
    const categories = searchParams.getAll('categories') || [];

    console.log(keyword)
    console.log(places)
    console.log(categories)

    const data = await searchProgram({ keyword, places, categories });
    return NextResponse.json(data);
}

