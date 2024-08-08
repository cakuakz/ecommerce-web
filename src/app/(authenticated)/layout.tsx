'use client'
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined  } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { MenuLayoutData } from '@/components/static';
import { TLayout } from "@/modules/types";

const MenuLayout: React.FC<TLayout> = ({ children }) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    useEffect(() => {
        if (status === 'loading') return
        if (!session) router.push('/login')
      }, [session, status, router])
    
      if (status === 'loading') {
        return <p>Loading...</p>
      }

    return (
        <SessionProvider>
            <Layout>
                <Sider 
                    trigger={null} 
                    collapsible 
                    collapsed={collapsed} 
                    style={{ background: colorBgContainer }}
                >
                    <Image 
                        src="/logo_ecommerce.svg"
                        alt='logo pict'
                        width={100}
                        height={150}
                        className=' mx-auto my-3'
                    />
                    <div className='flex flex-col justify-between'>
                        <Menu
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={MenuLayoutData}
                        />
                        <Menu 
                            theme="light"
                            mode="inline"
                            items={[
                                {
                                    key: '1',
                                    icon: <LogoutOutlined />,
                                    label: 'Logout',
                                    onClick: () => {
                                        signOut({ redirect: false }).then(() => {
                                            router.push("/login")
                                        });
                                    }
                                }
                            ]}
                        />
                    </div>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            }}
                        />
                    </Header>

                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 630,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </SessionProvider>    
     );
}
 
export default MenuLayout;