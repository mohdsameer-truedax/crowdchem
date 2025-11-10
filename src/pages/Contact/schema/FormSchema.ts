// src/schemas/contactSchema.ts
import { z } from "zod";

export const contactCategories = ["partnerships", "sales", "recruitment", "press"] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be less than 100 characters."),
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  category: z.enum(contactCategories, {
    message: "Please select a valid category.",
  }),
  company: z.string().optional(),
  message: z
    .string()
    .max(1000, "Message must be under 1000 characters.")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
