// src/hooks/use-create-testimonial.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { createTestimonial } from "@/actions/create-testimonial";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTestimonialSchema } from "@/actions/create-testimonial/schema";

export function useCreateTestimonial() {
  const form = useForm({
    resolver: zodResolver(createTestimonialSchema),
    defaultValues: {
      name: "",
      company: "",
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return createTestimonial(data);
    },
    onSuccess: (result) => {
      if (result.success) {
        form.reset();
      }
    },
  });

  return {
    form,
    mutation,
  };
}
