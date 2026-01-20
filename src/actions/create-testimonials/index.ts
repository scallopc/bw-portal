// src/actions/create-testimonial/index.ts
"use server";

import { revalidatePath } from "next/cache";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { z } from "zod";

export const createTestimonialSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  company: z.string().min(2, "O nome da empresa é obrigatório"),
  content: z.string().min(10, "O depoimento deve ter pelo menos 10 caracteres"),
});

export const createTestimonial = async (formData: FormData) => {
  try {
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      content: formData.get("content") as string,
      approved: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Validação com Zod
    const validatedData = createTestimonialSchema.parse(data);

    await addDoc(collection(db, "testimonials"), validatedData);
    revalidatePath("/[locale]/services");

    return {
      success: true,
      message: "Depoimento enviado com sucesso! Agradecemos pelo seu feedback.",
    };
  } catch (error) {
    console.error("Erro ao criar depoimento:", error);
    return {
      success: false,
      error:
        error instanceof z.ZodError
          ? error.errors.map((e) => e.message).join(", ")
          : "Ocorreu um erro ao enviar seu depoimento. Por favor, tente novamente.",
    };
  }
};
