import { capitalCase } from "text-case";
import { z } from "zod";

import DICTIONARY from "../constant/language";

const requiredMessage = capitalCase(DICTIONARY.VALIDATION.REQUIRED_FIELD)

const AddProductSchema = z.object({
    product_name: z.string().min(1, { message: requiredMessage }),
    image_url: z.string().min(1, { message: requiredMessage }),
    price: z.number().min(0, { message: requiredMessage }),
    product_type: z.string().min(1, { message: requiredMessage }),
    sales_status: z.enum(['available', 'unavailable']),
    pet_type: z.string().min(1, { message: requiredMessage })
})

export {
    AddProductSchema
}