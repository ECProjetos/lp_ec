// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
});

export const config = {
  // Inclui todas as rotas de app, API pode ficar de fora se quiser
  matcher: ["/", "/(pt|en|it|es)/:path*"],
};
