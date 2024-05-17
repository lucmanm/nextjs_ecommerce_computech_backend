import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string, product: string } }) {
    const { product, locale } = params
    const productDescription = decodeURIComponent(product.replace(/\\s+/g, ""))
    try {
        const changeLanguage = await prisma.language.findFirst({
            where: {
                languageCode: locale
            }
        })
        if (!changeLanguage) {
            console.log("ERROR_API_GET_PRODUCT");
            return NextResponse.json({ "Error": "Bad Request" }, { status: 500 })
        }

        const result = await prisma.product.findFirst({
            where: {
                shortDescriptionEn: productDescription
            },
        })

        if (!result) {
            console.log("ERROR_API_GET_PRODUCT");
            return NextResponse.json({ "Error": "Bad Request" }, { status: 500 })
        }
        return NextResponse.json(result, { status: 200 })


    } catch (error) {
        console.log("ERROR_API_GET_PRODUCT", error);
    }
}
