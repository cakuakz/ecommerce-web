'use client'

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tabs, Typography } from "antd";
import { capitalCase } from "text-case";

import { labelInputClassname } from "@/components/static";
import ProfilePresence from '@/components/user/profilepresence';
import DICTIONARY from "@/modules/constant/language";
import { useGetUserProperty } from "@/modules/state/general";

const UserProfile = () => {
    const { Title, Paragraph } = Typography
    const username = useGetUserProperty((state) => state.username)
    const fullname = useGetUserProperty((state) => state.fullname)
    const img_url = useGetUserProperty((state) => state.img_url)

    return (
        <>
            <Row justify="start" align="middle">
                <Col>
                    <Title>{capitalCase(DICTIONARY.MENU.USER_MANAGEMENT.PROFILE.TITLE)}</Title>
                    <Paragraph>{capitalCase(DICTIONARY.MENU.USER_MANAGEMENT.PROFILE.SUBTITLE)}</Paragraph>
                </Col>
            </Row>
            <Tabs 
                centered
                items={[
                    {
                        key: '1',
                        label: 'User Profile',
                        children: (
                            <Row justify="space-between" align="middle">
                                <Card
                                    bordered={false}
                                    className='drop-shadow'
                                    style={{ width: 500 }}
                                >
                                    <Row className='!space-x-4 mb-10'>
                                        <Avatar
                                            src={img_url}
                                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} 
                                        />
                                        <Col>
                                            <Title level={2} className='!mt-0'>{fullname}</Title>
                                            <Row className='!space-x-2'>
                                                <UserOutlined />
                                                <Paragraph className='!my-0'>Monito Admin</Paragraph>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Title level={5} className='!mb-0 !opacity-50'>TEAM</Title>
                                            <Paragraph>Monito Admin Team</Paragraph>
                                        </Col>
                                        <Col>
                                            <Title level={5} className='!mb-0 !opacity-50'>LEAD</Title>
                                            <Paragraph>John Doe</Paragraph>
                                        </Col>
                                        <Col>
                                            <Title level={5} className='!mb-0 !opacity-50'>USERNAME</Title>
                                            <Paragraph>{username}</Paragraph>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                        )
                    },
                    {
                        key: '2',
                        label: 'User Presence',
                        children: (
                            <ProfilePresence />
                        )
                    }
                ]}
            />
        </>
     );
}
 
export default UserProfile;