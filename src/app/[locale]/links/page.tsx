// src/app/[locale]/links/page.tsx
'use client';

import { useTranslations } from "next-intl";
import { Globe, Instagram, Phone, ThumbsUp, Users, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { LinkButton } from "./link-button";

export default function LinksPage() {
    const t = useTranslations("links");

    const services = [
        { icon: "🌐", text: "Sites modernos" },
        { icon: "✏️", text: "Criativos para redes" },
        { icon: "📈", text: "Tráfego Pago" },
        { icon: "🎯", text: "Sua marca online" },
    ];

    const links = [
        {
            title: "Site Oficial",
            url: "https://buildweb.com.br",
            icon: <Globe className="w-5 h-5" />,
            position: "left" as const,
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Instagram",
            url: "https://instagram.com/buildweb",
            icon: <Instagram className="w-5 h-5" />,
            position: "right" as const,
            color: "from-pink-500 to-rose-500"
        },
        {
            title: "Facebook",
            url: "https://facebook.com/buildweb",
            icon: <ThumbsUp className="w-5 h-5" />,
            position: "left" as const,
            color: "from-blue-600 to-blue-700"
        },
        {
            title: "WhatsApp",
            url: "https://wa.me/SEUNUMERO",
            icon: <MessageSquare className="w-5 h-5" />,
            position: "right" as const,
            color: "from-green-500 to-emerald-500"
        },
        {
            title: "E-mail",
            url: "mailto:contato@buildweb.com.br",
            icon: <Mail className="w-5 h-5" />,
            position: "left" as const,
            color: "from-amber-500 to-orange-500"
        },
    ];

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-md mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="w-40 h-40 mx-auto mb-6 relative">
                        <Image
                            src="/Logo-blue.svg"
                            alt="BuildWeb"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-3">BuildWeb</h1>
                    <p className="text-muted-foreground mb-6">Soluções digitais completas</p>

                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-muted/50 rounded-lg p-4 text-center border"
                            >
                                <span className="text-2xl mb-2 block">{service.icon}</span>
                                <span className="text-sm text-foreground font-medium">{service.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4 mb-12">
                    {links.map((link, index) => (
                        <LinkButton
                            key={index}
                            title={link.title}
                            url={link.url}
                            icon={link.icon}
                            iconPosition={link.position}
                            delay={200 + (index * 100)}
                            className={`bg-gradient-to-r ${link.color} hover:shadow-md`}
                        />
                    ))}
                </div>

                {/* Footer */}
                <footer className="text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} BuildWeb. Todos os direitos reservados.
                    </p>
                </footer>
            </div>
        </div>
    );
}