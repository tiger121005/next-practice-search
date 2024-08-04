import prisma from "@/lib/prismaClient";

interface Keyword {
    keyword: string
    places: string[]
    categories: string[]
}

export const searchProgram = async ({ keyword, places, categories }: Keyword) => {
    if ((keyword.length === 0 && places.length === 0) && categories.length === 0) {
        const data = await prisma.program.findMany();
        return data;
    } else if (keyword.length === 0 && places.length === 0) {
        return await searchCategories(categories);
    } else if (keyword.length === 0 && categories.length === 0) {
        return await searchPlaces(places);
    } else if (places.length === 0 && categories.length === 0) {
        return await searchKeyword(keyword);
    } else if (keyword.length === 0) {
        return await searchPlacesCategories(places, categories);
    } else if (places.length === 0) {
        return await searchKeywordCategories(keyword, categories);
    } else if (categories.length === 0) {
        return await searchKeywordPlaces(keyword, places);
    } else {
        return await searchAll(keyword, places, categories);
    }
}

const searchKeyword = async (keyword: string) => {
    return await prisma.program.findMany({
        where: {
            OR: [
                { title: { contains: keyword } },
                { descript: { contains: keyword } }
            ]
        }
    });
}

const searchPlaces = async (places: string[]) => {
    return await prisma.program.findMany({
        where: {
            place: { in: places }
        }
    });
}

const searchCategories = async (categories: string[]) => {
    return await prisma.program.findMany({
        where: {
            category: { in: categories }
        }
    });
}

const searchPlacesCategories = async (places: string[], categories: string[]) => {
    return await prisma.program.findMany({
        where: {
            AND: [
                { place: { in: places } },
                { category: { in: categories } }
            ]
        }
    });
}

const searchKeywordCategories = async (keyword: string, categories: string[]) => {
    return await prisma.program.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { title: { contains: keyword } },
                        { descript: { contains: keyword } }
                    ]
                },
                { category: { in: categories } }
            ]
        }
    });
}

const searchKeywordPlaces = async (keyword: string, places: string[]) => {
    return await prisma.program.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { title: { contains: keyword } },
                        { descript: { contains: keyword } }
                    ]
                },
                { place: { in: places } }
            ]
        }
    });
}

const searchAll = async (keyword: string, places: string[], categories: string[]) => {
    return await prisma.program.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { title: { contains: keyword } },
                        { descript: { contains: keyword } }
                    ]
                },
                { place: { in: places } },
                { category: { in: categories } }
            ]
        }
    });
}
