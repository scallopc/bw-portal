import { z } from "zod";

export const adminLogoutSchema = z.object({});

export type AdminLogoutInput = z.infer<typeof adminLogoutSchema>;
