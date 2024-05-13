import {z} from "zod"

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
}).strict()

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6)
}).strict()

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
}).strict()

export const updateBlogInput = z.object({
    id : z.string(),
    title : z.string().optional(),
    content : z.string().optional()
}).strict()


export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>