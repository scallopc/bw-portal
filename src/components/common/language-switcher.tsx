"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { languages, type Locale } from "../../i18n/config";
import { useTransition } from "react";

export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("header");
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleLocaleChange = (newLocale: Locale) => {
        startTransition(() => {
            const segments = pathname.split("/");
            segments[1] = newLocale;
            router.push(segments.join("/"));
        });
    };

    return (
        <Select
            value={locale}
            onValueChange={(value) => handleLocaleChange(value as Locale)}
            disabled={isPending}
        >
            <SelectTrigger
                size="sm"
                className="cursor-pointer w-fit border-0 bg-transparent px-0 py-2 shadow-none font-medium text-sm tracking-wide text-foreground/80 transition-all duration-300 relative group hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:text-primary [&>svg]:opacity-60"
                aria-label="Selecionar idioma"
            >
                <span className="font-medium text-sm tracking-wide transition-all duration-300 relative group py-2  group-hover:text-foreground/80 data-[state=open]:text-primary/80">
                    {t("language")}
                </span>
                <SelectValue placeholder={languages[locale as Locale]} />
                <span className="absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 rounded-full w-0 group-hover:w-full data-[state=open]:w-full" />
            </SelectTrigger>
            <SelectContent
                align="end"
                position="popper"
                side="bottom"
                sideOffset={8}
                avoidCollisions={false}
            >
                {Object.entries(languages).map(([lang, name]) => (
                    <SelectItem key={lang} value={lang}>
                        {name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}