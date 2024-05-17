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

// headers of the excel must be the same as belows schema
const productSchema = z.object({
    description_ar: z.string(),
    description_en: z.string(),
    group_name: z.string(),
    main_warehouse: z.number(),
    model: z.coerce.string(),
    big_showroom: z.number(),
    small_showroom: z.number(),
    total_stock: z.number(),
    unit_price: z.number(),
})

export type TCreateBulkProductProps = z.infer<typeof productSchema>

export async function createBulkProduct(jsonData: TCreateBulkProductProps[]) {

    // select only the category name or group data
    // const uniqueGroupName = Array.from(new Set(jsonData.map(item => item)))
    
    await prisma.groupProduct.createMany({
        data: jsonData.map(data => ({
            name: data.group_name,
            l
        })),
        skipDuplicates: true
    })

    // get call category data
    // const getAllCategory = await prisma.category.findMany();

    // list the category by map
    // const existingCategories = getAllCategory.map(category => category.name)

    // filter if there is a  duplicates if there is a duplicates will return as a single value and rest of the data
    // const newCategoryNames = uniqueGroupName.filter(({ group_name }) => !existingCategories.includes(group_name))

    // await prisma.category.createMany({
    //     data: newCategoryNames.map(data => ({
    //         name: data.group_name,
    //         languageCode: "en-us"
    //     }))
    // })


    // get all in products listing
    // const getAllProducts = await prisma.product.findMany()

    // lists the products by map
    // const productLists = getAllProducts.map(({ model }) => model)

    // filter if there is a  duplicates if there is a duplicates will return as a single value and rest of the data
    // const newProductLists = uniqueGroupName.filter(data => !productLists.includes(data.model))

    // desctructure the data    

    await prisma.product.createMany({
        data: jsonData.map(data => ({
            model: data.model.toString(),
            price: data.unit_price,
            shortDescriptionAr: data.description_ar,
            shortDescriptionEn: data.description_en,
            stock: data.total_stock,
            taxValue: "15.00",
            groupName: data.group_name,
            isFeatured: false,
            isLive: true,

        })),
        skipDuplicates: true
    })

}
