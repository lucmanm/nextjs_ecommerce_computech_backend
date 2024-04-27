import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { locale: string } }) {

    const checklanguage = await prisma.language.findFirst({
        where: {
            code: params.locale
        }
    })

    const sliderData = await prisma.slider.findMany({
        where: {
            languageId: checklanguage?.id
        },
    })

    if (sliderData.length < 0) {
        return NextResponse.json(sliderData, { status: 200 })
    } else {
        const data = await prisma.slider.findMany()
        return NextResponse.json(data, { status: 200 })
    }
}

