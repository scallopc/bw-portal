"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { AdminSheetMenu } from "./admin-sheet-menu";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AdminHeader() {
    const t = useTranslations("header");

    return (
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border/50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
                            <Image
                                src="/Logo-blue.svg"
                                alt={t("description")}
                                width={160}
                                height={50}
                                priority
                                className="h-14 w-auto"
                            />
                        </div>

                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-border/50">
                            Novo item
                        </Button>
                        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                            Ação
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="border-border/50">
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="p-0">
                                <AdminSheetMenu />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
