'use server'

import { NextRequest, NextResponse } from 'next/server';
import { searchProgram } from '@/app/action/searchProgram';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';
    const places = searchParams.getAll('places') || [];
    const categories = searchParams.getAll('categories') || [];

    const data = await searchProgram({ keyword, places, categories });
    return NextResponse.json(data);
}