import {
    HomeOutlined,
    ProductOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { MenuProps } from 'antd';
import Link from 'next/link';
import { capitalCase, lowerCase } from 'text-case';

import DICTIONARY from '@/modules/constant/language';
import { TDropdown } from '@/modules/types';


type MenuItem = Required<MenuProps>['items'][number]

export const MenuLayoutData: MenuItem[] = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: (
            <Link href="/menu">{capitalCase(DICTIONARY.SIDEBAR.DASHBOARD)}</Link>
        ),
        
    },
    {
        key: '2',
        icon: <ProductOutlined />,
        label: (
            <Link href="/menu/product">{capitalCase(DICTIONARY.SIDEBAR.PRODUCTS)}</Link>
        ),
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: capitalCase(DICTIONARY.SIDEBAR.USER),
    }
]

export const StatusOptions: TDropdown[] = [
    {
        label: capitalCase(DICTIONARY.MENU.PRODUCTS.PET_STATUS.HEALTHY),
        value: "healthy"
    },
    {
        label: capitalCase(DICTIONARY.MENU.PRODUCTS.PET_STATUS.DISABLED),
        value: "disabled"
    }
]

export const BreedOptions: TDropdown[] = [
    {
        label: capitalCase(DICTIONARY.PET_BREED.AMERICAN_SHORTHAIR),
        value: lowerCase(DICTIONARY.PET_BREED.AMERICAN_SHORTHAIR)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.BRITISH_SHORTHAIR),
        value: lowerCase(DICTIONARY.PET_BREED.BRITISH_SHORTHAIR)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.INDONESIAN_SHORTHAIR),
        value: lowerCase(DICTIONARY.PET_BREED.INDONESIAN_SHORTHAIR)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.MAINE_COON),
        value: lowerCase(DICTIONARY.PET_BREED.MAINE_COON)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.MUNCHKIN),
        value: lowerCase(DICTIONARY.PET_BREED.MUNCHKIN)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.RAGDOLL),
        value: lowerCase(DICTIONARY.PET_BREED.RAGDOLL)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.SCOTTISH_FOLD),
        value: lowerCase(DICTIONARY.PET_BREED.SCOTTISH_FOLD)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.OREN),
        value: lowerCase(DICTIONARY.PET_BREED.OREN)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.EGYPTIAN_MAU),
        value: lowerCase(DICTIONARY.PET_BREED.EGYPTIAN_MAU)
    },
    {
        label: capitalCase(DICTIONARY.PET_BREED.PERSIAN_CAT),
        value: lowerCase(DICTIONARY.PET_BREED.PERSIAN_CAT)
    },
]