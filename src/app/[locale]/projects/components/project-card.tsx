import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string;
    projectType: string;
    imageUrl: string;
    tags: string[];
    url?: string;
}

export const ProjectCard = ({ project }: { project: Project }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const springY = useSpring(0, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        // Posição do mouse relativa ao container (0 a 1)
        const mouseY = (e.clientY - rect.top) / rect.height;

        // Ajuste a intensidade do movimento (quanto maior, mais a imagem se move)
        const maxOffset = 20; // Ajuste conforme necessário

        // Invertemos o cálculo para que a imagem role na mesma direção do mouse
        const newY = (mouseY - 0.5) * maxOffset * 2;

        springY.set(newY);
    };

    const handleMouseLeave = () => {
        springY.set(0);
    };

    return (

        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-card text-card-foreground rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group min-h-[360px]"
        >
            <motion.div
                className="absolute inset-0 bg-cover bg-top transition-[background-position] duration-[22800ms] ease-out will-change-[background-position] group-hover:bg-bottom"
                style={{
                    backgroundImage: `url(${project.imageUrl})`,
                    y: springY,
                    height: '120%',
                    top: '-10%'
                }}

                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />

            <div className="absolute w-full z-10 py-3 px-3">
                <div className="flex justify-between gap-2">
                    <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                        {project.projectType}
                    </span>
                    {project?.url && (
                        <a className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full" href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="inline-block" size={16} />
                        </a>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="relative px-4 pb-4 pt-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    <div className="absolute inset-0 backdrop-blur-md" />
                    <div className="relative flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs bg-background/30 text-foreground/90 px-3 py-1 rounded-full border border-border/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

    );
};
