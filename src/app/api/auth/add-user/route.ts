import { db } from "@vercel/postgres";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

import { RegisterPayloadSchemaType } from "@/modules/payload/auth";

export const POST = async (req: Request) => {
    try {
        const data: RegisterPayloadSchemaType = await req.json();

        const client = await db.connect();
        const existingUser = await client.sql`SELECT * FROM users WHERE username = ${data.username}`;

        if (existingUser.rows.length > 0) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 400 });
        }

        const hashedPassword = await hash(data.password, 10);

        await client.sql`INSERT INTO users (username, password, fullname) VALUES (${data.username}, ${hashedPassword}, ${data.fullname});`;

        const user = await client.sql`SELECT * FROM users WHERE username = ${data.username}`;
        return NextResponse.json({ user: user.rows[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};
