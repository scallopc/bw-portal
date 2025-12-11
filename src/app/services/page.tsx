"use client";

import { motion } from "framer-motion";
import { Header, Footer, ChatWidget } from "@/components/common";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const services = [
    {
        id: 1,
        icon: (
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: "Sites Institucionais",
        description: "Criamos sites modernos, responsivos e otimizados para conversão que destacam sua marca na internet.",
        features: [
            "Design responsivo",
            "Otimização para SEO",
            "Integração com redes sociais",
            "Formulário de contato"
        ],
        color: "blue"
    },
    {
        id: 2,
        icon: (
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        title: "Sistemas Personalizados",
        description: "Desenvolvemos CRMs e sistemas sob medida para automatizar e otimizar os processos do seu negócio.",
        features: [
            "Desenvolvimento sob demanda",
            "Integração com outras ferramentas",
            "Painel administrativo",
            "Relatórios personalizados"
        ],
        color: "green"
    },
    {
        id: 3,
        icon: (
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Otimização SEO",
        description: "Melhore o posicionamento do seu site nos mecanismos de busca e atraia mais clientes qualificados.",
        features: [
            "Análise de palavras-chave",
            "Otimização de conteúdo",
            "Link building",
            "Relatórios de desempenho"
        ],
        color: "purple"
    },
    {
        id: 4,
        icon: (
            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        title: "Landing Pages",
        description: "Páginas de conversão otimizadas para capturar leads e impulsionar suas vendas de forma eficiente.",
        features: [
            "Design responsivo e otimizado",
            "Formulários de alta conversão",
            "Integração com ferramentas de CRM",
            "A/B testing integrado"
        ],
        color: "amber"
    },
    {
        id: 5,
        icon: (
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "One Page",
        description: "Sites em página única perfeitos para apresentar seu negócio de forma direta e impactante.",
        features: [
            "Design moderno e limpo",
            "Navegação suave por âncoras",
            "Otimizado para conversão",
            "Carregamento rápido"
        ],
        color: "red"
    },
    {
        id: 6,
        icon: (
            <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "Sites com Blog",
        description: "Sites completos com blog integrado para fortalecer sua autoridade e melhorar o SEO.",
        features: [
            "Sistema de gerenciamento de conteúdo",
            "Otimização para mecanismos de busca",
            "Design responsivo",
            "Integração com redes sociais"
        ],
        color: "cyan"
    }
];

const testimonials = [
    {
        id: 1,
        name: "Ana Silva",
        role: "Diretora de Marketing",
        company: "Empresa X",
        content: "A BuildWeb transformou nossa presença online. Nosso site agora é uma verdadeira máquina de gerar leads!"
    },
    {
        id: 2,
        name: "Carlos Mendes",
        role: "CEO",
        company: "Startup Y",
        content: "O sistema personalizado que desenvolveram automatizou nossos processos e economizou inúmeras horas de trabalho."
    },
    {
        id: 3,
        name: "Mariana Costa",
        role: "Empreendedora",
        company: "Marca Própria",
        content: "A equipe foi incrível em entender minhas necessidades e entregar exatamente o que eu precisava para o meu negócio."
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-background via-background to-primary/5 ">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nossos Serviços</h1>
                        <p className="text-xl text-muted-foreground mb-8">Soluções digitais completas para impulsionar seu negócio para o próximo nível!</p>

                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Como Podemos Ajudar Seu Negócio</h2>
                        <div className="w-20 h-1 bg-secondary mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -5 }}
                                className="bg-background text-foreground rounded-xl shadow-lg overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="p-8">
                                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                                    <p className="text-foreground/90 mb-6">{service.description}</p>

                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <CheckCircle2 className="h-5 w-5 text-secondary mr-2" />
                                                <span className="text-foreground/90">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button variant="outline" className="w-full border-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-secondary-foreground hover:border-secondary">
                                        Saiba mais
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-br from-background to-primary/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground mb-4">O Que Nossos Clientes Dizem</h2>
                        <div className="w-20 h-1 bg-secondary mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-card text-card-foreground p-8 rounded-xl shadow-md border border-border/50"
                            >
                                <div className="text-secondary mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-muted-foreground italic mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-white font-bold text-xl mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


        </main>
    );
}
