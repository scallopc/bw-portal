"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    MessageSquareText,
    Settings,
    LogOut,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetHeader } from "@/components/ui/sheet";
import type { Locale } from "@/i18n/config";
import { useAdminLogoutMutation } from "@/hooks/use-admin-logout-mutation";

export function AdminSheetMenu() {
    const router = useRouter();
    const params = useParams<{ locale: Locale }>();
    const locale = params.locale;

    const logoutMutation = useAdminLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            router.push(`/${locale}/admin/login`);
            router.refresh();
        } catch (error) {
            toast.error("Não foi possível sair.");
            console.error(error);
        }
    };

    return (
        <>
            <SheetHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
                            <Image
                                src="/Logo-blue.svg"
                                width={160}
                                height={50}
                                alt="Buildweb - admin"
                                priority
                                className="h-14 w-auto"
                            />
                        </div>
                        <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                </div>
            </SheetHeader>

            <div className="px-4 py-4">
                <nav className="space-y-2">
                    <SheetClose asChild>
                        <Link
                            href={`/${locale}/admin`}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link
                            href={`/${locale}/admin/projects`}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors"
                        >
                            <FolderKanban className="h-4 w-4" />
                            Projetos
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors"
                        >
                            <Users className="h-4 w-4" />
                            Leads
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors"
                        >
                            <MessageSquareText className="h-4 w-4" />
                            Mensagens
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            Configurações
                        </Link>
                    </SheetClose>
                </nav>

                <div className="mt-6 border-t border-border/50 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-border/50 justify-start"
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                    </Button>
                </div>
            </div>
        </>
    );
}
