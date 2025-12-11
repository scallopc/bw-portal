"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type Project = {
    id: number;
    title: string;
    description: string;
    category: string;
    categoryId: string;
    image: string;
    tags: string[];
    link: string;
    client?: string;
    date: string;
    repoUrl?: string;
};

const projects: Project[] = [
    {
        id: 1,
        title: "E-commerce Completo",
        description: "Plataforma de e-commerce com carrinho de compras, pagamentos e painel administrativo.",
        category: "Sistemas",
        categoryId: "sistemas",
        image: "/images/projects/ecommerce.jpg",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "#",
        client: "Moda & Estilo LTDA",
        date: "Novembro 2023",
        repoUrl: "https://github.com"
    },
    {
        id: 2,
        title: "Site Institucional",
        description: "Site moderno e responsivo para empresa de tecnologia com blog integrado.",
        category: "Websites",
        categoryId: "websites",
        image: "/images/projects/institucional.jpg",
        tags: ["Next.js", "Tailwind CSS", "Contentful"],
        link: "#",
        client: "TechSolutions Inc.",
        date: "Setembro 2023"
    },
    {
        id: 3,
        title: "Aplicativo de Delivery",
        description: "Aplicativo mobile para pedidos de comida com rastreamento em tempo real.",
        category: "Mobile",
        categoryId: "mobile",
        image: "/images/projects/delivery.jpg",
        tags: ["React Native", "Firebase", "Redux"],
        link: "#",
        client: "FoodExpress",
        date: "Julho 2023",
        repoUrl: "https://github.com"
    },
    {
        id: 4,
        title: "Landing Page de Alta Conversão",
        description: "Página de vendas otimizada para campanhas de marketing digital.",
        category: "Landing Pages",
        categoryId: "landing-pages",
        image: "/images/projects/landing.jpg",
        tags: ["HTML5", "CSS3", "JavaScript"],
        link: "#",
        client: "Startup X",
        date: "Maio 2023"
    },
    {
        id: 5,
        title: "Sistema de Agendamento",
        description: "Plataforma para agendamento de serviços com integração de calendário.",
        category: "Sistemas",
        categoryId: "sistemas",
        image: "/images/projects/agendamento.jpg",
        tags: ["Vue.js", "Node.js", "MongoDB"],
        link: "#",
        client: "Clínica Saúde Total",
        date: "Março 2023",
        repoUrl: "https://github.com"
    },
    {
        id: 6,
        title: "Blog Corporativo",
        description: "Blog institucional com sistema de gerenciamento de conteúdo.",
        category: "Websites",
        categoryId: "websites",
        image: "/images/projects/blog.jpg",
        tags: ["Next.js", "Tailwind CSS", "Strapi"],
        link: "#",
        client: "Agência Digital",
        date: "Janeiro 2023"
    }
];

const categories = [
    { id: "todos", name: "Todos" },
    { id: "sistemas", name: "Sistemas" },
    { id: "websites", name: "Websites" },
    { id: "mobile", name: "Mobile" },
    { id: "landing-pages", name: "Landing Pages" }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("todos");

    const filteredProjects = activeCategory === "todos"
        ? projects
        : projects.filter(project => project.categoryId === activeCategory);

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-background via-background to-primary/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Nossos Projetos</h1>
                        <p className="text-xl text-muted-foreground mb-8">Conheça alguns dos trabalhos que realizamos para nossos clientes</p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    {/* Filtros */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                className={`rounded-full transition-all ${activeCategory === category.id ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'border-secondary/30 text-foreground hover:bg-secondary/10 hover:border-secondary/50'}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                                {activeCategory === category.id && (
                                    <span className="ml-2 text-xs bg-secondary-foreground/20 px-2 py-0.5 rounded-full">
                                        {category.id === 'todos'
                                            ? projects.length
                                            : projects.filter(p => p.categoryId === category.id).length}
                                    </span>
                                )}
                            </Button>
                        ))}
                    </motion.div>

                    {/* Contador de Projetos */}
                    <div className="text-center mb-8">
                        <p className="text-muted-foreground">
                            Mostrando <span className="font-semibold text-foreground">{filteredProjects.length}</span>
                            {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
                            {activeCategory !== 'todos' && ` em ${categories.find(c => c.id === activeCategory)?.name}`}
                        </p>
                    </div>

                    {/* Grid de Projetos */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                            key={activeCategory}
                        >
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={item}
                                    className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="h-48 bg-gradient-to-r from-secondary/10 to-primary/5 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                                        <div className="absolute bottom-0 left-0 p-4 z-20">
                                            <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            <span>Prévia do Projeto</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-foreground mb-1">{project.title}</h3>
                                            {project.client && (
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Cliente: <span className="text-foreground">{project.client}</span>
                                                </p>
                                            )}
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Concluído em: <span className="text-foreground">{project.date}</span>
                                            </p>
                                        </div>

                                        <p className="text-foreground/90 mb-6 flex-grow">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-background text-foreground/80 px-3 py-1 rounded-full border border-border/50"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-3 mt-auto">
                                            <Button
                                                variant="outline"
                                                className="flex-1 border-secondary text-foreground hover:bg-secondary/10 hover:border-secondary/80 flex items-center justify-center gap-2"
                                                onClick={() => window.open(project.link, '_blank')}
                                            >
                                                Ver Projeto
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                            {project.repoUrl && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-foreground/60 hover:text-foreground hover:bg-secondary/10"
                                                    onClick={() => window.open(project.repoUrl, '_blank')}
                                                    title="Ver código fonte"
                                                >
                                                    <Github className="h-5 w-5" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
