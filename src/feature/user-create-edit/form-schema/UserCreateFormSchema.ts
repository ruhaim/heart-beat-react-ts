import { z } from "zod";

export const UserCreateFormSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    gender: z.union([z.literal("male"), z.literal("female")]),
    dob: z.string().date().refine((value) => {
        const diff = new Date().getTime() - new Date(value).getTime()
        return diff > 0
    }, "Date of birth cannot be a future date"),
    city: z.string().trim().min(1, { message: "City is required" }),
    mobile: z.string().trim().min(1, { message: "Mobile is required" }),
})

export type UserCreateFormSchemaType = z.infer<typeof UserCreateFormSchema>;