import prisma from "@/lib/prismaClient"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const allPrograms = await prisma.program.findMany();
    return NextResponse.json(allPrograms);
}