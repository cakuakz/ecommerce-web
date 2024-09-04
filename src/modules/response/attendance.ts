export type TAttendanceResponse = {
    message: string
    data: GetAttendanceData[]
}

export type GetAttendanceData = {
    attendance_status: string
    check_in_time: string
    check_out_time: string
}