import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const client = await db.connect()

    try {
        const result = await client.sql`
            CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');

            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE Attendance (
                attendance_id UUID PRIMARY KEY DEFAULT  uuid_generate_v4(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                attendance_date DATE NOT NULL,
                check_in_time TIME,
                check_out_time TIME,
                attendance_status attendance_status NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}