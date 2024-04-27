import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string, products_by_category: string } }) {

    const {locale, products_by_category} = params
    
    const checklanguage = await prisma.language.findFirst({
        where: {
            code: locale
        }
    })

    if (!checklanguage) return

    const data = await prisma.product.findMany({
        where: {
            category: {
                name: products_by_category
            },

        },
        include: {
            category: true
        }
    })

    return NextResponse.json(data, { status: 200 })
}

