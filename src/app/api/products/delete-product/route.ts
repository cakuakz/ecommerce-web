import { ProductResponse } from "@/modules/response/products"
import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const DELETE = async (req: Request) => {
    const client = await db.connect()

    try {
        const data: ProductResponse = await req.json()
        const product = await client.sql`SELECT * FROM products WHERE id = ${data.id}`

        if (product.rows.length === 0) {
            return NextResponse.json({ message: "Product not found" }, { status: 400 })
        }

        await client.sql`DELETE FROM products WHERE id = ${data.id}`
        return NextResponse.json({ message: "Product successfully deleted"}, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}