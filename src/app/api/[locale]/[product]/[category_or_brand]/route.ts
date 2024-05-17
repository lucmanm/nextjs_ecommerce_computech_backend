import { prisma } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string, category_or_brand: string } }) {

    const { locale, category_or_brand } = params
    const searchParams = request.nextUrl.searchParams
    const querySkip = searchParams.get("skip")


    try {
        // CONTINUE:  check all language error handling
        const checklanguage = await prisma.language.findUnique({
            where: { languageCode: locale }
        })
        if (!checklanguage) {
            console.log("LANGUAGE_ERROR_UNAVAILABLE", error);
        }
        
        const result = await prisma.product.findMany({
            where: {
                AND: [
                    {
                        categoryName: {
                            contains: category_or_brand,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            skip: 0 | Number(querySkip),
            take: 5,
            orderBy:{
                updatedAt: "asc"
            }
        })
        return NextResponse.json({ result }, { status: 200 })

    } catch (error) {
        console.log("ERROR_CATEGORY_OR_BRAND", error);

    }
}

