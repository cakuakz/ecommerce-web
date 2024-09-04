'use client';

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Row, Skeleton, Typography } from "antd";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { capitalCase } from "text-case";

import CustomTable from "@/components/menu/customtable";
import ProfilePresence from "@/components/user/profilepresence";
import { GetAttendanceData, TAttendanceResponse } from "@/modules/response/attendance";
import { checkoutAttendance, GetUserAttendance } from "@/modules/services/attendance";
import { useGetUserProperty } from "@/modules/state/general";
import { TTableColumn } from "@/modules/types";

const PresencePage = () => {
    const { Title, Paragraph } = Typography
    const { data: session, status } = useSession()
    const [currentStatus, setCurrentStatus] = useState('')
    const img_url = useGetUserProperty((state) => state.img_url)
    const headCell: TTableColumn<GetAttendanceData>[] = [
        { label: "Status", column: "attendance_status" },
        { label: "Check In", column: "check_in_time" },
        { label: "Check Out", column: "check_out_time" },
        { label: "Date", column: "attendance_date" }
    ];

    const { data, isLoading } = useQuery({
        queryKey: ["userAttendance", session?.user.id],
        queryFn: () => GetUserAttendance(session?.user.id),
        enabled: status === "authenticated" && !!session?.user.id,
    })

    const mutation = useMutation({
        mutationKey: ['checkoutAttendance'],
        mutationFn: () => checkoutAttendance(session?.user.id)
    })

    useEffect(() => {
        const checkAttendance = () => {
            if (data?.data && data.data.length > 0) {
                const attendanceDate = new Date(data.data[0].attendance_date)
                attendanceDate.setHours(0, 0, 0, 0)
    
                const currentDate = new Date()
                currentDate.setHours(0, 0, 0, 0)
    

                if (currentDate > attendanceDate) {
                    setCurrentStatus('Not Present')
                } else {
                    setCurrentStatus(data.data[0].attendance_status)
                }
            }
        };
        checkAttendance()
    }, [data])

    return (
        img_url ? (
            <>
                <Title>Daily Attendance</Title>
                <Row justify="center" align="top" className="space-x-6">
                    <div className="flex flex-col items-center py-8 px-14 border border-slate-300 rounded-md">
                        <Image 
                            src="/face_recog_icon.svg"
                            alt="face recognition icon"
                            width={150}
                            height={150}
                        />
                        <Paragraph className="max-w-96 text-center mt-12 !mb-1">
                            Put your face in front of your camera, make sure there is enough light so your face will be recognized
                        </Paragraph>
                        <ProfilePresence />
                    </div>
                    <div className="flex flex-col items-center py-8 px-20 border border-slate-300 rounded-md">
                        <Title level={2}>Today Attendance Status</Title>
                        <Title className="!text-red-600 !mt-1 !mb-10">{capitalCase(currentStatus)}</Title>
                        <Button
                            className="bg-red-500 hover:!bg-red-400 focus:!bg-red-400 text-white hover:!text-white font-bold border-b-4 border-red-700 hover:!border-red-500 rounded"
                            onClick={() => mutation.mutate()}
                        >
                            Check Out
                        </Button>
                    </div>
                </Row>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <CustomTable 
                        data={data?.data || []}
                        columns={headCell}
                        classNames="rounded-sm drop-shadow-md mt-3"
                        nullValueReplace="No Check Out Date"
                        isActionColumn={false}
                    />
                )}
            </>
        ) : (
            <Skeleton />
        )
    );
};

export default PresencePage;