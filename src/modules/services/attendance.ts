import toast from "react-hot-toast";

import { TAttendanceResponse } from "../response/attendance"

export const GetUserAttendance = async (userId: string | undefined): Promise<TAttendanceResponse | undefined> => {
    if (!userId) {
        console.error("User ID is required");
        return;
    }

    try {
        const response = await fetch('/api/attendance/get-user-attendance', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch attendance data');
        }

        const result: TAttendanceResponse = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.error("Error fetching user attendance:", error)
    }
}

export const checkoutAttendance = async (user_id: string) => {
    const payload = {
        isAttended: true,
        user_id: user_id
    }
    const response = await fetch('/api/attendance/checkout-attendance', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    
    await response.json()
    .then((res) => toast.success(res.message))
}
