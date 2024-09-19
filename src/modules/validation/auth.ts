import { capitalCase } from 'text-case';
import { z } from 'zod';

import DICTIONARY from '../constant/language';

const requiredMessage = capitalCase(DICTIONARY.VALIDATION.REQUIRED_FIELD)
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const LoginPayloadSchema = z.object({
    username: z.string().min(1, {message: requiredMessage}),
    password: z.string().min(1, {message: requiredMessage})
})

const RegisterPayloadSchema = z.object({
    username: z.string().min(1, {message: requiredMessage}),
    password: z.string().min(1, {message: requiredMessage}),
    fullname: z.string().min(1, {message: requiredMessage}),
    img_url: z
        .any()
        // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        // .refine(
        // (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        // "Only .jpg, .jpeg, .png and .webp formats are supported."
        // )
        // 
        // need to fix the file schema
})

export { 
    LoginPayloadSchema, 
    RegisterPayloadSchema 
}