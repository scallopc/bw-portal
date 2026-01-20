// src/messages/i18n.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { defaultLocale, locales, type Locale } from "../i18n/config";

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  if (!requested || !hasLocale(locales, requested) || !isLocale(requested)) {
    notFound();
  }

  const locale = requested ?? defaultLocale;

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
  };
});
