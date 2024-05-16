"use server"
import { prisma } from "@/lib/db"
import { Item } from "@radix-ui/react-dropdown-menu"
import { Vault } from "lucide-react"
import * as z from "zod"


// export type TCreateBulkProductProps = {
//     description_ar: string
//     description_en: string
//     group_name: string
//     khumra_warehouse: number
//     model: string
//     sb_showroom: number
//     sm_warehouse: number
//     total_stock: number
//     unit_price: number
// }

const bulkProductSchema = z.object({
    description_ar: z.string(),
    description_en: z.string(),
    group_name: z.string(),
    khumra_warehouse: z.number(),
    model: z.string(),
    sb_showroom: z.number(),
    sm_warehouse: z.number(),
    total_stock: z.number(),
    unit_price: z.number(),
})

export type TCreateBulkProductProps = z.infer<typeof bulkProductSchema>

export async function createBulkProduct(jsonData: TCreateBulkProductProps[]) {

    // select only the category name or group data
    const uniqueGroupName = Array.from(new Set(jsonData.map(item => item.group_name)))
    // console.log(uniqueGroupName);

    // get call category data
    const getAllCategory = await prisma.category.findMany();

    // map the data
    const existingCategories = getAllCategory.map(category => category.name)
    
    // get all the data that doesnt match from database
    const newCategoryNames = uniqueGroupName.filter(name => !existingCategories.includes(name))

    await prisma.category.createMany({
        data: newCategoryNames.map(data => ({
            name: data,
            languageCode: "en-us"
        }))

    })
    
}
