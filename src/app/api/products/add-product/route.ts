import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

import { AddProductSchemaType } from "@/modules/payload/product"
import { ProductAddResponse, ProductResponse } from "@/modules/response/products"

export const POST = async (req: Request) => {
    try {
        const client = await db.connect()

        const data: AddProductSchemaType = await req.json()
        const existingProduct = await client.sql`SELECT * FROM products WHERE product_name = ${data.product_name}`

        if (existingProduct.rows.length > 0) {
            return NextResponse.json<ProductAddResponse>({
                is_success: false,
                message: "Product Already Exist" 
            }, { status: 400 })
        }

        await client.sql`
            INSERT INTO products (
                product_name,
                image_url,
                status,
                price,
                breed,
                
            ) VALUES (
                ${data.product_name},
                ${data.image_url},
                ${data.status},
                ${data.price},
                ${data.breed}
            );
        `

        const product = await client.sql`SELECT * FROM products WHERE product_name = ${data.product_name}`
        return NextResponse.json<ProductAddResponse>({
            is_success: true,
            message: "Product Successfully Added!",
            product: product.rows[0] as ProductResponse
        }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json<ProductAddResponse>({
            is_success: false,
            message: "Failed to Add Product",
            error: (error as Error).message
        }, { status: 500 })
    }
}