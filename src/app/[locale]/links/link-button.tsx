// src/app/[locale]/links/link-button.tsx
'use client';

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
    title: string;
    url: string;
    icon: ReactNode;
    iconPosition?: "left" | "right";
    delay?: number;
    className?: string;
}

export function LinkButton({
    title,
    url,
    icon,
    iconPosition = "right",
    delay = 0,
    className
}: LinkButtonProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative block w-full overflow-hidden rounded-lg transition-all duration-300",
                "bg-white border border-border shadow-sm",
                "hover:shadow-md hover:-translate-y-0.5",
                "active:translate-y-0",
                className
            )}
            style={{
                animation: `fadeIn 0.5s ease-out ${delay}ms forwards`,
            }}
        >
            <div className={cn(
                "flex items-center p-4",
                iconPosition === "left" ? "flex-row" : "flex-row-reverse"
            )}>
                <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    "group-hover:bg-primary/10 transition-colors",
                    iconPosition === "left" ? "mr-3" : "ml-3"
                )}>
                    {icon}
                </div>
                <span className="flex-1 text-center font-medium text-foreground text-sm md:text-base">
                    {title}
                </span>
            </div>
        </a>
    );
}