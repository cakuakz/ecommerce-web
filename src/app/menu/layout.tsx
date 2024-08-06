'use client'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Image from 'next/image';
import { useState } from 'react';

import { TLayout } from "@/modules/types";

const MenuLayout: React.FC<TLayout> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
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
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                        },
                        {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                        },
                        {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                        },
                    ]}
                />
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
     );
}
 
export default MenuLayout;