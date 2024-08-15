import { z } from "zod";

import { AddProductSchema } from "../validation/product";

export type AddProductSchemaType = z.infer<typeof AddProductSchema>