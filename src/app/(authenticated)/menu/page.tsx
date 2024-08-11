'use client'

import { Button, Col, Row, Spin, Typography } from 'antd';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Menu = () => {
    const { Title, Paragraph } = Typography;
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Spin spinning/>;
    }

    return (
        session && (
            <>
                <Row justify="start" align="middle">
                    <Col>
                        <Title level={2}>Welcome, {session.user.name}!</Title>
                        <Paragraph>Your session is active.</Paragraph>
                    </Col>
                </Row>
                <Row justify="space-between" align="middle">
                    <Col>
                        
                    </Col>
                </Row>
            </>
        )
    );
}

export default Menu;
