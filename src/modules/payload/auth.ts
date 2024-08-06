import { z } from "zod";

import LoginPayloadSchema from "../validation/auth";

export type LoginPayloadSchemaType = z.infer<typeof LoginPayloadSchema>