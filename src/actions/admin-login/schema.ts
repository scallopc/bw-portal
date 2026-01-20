import { z } from "zod";

export const adminLoginSchema = z.object({
  idToken: z.string().min(1),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
