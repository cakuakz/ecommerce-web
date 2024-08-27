import { asBlob, generateCsv, mkConfig } from "export-to-csv";

import { ProductResponse } from "../response/products";

const csvConfig = mkConfig({ useKeysAsHeaders: true });

export const getData = async (): Promise<ProductResponse[]> => {
    try {
        const response = await fetch('/api/products/get-products');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const body = await response.json();
        const data: ProductResponse[] = body.products;
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const generateCsvUrl = async (): Promise<string> => {
    try {
        const data = await getData()
        const csv = generateCsv(csvConfig)(data)
        const blob = asBlob(csvConfig)(csv)
        return URL.createObjectURL(blob)
    } catch (error) {
        console.error('Failed to generate CSV:', error);
        throw error;
    }
};
