import {
    HomeOutlined,
    ProductOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { MenuProps } from 'antd';
import Link from 'next/link';


type MenuItem = Required<MenuProps>['items'][number]

export const MenuLayoutData: MenuItem[] = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: (
            <Link href="/menu">Dashboard</Link>
        ),
        
    },
    {
        key: '2',
        icon: <ProductOutlined />,
        label: (
            <Link href="/menu/product">Products</Link>
        ),
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: 'User',
    }
]