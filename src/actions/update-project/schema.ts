import { z } from "zod";

export const updateProjectSchema = z
  .object({
    id: z.string().min(1),
    projectType: z.enum(["Sistema", "Website", "Landing Page"]),
    status: z.enum(["Finalizado", "Em progresso", "Pausado", "Cancelado"]),
    title: z.string().min(2),
    url: z.string().url(),
    tags: z.array(z.string()).min(1),
    totalValueCents: z.number().int().nonnegative(),
    paidValueCents: z.number().int().nonnegative(),
    paymentMethod: z.enum([
      "PIX",
      "Cartão",
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

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
