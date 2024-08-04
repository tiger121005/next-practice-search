import prisma from "@/lib/prismaClient"
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const allProgramData = await prisma.program.findMany();
        return NextResponse.json(allProgramData);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
};