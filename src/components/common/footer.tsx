"use client";

import { Mail, Phone, Facebook, Instagram, ArrowUp } from "lucide-react";
import Image from "next/image";
import { WhatsAppCTAButton } from "./whatsapp-cta-button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: "Sites Institucionais", href: "#servicos" },
      { name: "Landing Pages", href: "#servicos" },
      { name: "CRMs Personalizados", href: "#servicos" },
      { name: "Automação com IA", href: "#servicos" },
      { name: "Integração WhatsApp", href: "#servicos" }
    ],
    company: [
      { name: "Sobre Nós", href: "#sobre" },
      { name: "Portfólio", href: "#portfolio" },
      { name: "Depoimentos", href: "#testimonials" },
      { name: "Contato", href: "#contato" },
      { name: "Blog", href: "#blog" }
    ],
    support: [
      { name: "Central de Ajuda", href: "#help" },
      { name: "Documentação", href: "#docs" },
      { name: "Suporte Técnico", href: "#support" },
      { name: "Status do Sistema", href: "#status" },
      { name: "Política de Privacidade", href: "#privacy" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* CTA Section */}
        <div className="border-b border-primary-foreground/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oswald font-bold mb-6">
                Pronto para <span className="text-secondary">Transformar</span> sua Ideia?
              </h2>
              <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 font-montserrat">
                Vamos criar juntos o site ou sistema que sua empresa precisa para crescer e se destacar no mercado digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <WhatsAppCTAButton variant="desktop" className="bg-secondary hover:bg-secondary/90 text-primary border-secondary/30" pingColor="bg-primary" iconColor="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <Image
                    src="/logo-gold.svg"
                    alt="BuildWeb"
                    width={180}
                    height={60}
                  />
                </div>
                <p className="text-primary-foreground/80 leading-relaxed text-lg font-montserrat mb-6">
                  Transformamos ideias em sites e sistemas que geram resultados reais.
                  Especialistas em criação de sites profissionais, CRMs personalizados e automações com IA.
                </p>


              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-oswald font-bold text-secondary mb-6">Serviços</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-secondary font-montserrat hover:translate-x-1 transform transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xl font-oswald font-bold text-secondary mb-6">Empresa</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-secondary font-montserrat hover:translate-x-1 transform transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xl font-oswald font-bold text-secondary mb-6">Suporte</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-secondary font-montserrat hover:translate-x-1 transform transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="flex items-center space-x-4 bg-primary-foreground/5 p-4 rounded-xl backdrop-blur-sm border border-primary-foreground/10">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold text-lg">(11) 91226-0094</p>
                  <p className="text-primary-foreground/70 text-sm font-montserrat">Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-primary-foreground/5 p-4 rounded-xl backdrop-blur-sm border border-primary-foreground/10">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold text-lg">contato@buildweb.com</p>
                  <p className="text-primary-foreground/70 text-sm font-montserrat">Resposta em até 2h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">

              {/* Copyright */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-primary-foreground/60">
                <p className="font-montserrat">© {new Date().getFullYear()} BuildWeb. Todos os direitos reservados.</p>
              </div>

              {/* Social Links & Scroll to Top */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300 hover:scale-110 border border-primary-foreground/20"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                <button
                  onClick={scrollToTop}
                  className="w-12 h-12 cursor-pointer bg-secondary text-primary rounded-xl flex items-center justify-center hover:bg-secondary/90 transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Voltar ao topo"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
