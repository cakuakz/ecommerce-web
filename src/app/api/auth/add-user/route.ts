import { db } from "@vercel/postgres";
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req: Request) => {
    const client = await db.connect()

    try {
        const formdata = await req.formData()

        const username = formdata.get("username")?.toString()
        const password = formdata.get("password")?.toString()
        const fullname = formdata.get("fullname")?.toString()
        const file = formdata.get("img_url") as File

        if (!username || !password || !fullname || !file) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 })
        }

        const existingUser = await client.sql`SELECT * FROM users WHERE username = ${username}`

        if (existingUser.rows.length > 0) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_")
        const filePath = path.join(process.cwd(), "public/assets", filename)
        const img_url = `/assets/${filename}`

        await writeFile(filePath, buffer)

        const hashedPassword = await hash(password, 10)

        await client.sql`INSERT INTO users (username, password, fullname, img_url) VALUES (${username}, ${hashedPassword}, ${fullname}, ${img_url});`

        const user = await client.sql`SELECT * FROM users WHERE username = ${username}`
        return NextResponse.json({ user: user.rows[0] }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    } finally {
        client.release()
    }
}
