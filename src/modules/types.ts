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

export type TDropdown = {
    label: string
    value: string
}

export type TTable<T> = {
    data: T[]
    columns: TTableColumn<T>[]
    classNames?: string
    nullValueReplace: string
    onEdit?: (record: T) => void
    onDelete?: (record: T) => void
}

export type TTableColumn<T> = {
    label: string
    column: keyof T
}

export type TModal = {
    isOpen?: boolean
    modalTitle: string
    onSubmit?: () => void
    onCancel?: () => void
    onAction?: () => void
    useCancelButton?: boolean
    useSubmitButton?: boolean
    useActionButton?: boolean
    cancelText?: string
    submitText?: string
    actionText?: string
    isLoading?: boolean
    children: ReactNode
    modalWidth?: number
}