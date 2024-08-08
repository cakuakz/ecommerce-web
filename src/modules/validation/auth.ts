import { capitalCase } from 'text-case';
import { z } from 'zod';

import DICTIONARY from '../constant/language';

const requiredMessage = capitalCase(DICTIONARY.VALIDATION.REQUIRED_FIELD)

const LoginPayloadSchema = z.object({
    username: z.string().min(1, {message: requiredMessage}),
    password: z.string().min(1, {message: requiredMessage})
})

const RegisterPayloadSchema = z.object({
    username: z.string().min(1, {message: requiredMessage}),
    password: z.string().min(1, {message: requiredMessage}),
    fullname: z.string().min(1, {message: requiredMessage})
})

export { 
    LoginPayloadSchema, 
    RegisterPayloadSchema 
}