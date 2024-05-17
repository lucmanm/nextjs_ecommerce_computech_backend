import { prisma } from "@/lib/db";

export async function getProdutCategory() {
    const productCategory = await prisma.category.findMany()
    return { productCategory }
}