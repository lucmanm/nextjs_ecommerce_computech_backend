import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { locale: string } }) {

    const checklanguage = await prisma.language.findFirst({
        where: {
            code: params.locale
        }
    })

    const sliderData = await prisma.slider.findMany({
        where: {
            languageId: checklanguage?.id
        }
    })

    return NextResponse.json(sliderData, { status: 200 })
}

