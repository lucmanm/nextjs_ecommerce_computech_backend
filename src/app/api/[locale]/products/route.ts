import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string } }) {

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")

    const checklanguage = await prisma.language.findFirst({
        where: {
            languageCode: params.locale
        }
    })

    if (!checklanguage) return

    // get product by category
    const productsData = await prisma.product.findMany({
        where: {
            groupName: {
                contains: category?.toString(),
                mode: "insensitive"
            }
        },
        skip: 0,
        take: 10,

    })

    return NextResponse.json({ products: productsData }, { status: 200 })
}

