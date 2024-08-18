import { AddProductSchemaType } from "../payload/product"
import { ProductAddResponse } from "../response/products";

export const addProductApi = async (payload: AddProductSchemaType): Promise<ProductAddResponse> => {
    const response = await fetch('/api/products/add-product', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add product');
    }

    const result: ProductAddResponse = await response.json();
    return result;
};


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