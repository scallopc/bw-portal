/**
 * Utilitários para integração com WhatsApp
 */

export interface WhatsAppConfig {
  phoneNumber?: string;
  message?: string;
}

/**
 * Número padrão da BuildWeb
 */
export const DEFAULT_WHATSAPP_NUMBER = "5511912260094";

/**
 * Mensagens pré-definidas para diferentes contextos
 */
export const WHATSAPP_MESSAGES = {
  orcamentoSite:
    "Olá! Gostaria de solicitar um orçamento para criação de site.",
  orcamentoHero:
    "Olá! Vim pelo site da BuildWeb e gostaria de solicitar um orçamento para um projeto web.",
  crm: "Olá! Tenho interesse em um CRM personalizado para minha empresa.",
  automacao: "Olá! Gostaria de saber mais sobre automação com IA.",
  suporte: "Olá! Preciso de suporte técnico.",
  contato: "Olá! Gostaria de conversar sobre os serviços da BuildWeb.",
  portfolio:
    "Olá! Vi o portfólio no site e gostaria de conversar sobre um projeto.",
} as const;

/**
 * Gera URL do WhatsApp com número e mensagem
 */
export function generateWhatsAppUrl(config: WhatsAppConfig = {}): string {
  const { phoneNumber = DEFAULT_WHATSAPP_NUMBER, message = "" } = config;

  const baseUrl = `https://wa.me/${phoneNumber}`;

  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  return baseUrl;
}

/**
 * Abre WhatsApp em nova aba
 */
export function openWhatsApp(config: WhatsAppConfig = {}): void {
  const url = generateWhatsAppUrl(config);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Hook para usar WhatsApp facilmente em componentes
 */
export function useWhatsApp() {
  const openChatWithMessage = (config: WhatsAppConfig = {}) => {
    openWhatsApp(config);
  };

  const getUrl = (config: WhatsAppConfig = {}) => {
    return generateWhatsAppUrl(config);
  };

  return {
    openChatWithMessage,
    getUrl,
    messages: WHATSAPP_MESSAGES,
    defaultNumber: DEFAULT_WHATSAPP_NUMBER,
  };
}
