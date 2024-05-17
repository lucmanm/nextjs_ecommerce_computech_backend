import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string, product: string } }) {
    const { product, locale } = params
    const productmodel = decodeURIComponent(product.replace(/\\s+/g, ""))

    try {
        
            const product = await prisma.product.findUnique({
                where: {
                    model: productmodel,
                }
            })

            if (product) {

                return NextResponse.json({ product }, { status: 200 })
            }
            else {
                return NextResponse.json({ "Error": "Page not Found" }, { status: 500 } )
            }
            
    } catch (error) {
        console.log("ERROR_API_GET_PRODUCT_AND_BRAND", error);
    }

}