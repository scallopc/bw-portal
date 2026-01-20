import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Filter, Search } from "lucide-react";

type AdminKpi = {
    title: string;
    value: string;
    subtitle: string;
};

export default function AdminPage() {
    const kpis: AdminKpi[] = [
        {
            title: "Leads (7d)",
            value: "28",
            subtitle: "Simulação de dados",
        },
        {
            title: "Orçamentos",
            value: "12",
            subtitle: "Aguardando integração",
        },
        {
            title: "Projetos",
            value: "6",
            subtitle: "Portfolio atual",
        },
        {
            title: "Conversões",
            value: "4,1%",
            subtitle: "Meta semanal",
        },
    ];

    const rows = [
        {
            name: "E-commerce Completo",
            status: "Publicado",
            updatedAt: "Hoje",
        },
        {
            name: "Site Institucional",
            status: "Rascunho",
            updatedAt: "Ontem",
        },
        {
            name: "Landing Page",
            status: "Publicado",
            updatedAt: "3 dias",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Visão geral do painel.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-border/50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                    </Button>
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        Relatório
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi) => (
                    <div
                        key={kpi.title}
                        className="bg-card text-card-foreground rounded-md shadow-md p-5"
                    >
                        <div className="text-sm text-card-foreground/70">{kpi.title}</div>
                        <div className="mt-2 text-3xl font-bold">{kpi.value}</div>
                        <div className="mt-2 text-xs text-card-foreground/70">
                            {kpi.subtitle}
                        </div>
                    </div>
                ))}
            </section>

            <section className="bg-card text-card-foreground rounded-md shadow-md">
                <div className="p-5 border-b border-border/50">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Conteúdo recente</h2>
                            <p className="text-sm text-card-foreground/70">
                                Lista inicial para depois conectar no Firebase.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar"
                                    className="pl-9 border-border/50 text-secondary"
                                />
                            </div>
                            <Button variant="outline" className="border-border/50">
                                Exportar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-border/50">
                    {rows.map((row) => (
                        <div
                            key={row.name}
                            className="p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between hover:bg-background/40 transition-colors"
                        >
                            <div className="min-w-0">
                                <div className="font-semibold truncate">{row.name}</div>
                                <div className="text-sm text-card-foreground/70">
                                    Atualizado: {row.updatedAt}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs rounded-full bg-secondary text-secondary-foreground px-3 py-1">
                                    {row.status}
                                </span>
                                <Button variant="outline" className="border-border/50">
                                    Ver
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
