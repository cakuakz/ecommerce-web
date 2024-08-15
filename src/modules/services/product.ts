import { AddProductSchemaType } from "../payload/product"
import { AddProductResponse } from "../response/products"

export const addProductApi = async (payload: AddProductSchemaType): Promise<AddProductResponse> => {
    const result = await fetch('/api/products/add-product', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    return result
}

export const deleteProduct = async (id: string) => {
    const response = await fetch('/api/products/delete-product', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "id": id })
    })

    const data = await response.json();
    return data
}