import { TDefault } from "../types"

export type ProductResponse = {
    id: string
    product_name: string
    image_url: string
    status: string
    price: number
    sales_status: string
    gender: string
    breed: string
    created_at: string
    updated_at: string
}

export type ProductAddResponse = TDefault & {
    product?: ProductResponse
    error?: string
}

export type GetProductResponse = TDefault & {
    products?: ProductResponse[]
}