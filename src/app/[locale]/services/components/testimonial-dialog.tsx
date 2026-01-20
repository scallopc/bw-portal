// src/app/[locale]/services/components/testimonial-dialog.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"
import { useTranslations } from "next-intl";
import { createTestimonialSchema } from "@/actions/create-testimonials";

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    role: z.string().min(2, "Cargo é obrigatório"),
    company: z.string().min(2, "Empresa é obrigatória"),
    content: z.string().min(10, "Depoimento deve ter pelo menos 10 caracteres"),
});

interface TestimonialDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export function TestimonialDialog({ open, onOpenChange, onSubmit }: TestimonialDialogProps) {
    const t = useTranslations("services.testimonials.testimonialForm");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            company: "",
            content: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log('Form values:', values); // Adicione esta linha

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('company', values.company);
        formData.append('content', values.content);
        try {
            const result = await onSubmit(formData);
            if (result?.success) {
                form.reset();
                onOpenChange(false);
                toast.success(t('success'));
            }
        } catch (error) {
            toast.error(error.message || t('error'));
        }
    };


    const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log('Form values:', values);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('company', values.company);
        formData.append('content', values.content);
        try {
            const result = await onSubmit(formData);
            console.log('Submit result:', result);

            if (result?.success) {
                form.reset();
                onOpenChange(false);
                toast.success(t('success'));
            } else {
                throw new Error(result?.error || t('error'));
            }
        } catch (error) {
            console.error('Error in form submission:', error);
            toast.error(error.message || t('error'));
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                        {t("title")}
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        className="absolute right-4 top-4 h-8 w-8 p-0"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("nameLabel")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("namePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("companyLabel")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("companyPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("testimonialLabel")}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t("testimonialPlaceholder")}
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                {t("cancel")}
                            </Button>
                            <Button type="submit" >
                                {t("submit")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}