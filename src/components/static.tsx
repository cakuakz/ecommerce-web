import {
    HomeOutlined,
    ProductOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number]

export const MenuLayoutData: MenuItem[] = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: <ProductOutlined />,
        label: 'Products',
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: 'User',
    }
]