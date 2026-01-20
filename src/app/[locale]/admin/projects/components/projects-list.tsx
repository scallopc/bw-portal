"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useProjectsQuery } from "@/hooks/use-projects-query";
import { ProjectForm } from "./project-form";
import type { ProjectListItem } from "@/actions/list-projects";

function formatCentsToBRL(cents: number) {
    if (!Number.isFinite(cents)) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(0);
    }
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(cents / 100);
}

function formatDateTime(value: number) {
    if (!Number.isFinite(value)) return "-";
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

type SheetMode =
    | { open: false }
    | { open: true; mode: "create" }
    | { open: true; mode: "edit"; project: ProjectListItem };

export function ProjectsList() {
    const projectsQuery = useProjectsQuery();
    const items = useMemo(() => projectsQuery.data?.items ?? [], [projectsQuery.data?.items]);
    const [sheetState, setSheetState] = useState<SheetMode>({ open: false });

    const metrics = useMemo(() => {
        const total = items.length;
        const inProgress = items.filter((p) => p.status === "Em progresso").length;
        const finished = items.filter((p) => p.status === "Finalizado").length;
        const totalRemaining = items.reduce(
            (acc, p) => acc + (typeof p.remainingValueCents === "number" ? p.remainingValueCents : 0),
            0
        );

        return {
            total,
            inProgress,
            finished,
            totalRemaining,
        };
    }, [items]);

    const isSheetOpen = sheetState.open;

    return (
        <section className="space-y-6">
            <div className="flex items-start justify-end gap-4 flex-wrap">


                <Button
                    type="button"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    onClick={() => setSheetState({ open: true, mode: "create" })}
                >
                    Novo projeto
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-md border border-border/50 bg-card p-4">
                    <p className="text-xs text-card-foreground/80">Total</p>
                    <p className="text-2xl font-semibold text-muted-foreground">{metrics.total}</p>
                </div>
                <div className="rounded-md border border-border/50 bg-card p-4">
                    <p className="text-xs text-card-foreground/80">Em progresso</p>
                    <p className="text-2xl font-semibold text-muted-foreground">{metrics.inProgress}</p>
                </div>
                <div className="rounded-md border border-border/50 bg-card p-4">
                    <p className="text-xs text-card-foreground/80">Finalizados</p>
                    <p className="text-2xl font-semibold text-muted-foreground">{metrics.finished}</p>
                </div>
                <div className="rounded-md border border-border/50 bg-card p-4">
                    <p className="text-xs text-card-foreground/80">Total a receber</p>
                    <p className="text-2xl font-semibold text-muted-foreground">
                        {formatCentsToBRL(metrics.totalRemaining)}
                    </p>
                </div>
            </div>

            <div className="rounded-md border border-border/50 bg-card">

                <div className="p-4">
                    {projectsQuery.isError ? (
                        <div className="text-sm text-destructive">
                            Não foi possível carregar os projetos.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-card-foreground text-base font-semibold">Projeto</TableHead>
                                    <TableHead className="text-card-foreground text-base font-semibold">Tipo</TableHead>
                                    <TableHead className="text-card-foreground text-base font-semibold">Status</TableHead>
                                    <TableHead className="text-card-foreground text-base font-semibold">Restante</TableHead>
                                    <TableHead className="text-card-foreground text-base font-semibold">Atualizado</TableHead>
                                    <TableHead className="text-right text-card-foreground text-base font-semibold">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.length ? (
                                    items.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell>
                                                <div className="max-w-[360px]">
                                                    <p className="text-base font-semibold text-muted-foreground truncate">
                                                        {project.title}
                                                    </p>

                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-card-foreground/90 py-3">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                                    {project.projectType}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'Finalizado'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm font-medium text-muted-foreground/90 py-3">
                                                {formatCentsToBRL(project.remainingValueCents)}
                                            </TableCell>
                                            <TableCell className="text-base text-muted-foreground">
                                                {formatDateTime(project.updatedAt)}
                                            </TableCell>
                                            <TableCell className="py-3">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                        onClick={() => {
                                                            console.log("Visualizar projeto:", project.id);
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">Visualizar</span>
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                        onClick={() =>
                                                            setSheetState({
                                                                open: true,
                                                                mode: "edit",
                                                                project,
                                                            })
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Editar</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Nenhum projeto cadastrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            <Sheet open={isSheetOpen} onOpenChange={(open) => !open && setSheetState({ open: false })}>
                <SheetContent className="sm:max-w-xl">
                    <SheetHeader>
                        <SheetTitle>
                            {sheetState.open && sheetState.mode === "edit"
                                ? "Editar projeto"
                                : "Novo projeto"}
                        </SheetTitle>
                        <SheetDescription>
                            {sheetState.open && sheetState.mode === "edit"
                                ? "Atualize informações e salve as alterações."
                                : "Preencha os dados e salve para adicionar ao portfólio."}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="p-4 pt-0 flex h-auto overflow-auto mb-3">
                        {sheetState.open && sheetState.mode === "edit" ? (
                            <ProjectForm
                                initialData={sheetState.project}
                                onSubmitSuccess={() => setSheetState({ open: false })}
                            />
                        ) : sheetState.open && sheetState.mode === "create" ? (
                            <ProjectForm onSubmitSuccess={() => setSheetState({ open: false })} />
                        ) : null}
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
}