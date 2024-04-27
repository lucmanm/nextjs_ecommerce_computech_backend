import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { locale: string}}) {
    
    const checklanguage = await prisma.language.findFirst({
        where: {
            code: params.locale
        }
    })

    if (!checklanguage) return

    const data = await prisma.category.findMany({
        where: {
            languageId: checklanguage?.id
        }
    })

    return NextResponse.json(data, { status: 200 })
}

