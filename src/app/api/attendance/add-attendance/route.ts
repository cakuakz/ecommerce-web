import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

type Attendance = {
    userId: string;
    isAttended: boolean;
};

export const POST = async (req: Request) => {
    const client = await db.connect();
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    try {
        const data: Attendance = await req.json();

        if (data.isAttended) {
            const existingAttendance = await client.sql`
                SELECT * FROM attendance
                WHERE user_id = ${data.userId}
                AND attendance_date = ${date}
            `;

            if (existingAttendance?.rowCount && existingAttendance.rowCount > 0) {
                return NextResponse.json({ message: "Already doing attendance today" }, { status: 400 })
            }

            let attendanceStatus: 'present' | 'late' | 'absent';

            const checkInTime = currentDate.getHours() * 60 + currentDate.getMinutes();
            const presentStartTime = 9 * 60;
            const presentEndTime = 9 * 60 + 30;
            const lateEndTime = 17 * 60;

            if (checkInTime >= presentStartTime && checkInTime <= presentEndTime) {
                attendanceStatus = 'present';
            } else if (checkInTime > presentEndTime && checkInTime <= lateEndTime) {
                attendanceStatus = 'late';
            } else {
                attendanceStatus = 'absent';
            }

            await client.sql`
                INSERT INTO attendance (
                    user_id,
                    attendance_date,
                    check_in_time,
                    attendance_status
                ) VALUES (
                    ${data.userId},
                    ${date},
                    ${time},
                    ${attendanceStatus}
                )
            `;
            return NextResponse.json({ message: "Attendance Status has been changed" }, { status: 200 })
        }
    } catch (error) {
        console.error("Error inserting attendance:", error);
        return NextResponse.json({ message: "Failed to do attendance" }, { status: 500 })
    } finally {
        client.release();
    }
};
