import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

import { GetAttendanceData, TAttendanceResponse } from "@/modules/response/attendance"

export const POST = async (req: Request) => {
    const client = await db.connect()

    try {
        const data = await req.json()
        const user_attendance = await client.sql`SELECT attendance_status, check_in_time, check_out_time, attendance_date FROM attendance WHERE user_id = ${data.user_id}`

        if (user_attendance.rowCount == 0) {
            return NextResponse.json({ message: "User's attendance data not found" }, { status: 400 })
        }

        const attendance_data = user_attendance.rows

        return NextResponse.json<TAttendanceResponse>({ 
            message: "User's attendance data has been retrieved",
            data: attendance_data as GetAttendanceData[]
        }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    } finally {
        client.release()
    }
}