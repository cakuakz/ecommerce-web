import { z } from "zod";

import { LoginPayloadSchema, RegisterPayloadSchema } from "../validation/auth";

export type LoginPayloadSchemaType = z.infer<typeof LoginPayloadSchema>
export type RegisterPayloadSchemaType = z.infer<typeof RegisterPayloadSchema>