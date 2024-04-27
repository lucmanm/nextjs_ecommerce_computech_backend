import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { locale: string } }) {
    const checklanguage = await prisma.language.findFirst({
        where: {
            code: params.locale
        }
    })
    if (!checklanguage) return
    const productsData = await prisma.product.findMany()

    return NextResponse.json({ products: productsData }, { status: 200 })
}

