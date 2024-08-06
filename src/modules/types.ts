import { ReactNode } from "react"

export type TLayout = {
    children: ReactNode
}

export type TNavbarType = {
    label: string
    href: string
}

export type TDefault = {
    is_success: boolean
    message: string
}

export type TryType = {
    hello: string
}