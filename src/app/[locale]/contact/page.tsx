"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from 'next-intl';
import { toast } from "sonner";

const createContactFormSchema = (t: (key: string) => string) =>
    z.object({
        name: z.string().min(2, { message: t('form.required') }),
        email: z.string().email({ message: t('form.invalidEmail') }),
        phone: z.string().min(11, { message: t('form.invalidPhone') }),
        subject: z.string().min(5, { message: t('form.required') }),
        message: z.string().min(10, { message: t('form.required') })
    });

type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;

export default function ContactPage() {
    const t = useTranslations('contact');
    const contactFormSchema = useMemo(() => createContactFormSchema(t), [t]);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    });

    const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
        try {
            // Simulação de envio do formulário
            console.log("Dados do formulário:", data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success(t("form.toastSuccess"));
            reset();
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            toast.error(t("form.toastError"));
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: t('info.email'),
            description: "contato@buildweb.com.br"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: t('info.phone'),
            description: "(+55) 11 91226-0094"
        }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-background via-background to-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t('title')}</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-card p-8 rounded-2xl shadow-sm border border-border/50"
                        >
                            <h2 className="text-2xl font-bold text-background mb-8">{t('form.title')}</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-background">
                                            {t('form.name')}
                                        </label>
                                        <Input
                                            id="name"
                                            placeholder={t("form.placeholderName")}
                                            {...register("name")}
                                            className={`border-border/50 text-secondary ${errors.name ? "border-destructive" : ""}`}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-background">
                                            {t('form.email')}
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t("form.placeholderEmail")}
                                            {...register("email")}
                                            className={`border-border/50 text-secondary ${errors.email ? "border-destructive" : ""}`}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-destructive">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-background">
                                            {t('form.phone')}
                                        </label>
                                        <Input
                                            id="phone"
                                            placeholder="(00) 00000-0000"
                                            {...register("phone")}
                                            className={`border-border/50 text-secondary ${errors.phone ? "border-destructive" : ""}`}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-background">
                                            {t('form.subject')}
                                        </label>
                                        <Input
                                            id="subject"
                                            placeholder={t("form.placeholderSubject")}
                                            {...register("subject")}
                                            className={`border-border/50 text-secondary ${errors.subject ? "border-destructive" : ""}`}
                                        />
                                        {errors.subject && (
                                            <p className="text-sm text-destructive">{errors.subject.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-background">
                                        {t('form.message')}
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder={t("form.placeholderMessage")}
                                        rows={5}
                                        {...register("message")}
                                        className={`border-border/50 text-secondary ${errors.message ? "border-destructive" : ""}`}
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-destructive">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full md:w-auto"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {t('form.sending')}
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            {t('form.submit')}
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6"> {t('info.title')}</h2>
                                <p className="text-muted-foreground mb-8">
                                    {t('info.description')}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                                    >
                                        <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{item.title}</h3>
                                            <p className="text-foreground">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-border/50">
                                <h3 className="font-semibold text-foreground mb-4">{t('workingHours.title')}</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex justify-between">
                                        <span>{t('workingHours.weekdays')}</span>
                                        <span>09:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>{t('workingHours.saturday')}</span>
                                        <span>09:00 - 12:00</span>
                                    </li>
                                    <li className="flex justify-between text-muted-foreground/60">
                                        <span>{t('workingHours.sunday')}</span>
                                        <span>{t('workingHours.closed')}</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="overflow-hidden rounded-2xl shadow-lg border border-border/50">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975844554423!2d-46.65502272437343!3d-23.561406478801212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59b943555c1b2d2!2sCentro%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="w-full"
                            title="Localização da BuildWeb no mapa"
                        ></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}
