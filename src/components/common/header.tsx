"use client";

import { useMemo, useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppCTAButton } from "./whatsapp-cta-button";
import LanguageSwitcher from "./language-switcher";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();

  const navigationLinks = useMemo(
    () => [
      { id: "inicio", label: t("nav.home"), href: "/" },
      { id: "servicos", label: t("nav.services"), href: "/services" },
      { id: "portfolio", label: t("nav.projects"), href: "/projects" },
      { id: "sobre", label: t("nav.about"), href: "/about" },
      { id: "contato", label: t("nav.contact"), href: "/contact" },
    ],
    [t]
  );

  const isLocale = (value: string): value is Locale => {
    return locales.includes(value as Locale);
  };

  const currentLocale = (() => {
    const candidate = pathname.split("/")[1];
    return isLocale(candidate) ? candidate : defaultLocale;
  })();

  const pathnameWithoutLocale = (() => {
    const segments = pathname.split("/");
    const candidate = segments[1];
    if (isLocale(candidate)) {
      const rest = segments.slice(2).join("/");
      return rest ? `/${rest}` : "/";
    }
    return pathname;
  })();

  const getHref = (href: string) => {
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href}`;
  };

  const [activeSection, setActiveSection] = useState(() => {
    // Define a seção ativa inicial com base na rota
    if (pathnameWithoutLocale === '/services') return 'servicos';
    if (pathnameWithoutLocale === '/projects') return 'portfolio';
    if (pathnameWithoutLocale === '/about') return 'sobre';
    if (pathnameWithoutLocale === '/contact') return 'contato';
    if (pathnameWithoutLocale === '/') return 'inicio';
    return 'inicio';
  });

  useEffect(() => {
    // Atualiza a seção ativa quando a rota muda
    if (pathnameWithoutLocale === '/services') {
      setActiveSection('servicos');
    } else if (pathnameWithoutLocale === '/projects') {
      setActiveSection('portfolio');
    } else if (pathnameWithoutLocale === '/about') {
      setActiveSection('sobre');
    } else if (pathnameWithoutLocale === '/contact') {
      setActiveSection('contato');
    } else if (pathnameWithoutLocale === '/') {
      setActiveSection('inicio');
    }

    const handleScroll = () => {
      // Só executa a lógica de scroll se estiver na página inicial
      if (pathnameWithoutLocale !== '/') return;

      const sections = navigationLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    if (pathnameWithoutLocale === '/') {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (pathnameWithoutLocale === '/') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [navigationLinks, pathname, pathnameWithoutLocale]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-xl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
              <Image
                src="/Logo-blue.svg"
                alt={t("description")}
                width={160}
                height={50}
                priority
                className="h-14 w-auto"
              />
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:block">
            <div className="flex items-center space-x-12">
              {navigationLinks.map((link) => (
                <a
                  key={link.id}
                  href={getHref(link.href)}
                  className={`font-medium text-sm tracking-wide transition-all duration-300 relative group py-2 ${activeSection === link.id
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 rounded-full ${activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                </a>
              ))}
              <LanguageSwitcher />
            </div>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:block">
            <WhatsAppCTAButton variant="desktop" />
          </div>

          {/* Mobile Menu Sheet */}
          <div className="lg:hidden flex align-center gap-2">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-foreground hover:text-primary hover:bg-secondary/10 p-2 rounded-lg transition-all duration-300"
                >
                  <Menu className="w-12 h-12" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50">
                <div className="flex flex-col h-full pt-8 px-4">
                  {/* Logo no Sheet */}
                  <div className="flex items-center justify-center mb-8">

                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-6 flex-1">
                    {navigationLinks.map((link) => (
                      <a
                        key={link.id}
                        href={getHref(link.href)}
                        className={`text-lg font-montserrat font-medium transition-all duration-300 py-3 px-4 rounded-xl ${activeSection === link.id
                          ? "text-primary bg-secondary/10 border-l-4 border-secondary"
                          : "text-foreground/80 hover:text-foreground hover:bg-secondary/5"
                          }`}
                      >
                        {link.label}
                      </a>
                    ))}

                  </nav>

                  {/* CTA Button Mobile */}
                  <div className="p-4 border-t border-border/30">
                    <WhatsAppCTAButton variant="mobile" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
