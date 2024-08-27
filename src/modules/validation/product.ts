import { capitalCase } from "text-case";
import { z } from "zod";

import DICTIONARY from "../constant/language";

const requiredMessage = capitalCase(DICTIONARY.VALIDATION.REQUIRED_FIELD)

const AddProductSchema = z.object({
    product_name: z.string().min(1, { message: requiredMessage }),
    status: z.string().min(1, { message: requiredMessage }),
    image_url: z.string().min(1, { message: requiredMessage }),
    price: z.number().min(0, { message: requiredMessage }),
    breed: z.string().min(1, { message: requiredMessage }),
    sales_status: z.string().min(1, { message: requiredMessage }),
    gender: z.string().min(1, { message: requiredMessage })
})

export {
    AddProductSchema
}