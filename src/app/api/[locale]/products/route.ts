import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { locale: string } }) {
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
                contains: "pc",
                mode: "insensitive"
            }
        },
        skip: 0,
        take: 10,

    })

    return NextResponse.json({ products: productsData }, { status: 200 })
}

