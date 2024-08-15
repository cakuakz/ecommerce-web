export type ProductResponse = {
    id: string
    product_name: string
    image_url: string
    status: string
    price: number
    breed: string
    created_at: string
    updated_at: string
}

export type AddProductResponse = {
    error?: string | null;
    status: number;
    ok: boolean;
    url?: string | null;
}