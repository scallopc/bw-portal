// i18n/config.ts
export const defaultLocale = "pt-BR" as const;
export const locales = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const languages = {
  "pt-BR": "PT",
  en: "EN",
  es: "ES",
} as const;
