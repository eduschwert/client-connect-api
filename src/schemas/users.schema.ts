import { z } from "zod"

const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

const userSchemaRequest = userSchema.omit({
    id: true
})

const userSchemaResponse = userSchema.omit({
    password: true
})


export { userSchema, userSchemaRequest, userSchemaResponse }