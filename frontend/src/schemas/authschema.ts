import { z } from "zod";

// Zod schema for signup
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "firstName must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "lastName must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});



export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

