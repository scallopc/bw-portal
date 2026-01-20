import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales } from "../../i18n/config";
import { Header } from "@/components/common";
import { Footer } from "@/components/common";
import { ChatWidget } from "@/components/common";
import { LocaleChrome } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        console.log(error)
        notFound();
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LocaleChrome
                header={<Header />}
                footer={<Footer />}
                chatWidget={<ChatWidget />}
                toaster={<Toaster />}
            >
                {children}
            </LocaleChrome>
        </NextIntlClientProvider>
    );
}