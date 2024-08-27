import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const client = await db.connect()

    try {
        const { username } = await req.json()
        const { rows } = await client.sql`SELECT username, fullname, img_url FROM users WHERE username = ${username}`

        if (rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const user = rows[0]
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}