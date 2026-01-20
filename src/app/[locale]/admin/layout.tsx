"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminHeader from "./components/admin-header";

export default function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const isLoginRoute = pathname.split("/")[3] === "login";

    if (isLoginRoute) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="min-h-screen">
                <AdminHeader />
                <main className="container mx-auto px-4 py-8">{children}</main>
            </div>
        </div>
    );
}
