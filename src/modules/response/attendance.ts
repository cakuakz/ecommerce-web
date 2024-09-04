export type TAttendanceResponse = {
    message: string
    data: GetAttendanceData[]
}

export type GetAttendanceData = {
    attendance_status: string
    attendance_date: string
    check_in_time: string
    check_out_time: string
}