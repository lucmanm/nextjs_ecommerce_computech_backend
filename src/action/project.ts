"use server"
import { prisma } from "@/lib/db"
import * as z from "zod"
const brandData = [
    {
        name: "hp",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1715983065/brand-logo/czutgsnq992umlv3vdob.png",
        language: "en"
    },
    {
        name: "dell",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1715983064/brand-logo/pbsjvolw1tiuvaobacnc.png",
        language: "en"
    },
    {
        name: "apc",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1715983068/brand-logo/l2uvjyief9dmqinrnyqt.jpg",
        language: "en"
    },
    {
        name: "benq",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1715983069/brand-logo/dzz7hicdbhxaerequt8y.jpg",
        language: "en"
    },
    {
        name: "logitech",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1715983067/brand-logo/rn61fpk1zftrleypqlxd.jpg",
        language: "en"
    },
    {
        name: "arktek",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1715983068/brand-logo/tnvatklwpw0fpdaqgln2.jpg",
        language: "en"
    },
]

const slidersData = [
    {
        title: "all ine one Desktop",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1703715596/tqxthitfbhentrkyb2jo.png",
        language: "en"
    },
    {
        title: "laptop",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1703715528/xbu9zba2mkgxoepgbmld.png",
        language: "en"
    },
    {
        title: "desktop",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1694624393/vv7a4uronw2d7ppwzn92.png",
        language: "en"
    },
    {
        title: "Storage, Memory Etc.",
        url: "https://res.cloudinary.com/dzdcszrob/image/upload/v1694624385/ll4cq8l7i0gdotsbm6jy.png",
        language: "en"
    },
]

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

    await prisma.brand.createMany({
        data: brandData.map(data => ({
            name: data.name,
            imageUrl: data.url,
            languageCode: data.language
        })),
        skipDuplicates: true
    })

    await prisma.slider.createMany({
        data: slidersData.map(({url, title, language}) => ({
            name: title,
            imageUrl: url,
            languageCode:  language
        }))
    })

    await prisma.groupProduct.createMany({
        data: jsonData.map(data => ({
            name: data.group_name,
            languagecode: "en"
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
