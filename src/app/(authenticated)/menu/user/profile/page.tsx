'use client'

import { Avatar, Card, Row, Typography } from "antd";
import Image from 'next/image';
import { capitalCase } from "text-case";

import UserProfileForm from '@/components/user/userprofileform';
import DICTIONARY from "@/modules/constant/language";
import { useGetUserProperty } from "@/modules/state/general";

const UserProfile = () => {
    const { Title } = Typography
    const img_url = useGetUserProperty((state) => state.img_url)

    return (
        <>
            <Row justify="center" align="middle">
                <Card
                    className='w-screen items-center'
                    bordered={false}
                    cover={
                        <Image 
                            src="/profile_banner.svg"
                            alt='backdrop profile'
                            width={1190}
                            height={200}
                        />
                    }
                >
                    <div className="flex justify-center -mt-16">
                        <Avatar
                            src={img_url}
                            size={{ xs: 50, sm: 60, md: 60, lg: 64, xl: 120, xxl: 140 }}
                            className='border-2 border-slate-300'
                        />
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Title level={2}>{capitalCase(DICTIONARY.MENU.USER_MANAGEMENT.PROFILE.TITLE)}</Title>
                    </div>
                </Card>
                <UserProfileForm />
            </Row>
        </>
     );
}
 
export default UserProfile;