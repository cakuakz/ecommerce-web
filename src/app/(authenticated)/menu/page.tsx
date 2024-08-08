'use client'

import { Button, Col, Row, Typography } from 'antd';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Menu = () => {
    const { Title, Paragraph } = Typography;
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>Please log in.</p>;
    }

    return (
        <>
            <Row justify="center" align="middle">
                <Col>
                    <Image 
                        src="/logo_ecommerce.svg"
                        alt='logo pict'
                        width={100}
                        height={150}
                        className=' mx-auto my-3'
                    />
                </Col>
            </Row>
            <Row justify="center" align="middle">
                <Col>
                    <Title level={3}>Welcome, {session.user?.name || 'User'}!</Title>
                    <Paragraph>Your session is active.</Paragraph>
                </Col>
            </Row>
        </>
    );
}

export default Menu;
