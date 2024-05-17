import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string } }) {

    const checklanguage = await prisma.language.findFirst({
        where: {
            languageCode: params.locale
        }
    })

    const result = await prisma.brand.findMany()

    return NextResponse.json({result}, { status: 200 })
}

