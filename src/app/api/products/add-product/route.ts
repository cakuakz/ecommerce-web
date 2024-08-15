import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

import { AddProductSchemaType } from "@/modules/payload/product"

export const POST = async (req: Request) => {
    try {
        const client = await db.connect()

        const data: AddProductSchemaType = await req.json()
        const existingProduct = await client.sql`SELECT * FROM products WHERE product_name = ${data.product_name}`

        if (existingProduct.rows.length > 0) {
            return NextResponse.json({ message: "Product Already Exist" }, { status: 400 })
        }

        await client.sql`
            INSERT INTO products (
                product_name,
                image_url,
                status,
                price,
                breed
            ) VALUES (
                ${data.product_name},
                ${data.image_url},
                ${data.status},
                ${data.price},
                ${data.breed}
            );
        `

        const product = await client.sql`SELECT * FROM products WHERE product_name = ${data.product_name}`
        return NextResponse.json({ product: product.rows[0] }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error}, { status: 500 })
    }
}