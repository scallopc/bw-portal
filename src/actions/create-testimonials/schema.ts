// src/actions/create-testimonial/schema.ts
import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  company: z.string().min(2, "O nome da empresa é obrigatório"),
  content: z.string().min(10, "O depoimento deve ter pelo menos 10 caracteres"),
  approved: z.boolean().default(false),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
