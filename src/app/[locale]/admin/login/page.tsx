"use client";

import { useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase-auth";
import { useAdminLoginMutation } from "@/hooks/use-admin-login-mutation";
import type { Locale } from "@/i18n/config";

const createAdminLoginSchema = () =>
    z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

type AdminLoginFormData = z.infer<ReturnType<typeof createAdminLoginSchema>>;

export default function AdminLoginPage() {
    const router = useRouter();
    const params = useParams<{ locale: Locale }>();
    const locale = params.locale;

    const schema = useMemo(() => createAdminLoginSchema(), []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AdminLoginFormData>({
        resolver: zodResolver(schema),
    });

    const adminLoginMutation = useAdminLoginMutation();

    const onSubmit = handleSubmit(async ({ email, password }) => {
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await credential.user.getIdToken();

            await adminLoginMutation.mutateAsync({ idToken });

            router.push(`/${locale}/admin`);
            router.refresh();
        } catch (error) {
            toast.error("Não foi possível entrar no admin.");
            console.error(error);
        }
    });

    return (
        <main className="min-h-screen bg-background">
            <div className="min-h-screen flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md bg-card text-card-foreground rounded-md shadow-md p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-card-foreground">Login do Admin</h1>
                        <p className="text-sm text-card-foreground/70 mt-2">
                            Acesse o painel da BuildWeb.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-card-foreground" htmlFor="email">
                                E-mail
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seuemail@dominio.com"
                                className={`border-border/50 text-secondary ${errors.email ? "border-destructive" : ""}`}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-card-foreground" htmlFor="password">
                                Senha
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className={`border-border/50 text-secondary ${errors.password ? "border-destructive" : ""}`}
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            disabled={isSubmitting || adminLoginMutation.isPending}
                        >
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
