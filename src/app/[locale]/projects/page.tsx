"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useProjectsQuery } from "@/hooks/use-projects-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "./components/project-card";

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProjectsPage() {
    const t = useTranslations('projects');
    const projectsQuery = useProjectsQuery();
    const [activeCategory, setActiveCategory] = useState("todos");
    const projects = projectsQuery.data?.items || [];
    const isLoading = projectsQuery.isLoading;

    const categories = [
        {
            id: "todos",
            name: t('filter.all'),
            value: "todos"
        },
        {
            id: "Sistemas",
            name: t('filter.systems'),
            value: "Sistemas"
        },
        {
            id: "Sites",
            name: t('filter.sites'),
            value: "Sites"
        },
        {
            id: "Landing Pages",
            name: t('filter.landingPages'),
            value: "Landing Pages"
        }
    ];

    const filteredProjects = activeCategory === "todos"
        ? projects
        : projects.filter(project => {
            if (activeCategory === "Sites") {
                return project.projectType === "Site" ||
                    project.projectType === "Site com CMS";
            }
            const category = categories.find(c => c.id === activeCategory);
            return category ? project.projectType === category.value : false;
        });

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-80 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

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
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t('title')}</h1>
                        <p className="text-xl text-muted-foreground mb-8">{t('subtitle')}</p>
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
                                type="button"
                                variant={activeCategory === category.id ? "default" : "outline"}
                                className={`rounded-full transition-all ${activeCategory === category.id
                                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                                    : 'border-secondary/30 text-foreground hover:bg-secondary/10 hover:border-secondary/50'
                                    }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                                <span className="ml-2 text-xs bg-secondary-foreground/20 px-2 py-0.5 rounded-full">
                                    {category.id === 'todos'
                                        ? projects.length
                                        : category.id === 'Sites'
                                            ? projects.filter(p =>
                                                p.projectType === "Site" ||
                                                p.projectType === "Site com CMS"
                                            ).length
                                            : projects.filter(p =>
                                                p.projectType === category.value
                                            ).length}
                                </span>
                            </Button>
                        ))}
                    </motion.div>

                    {/* Contador de Projetos */}
                    <div className="text-center mb-8">
                        <p className="text-muted-foreground">
                            {t('filter.description.showing')} <span className="font-semibold text-foreground">{filteredProjects.length}</span>
                            {` ${t('filter.description.of')}`}
                            {activeCategory !== 'todos' && ` em ${categories.find(c => c.id === activeCategory)?.name}`}
                        </p>
                    </div>

                    {/* Grid de Projetos */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
