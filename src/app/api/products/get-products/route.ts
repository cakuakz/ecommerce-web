import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const client = await db.connect()

    try {
        const products = await client.sql`SELECT * FROM products ORDER BY created_at LIMIT 10 OFFSET 0;`
        return NextResponse.json(
            { is_success: true, message: "Products fetched successfully", products: products.rows },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                    "Surrogate-Control": "no-store"
                }
            }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { is_success: false, message: "Products fetch failed", error: error },
            { status: 500 }
        )
    }
}
