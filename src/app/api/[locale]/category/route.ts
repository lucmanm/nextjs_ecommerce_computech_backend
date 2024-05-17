import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { locale: string}}) {
    
    const checklanguage = await prisma.language.findFirst({
        where: {
            languageCode: params.locale
        }
    })

    if (!checklanguage) return

    const data = await prisma.category.findMany({
        where: {
            languageCode: checklanguage?.languageCode
        }
    })

    return NextResponse.json(data, { status: 200 })
}

