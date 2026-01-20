"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_WHATSAPP_NUMBER, useWhatsApp } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
interface WhatsAppCTAButtonProps {
  phoneNumber?: string;
  message?: string;
  variant?: "desktop" | "mobile" | "compact";
  className?: string;
  iconColor?: string;
  pingColor?: string;
}

export function WhatsAppCTAButton({
  phoneNumber = DEFAULT_WHATSAPP_NUMBER,
  message = "",
  variant = "desktop",
  className = "",
  iconColor = "text-secondary",
  pingColor = "bg-secondary"
}: WhatsAppCTAButtonProps) {
  const t = useTranslations("whatsapp");
  const { openChatWithMessage, messages } = useWhatsApp();

  const handleClick = () => {
    const finalMessage = message || messages.contato;
    openChatWithMessage({ phoneNumber, message: finalMessage });
  };

  const baseClasses = "relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-primary-foreground font-oswald font-bold shadow-xl hover:shadow-2xl transition-all duration-500 border-secondary/40 hover:border-secondary/60 overflow-hidden group backdrop-blur-sm";

  const variantClasses = {
    desktop: "px-8 py-4 rounded-full hover:scale-110",
    mobile: "w-full py-4 rounded-2xl hover:scale-105",
    compact: "px-6 py-3 rounded-full hover:scale-105"
  };

  const gapClasses = {
    desktop: "gap-3",
    mobile: "gap-3",
    compact: "gap-2"
  };

  const textClasses = {
    desktop: "text-sm",
    mobile: "text-sm",
    compact: "text-xs"
  };

  const iconClasses = {
    desktop: "w-4 h-4",
    mobile: "w-4 h-4",
    compact: "w-4 h-4"
  };

  return (
    <Button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className} inline-flex items-center ${gapClasses[variant]} relative ${variant === 'mobile' ? 'justify-center' : ''}`}
    >
      <Phone className={`${iconClasses[variant]} animate-pulse ${iconColor}`} />
      <div className={`flex flex-col ${variant === 'mobile' ? 'items-center' : 'items-start'}`}>
        <span className={`${textClasses[variant]} font-black tracking-wide`}>{t("btn")}</span>
      </div>
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 ${pingColor} rounded-full animate-ping`}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Button>
  );
}
