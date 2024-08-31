import { db } from "@vercel/postgres"
import { NextResponse } from "next/server"

import { CheckAttendanceType } from "@/modules/payload/user"

export const POST = async (req: Request) => {

    const client = await db.connect()
    const currentDate = new Date()
    const time = currentDate.toLocaleTimeString()

    try {
        const data: CheckAttendanceType = await req.json()
        const existing_check_out_time = await client.sql`SELECT check_out_time FROM attendance WHERE user_id = ${data.user_id}`


        if (existing_check_out_time.rowCount != 0) {
            return NextResponse.json({ message: `Already doing check out at: ${existing_check_out_time}` })
        }

        const checkOutTime = currentDate.getHours() * 60 + currentDate.getMinutes()
        const maxEndTime = 17 * 60

        if (data.isAttended) {
            if (checkOutTime >= maxEndTime) {
                await client.sql`
                    UPDATE attendance
                    SET check_out_time = ${time}, attendance_status = 'absent'
                    WHERE user_id = ${data.user_id}
                `
                return NextResponse.json({ message: "Automatically absent, late check out time" }, { status: 200 })
            }

            await client.sql`
                UPDATE attendance
                SET check_out_time = ${time}
                WHERE user_id = ${data.user_id}
            `
            return NextResponse.json({ message: "Check Out Success!" }, { status: 200 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to do Check Out" }, { status: 500 })
    } finally {
        client.release()
    }
}