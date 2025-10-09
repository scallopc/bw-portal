"use client";

import { Button, TypeCode } from "@/components";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useWhatsApp } from "@/lib/whatsapp";

export function HeroSection() {
  const [counts, setCounts] = useState({ clean: 0, projects: 0, performance: 0 });
  const { openChatWithMessage, messages } = useWhatsApp();

  useEffect(() => {
    // Animar contadores
    const animateCount = (target: number, key: keyof typeof counts) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    animateCount(100, 'clean');
    animateCount(500, 'projects');
    animateCount(99, 'performance');
  }, []);

  return (
    <section className="relative min-h-screen pt-36 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-radial from-secondary/40 to-transparent animate-float"></div>
        <div className="absolute bottom-1/5 left-1/12 w-48 h-48 rounded-full bg-gradient-radial from-secondary/45 to-transparent animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/6 w-36 h-36 bg-secondary/9 rotate-45 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border-4 border-secondary/30 rotate-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary font-medium rounded-full text-sm">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                Desenvolvimento Web Especializado              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-6xl font-bold text-foreground leading-none">
                  Sites
                </h1>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-none">
                  Revolucionados
                </h1>
                <div className="flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-secondary/30 to-transparent flex-1"></div>
                  <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-secondary">
                    com
                  </span>
                  <div className="h-px bg-gradient-to-l from-secondary/30 to-transparent flex-1"></div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-none">
                  Tecnologia
                </h1>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent leading-none">
                  Avançada
                </h1>
              </div>

              <p className="text-xl text-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transforme seu negócio com <span className="text-foreground font-semibold">sites profissionais</span> e <span className="text-foreground font-semibold">sistemas personalizados</span> que geram resultados reais.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => openChatWithMessage({ message: messages.orcamentoHero })}
                size="lg"
              >
                <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-0.5 transition-transform duration-300" />
                SOLICITAR ORÇAMENTO
              </Button>
              <Button variant="outline" size="lg">
                Ver Portfólio
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start lg:justify-start gap-3 sm:gap-4 lg:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                </div>
                <span className="text-xs sm:text-sm text-secondary font-medium">Design Moderno</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                </div>
                <span className="text-xs sm:text-sm text-secondary font-medium">Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                </div>
                <span className="text-xs sm:text-sm text-secondary font-medium">Entrega Rápida</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="code-editor">
              <TypeCode />
            </div>
            <div className="absolute inset-2 pointer-events-none z-10">
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground shadow-lg animate-float">
                HTML5
              </div>
              <div className="absolute top-1/2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                CSS3
              </div>
              <div className="absolute bottom-12 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                JavaScript
              </div>
              <div className="absolute bottom-1/3 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground shadow-lg animate-float" style={{ animationDelay: '3s' }}>
                React
              </div>
              <div className="absolute bottom-2 left-1/4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground shadow-lg animate-float" style={{ animationDelay: '4s' }}>
                Angular
              </div>
              <div className="absolute top-1/3 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-foreground shadow-lg animate-float" style={{ animationDelay: '5s' }}>
                Vue
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
