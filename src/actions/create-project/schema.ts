import { z } from "zod";

export const createProjectSchema = z
  .object({
    projectType: z.enum(["Sistema", "Site", "Landing Page", "Site com CMS"]),
    status: z.enum(["Finalizado", "Em progresso", "Pausado", "Cancelado"]),
    title: z.string().min(2),
    url: z.string().url(),
    tags: z.array(z.string()).min(1),
    totalValueCents: z.number().int().nonnegative(),
    paidValueCents: z.number().int().nonnegative(),
    paymentMethod: z.enum([
      "PIX",
      "Cartão",
      "Cortesia",
      "Boleto",
      "Transferência",
      "Outro",
    ]),
    paymentTerms: z.string().optional(),
    startDate: z.string().optional(),
    deadline: z.string().optional(),
    repositoryUrl: z.string().url().optional(),
    driveUrl: z.string().url().optional(),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paidValueCents > data.totalValueCents) {
      ctx.addIssue({
        code: "custom",
        path: ["paidValueCents"],
        message: "O valor pago não pode ser maior que o valor total.",
      });
    }
  });

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
