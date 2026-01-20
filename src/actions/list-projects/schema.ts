import { z } from "zod";

export const listProjectsSchema = z.object({});

export type ListProjectsInput = z.infer<typeof listProjectsSchema>;
