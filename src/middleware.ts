import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = /^\/(pt-BR|en|es)\/admin(\/.*)?$/.test(pathname);
  const isAdminLoginRoute = /^\/(pt-BR|en|es)\/admin\/login(\/.*)?$/.test(
    pathname
  );

  if (isAdminRoute && !isAdminLoginRoute) {
    const hasSessionCookie = request.cookies.has("bw_admin_session");

    if (!hasSessionCookie) {
      const locale = pathname.split("/")[1] || defaultLocale;
      const redirectUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(pt-BR|en|es)/:path*"],
};
