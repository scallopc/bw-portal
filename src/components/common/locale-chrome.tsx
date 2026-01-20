"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactQueryProvider } from "@/providers/react-query-provider";

type LocaleChromeProps = {
    children: ReactNode;
    header: ReactNode;
    footer: ReactNode;
    chatWidget: ReactNode;
    toaster: ReactNode;
};

export function LocaleChrome({
    children,
    header,
    footer,
    chatWidget,
    toaster,
}: LocaleChromeProps) {
    const pathname = usePathname();

    const isAdminRoute = pathname.split("/")[2] === "admin";

    if (isAdminRoute) {
        return (
            <ReactQueryProvider>
                {children}
                {toaster}
            </ReactQueryProvider>
        );
    }

    return (
        <ReactQueryProvider>
            {header}
            <div className="mt-36">{children}</div>
            {footer}
            {chatWidget}
            {toaster}
        </ReactQueryProvider>
    );
}
