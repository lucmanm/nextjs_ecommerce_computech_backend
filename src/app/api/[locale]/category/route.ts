import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { locale: string } }) {

    const checklanguage = await prisma.language.findFirst({
        where: {
            code: params.locale
        }
    })

    const data = await prisma.category.findMany({
        where: {
            languageId: checklanguage?.id
        }
    })

    return NextResponse.json(data, { status: 200 })
}

