'use client'
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined  } from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { capitalCase } from 'text-case';

import { MenuLayoutData } from '@/components/static';
import DICTIONARY from '@/modules/constant/language';
import useWindowWidth from '@/modules/hooks/usewidthchecker';
import { useGetUserProperty } from '@/modules/state/general';
import { TLayout } from "@/modules/types";

const MenuLayout: React.FC<TLayout> = ({ children }) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const setUsername = useGetUserProperty((state) => state.setUsername)
    const setFullname = useGetUserProperty((state) => state.setFullname)
    const setImageUrl = useGetUserProperty((state) => state.setImageUrl)
    const windowWidth = useWindowWidth()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const getUserProperty = async (username: string) => {
        const response = await fetch("/api/auth/get-user-property", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        })
        const data = await response.json()
    
        if (response.ok) {
          setUsername(data.username)
          setFullname(data.fullname)
          setImageUrl(data.img_url)
          console.log("Berhasil")
        } else {
          console.error('Failed to fetch user property:', data.error)
        }
    }

    const MenuBar = () => {
        return (
            <div className='flex flex-col justify-between'>
                <Menu
                    theme="light"
                    mode="inline"
                    items={MenuLayoutData}
                />
                    <Menu 
                        theme="light"
                        mode="inline"
                        items={[
                            {
                                key: '1',
                                icon: <LogoutOutlined />,
                                label: capitalCase(DICTIONARY.SIDEBAR.LOGOUT),
                                onClick: () => {
                                    signOut({ redirect: false }).then(() => {
                                        router.push("/login")
                                    });
                                }
                            }
                        ]}
                    />
            </div>
        )
    }

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    useEffect(() => {
        if (windowWidth < 1024) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }, [windowWidth])

    if (status === 'loading') {
        return <p>Loading...</p>
    } 

    if (session) {
        getUserProperty(session.user.name)
    }

    return (
        <SessionProvider>
            <Layout>
                <Drawer
                    placement='left'
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    className={`${windowWidth < 1024 && collapsed ? '' : 'hidden'}`}
                >
                    <Image 
                        src="/logo_ecommerce.svg"
                        alt='logo pict'
                        width={100}
                        height={150}
                        className=' mx-auto my-3'
                    />
                    <MenuBar />
                </Drawer>
                <Sider 
                    trigger={null} 
                    collapsible 
                    collapsed={collapsed} 
                    style={{ background: colorBgContainer }}
                    className={`${windowWidth < 1024 && collapsed ? 'hidden' : 'z-50'}`}
                >
                    <Image 
                        src="/logo_ecommerce.svg"
                        alt='logo pict'
                        width={100}
                        height={150}
                        className=' mx-auto my-3'
                    />
                    <MenuBar />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        {windowWidth < 1024 ? (
                            <Button
                                type="text"
                                icon={<MenuUnfoldOutlined />}
                                onClick={() => setOpenDrawer(true)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        ) : (
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
                        )}
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