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

// TypeScript interface inferred from the Zod schema
export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginValues = z.infer<typeof loginSchema>;
