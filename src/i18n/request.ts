import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { defaultLocale, locales, type Locale } from "./config";

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
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
