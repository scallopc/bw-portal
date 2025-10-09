"use client";

import { X, Bot } from "lucide-react";
import { useState, useEffect } from "react";
import { useWhatsApp } from "@/lib/whatsapp";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { openChatWithMessage, messages } = useWhatsApp();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const quickMessages = [
    {
      title: "Orçamento para Site",
      message: messages.orcamentoSite,
      icon: "🌐"
    },
    {
      title: "CRM Personalizado",
      message: messages.crm,
      icon: "⚙️"
    },
    {
      title: "Automação com IA",
      message: messages.automacao,
      icon: "🤖"
    },
    {
      title: "Suporte Técnico",
      message: messages.suporte,
      icon: "🛠️"
    }
  ];

  const handleQuickMessage = (message: string) => {
    // Por enquanto redireciona para WhatsApp, mas futuramente será chat com IA
    openChatWithMessage({ message });
    setIsOpen(false);
  };

  const handleStartChat = () => {
    // Futuramente aqui iniciará o chat com IA
    handleQuickMessage(messages.contato);
  };

  // Evita problemas de hidratação renderizando apenas no cliente
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Quick Messages Panel */}
        {isOpen && (
          <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-gradient-to-r from-primary to-primary/90 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-oswald font-bold text-white">Assistente BuildWeb</h3>
                  <p className="text-white/80 text-sm font-montserrat">Como posso ajudar você?</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3 max-w-xs">
              {quickMessages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(item.message)}
                  className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 border border-gray-100 hover:border-secondary/30 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-primary text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-xs font-montserrat">
                        Clique para conversar
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={handleStartChat}
                  className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-primary font-oswald font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  🤖 Iniciar Conversa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isOpen 
              ? 'bg-gray-100 hover:bg-gray-200' 
              : 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-20"></div>
              
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}
