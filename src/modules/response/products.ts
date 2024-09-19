import { TDefault } from "../types"

export type ProductResponse = {
    id: string
    product_name: string
    image_url: string
    product_type: string
    price: number
    sales_status: string
    pet_type: string
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