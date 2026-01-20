"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Image from "next/image";
import { X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProjectMutation } from "@/hooks/use-create-project-mutation";
import { useUpdateProjectMutation } from "@/hooks/use-update-project-mutation";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    PROJECT_TYPE_OPTIONS,
    TECHNOLOGY_OPTIONS,
    type ProjectTypeOption,
    type TechnologyOption,
} from "../constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
    "Finalizado",
    "Em progresso",
    "Pausado",
    "Cancelado",
] as const;

const PAYMENT_METHOD_OPTIONS = [
    "PIX",
    "Cartão",
    "Cortesia",
    "Boleto",
    "Transferência",
    "Outro",
] as const;

function parseCurrencyToCents(raw: string) {
    const sanitized = raw
        .trim()
        .replace(/\s/g, "")
        .replace(/R\$/gi, "")
        .replace(/\./g, "")
        .replace(/,/g, ".");

    const value = Number(sanitized);
    if (!Number.isFinite(value) || value < 0) return null;
    return Math.round(value * 100);
}

function formatCentsToBRL(cents: number) {
    const value = cents / 100;
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

const createProjectSchema = () =>
    z.object({
        projectType: z.string().min(1, "Campo obrigatório"),
        status: z.string().min(1, "Campo obrigatório"),
        title: z.string().min(1, "Campo obrigatório"),
        url: z.string().optional(),
        tags: z.array(z.string()).min(1, "Selecione pelo menos uma tecnologia"),
        totalValue: z.string().min(1, "Campo obrigatório"),
        paidValue: z.string().min(1, "Campo obrigatório"),
        paymentMethod: z.string().min(1, "Campo obrigatório"),
        paymentTerms: z.string().optional(),
        startDate: z.string().optional(),
        deadline: z.string().optional(),
        repositoryUrl: z.string().optional(),
        driveUrl: z.string().optional(),
        notes: z.string().optional(),
    }).superRefine((data, ctx) => {
        const total = parseCurrencyToCents(data.totalValue);
        const paid = parseCurrencyToCents(data.paidValue);

        if (total === null) {
            ctx.addIssue({
                code: "custom",
                path: ["totalValue"],
                message: "Informe um valor total válido.",
            });
        }

        if (paid === null) {
            ctx.addIssue({
                code: "custom",
                path: ["paidValue"],
                message: "Informe um valor pago válido.",
            });
        }

        if (total !== null && paid !== null && paid > total) {
            ctx.addIssue({
                code: "custom",
                path: ["paidValue"],
                message: "O valor pago não pode ser maior que o valor total.",
            });
        }
    });

type ProjectFormData = z.infer<ReturnType<typeof createProjectSchema>>;

async function convertImageToWebp(file: File): Promise<File> {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.9)
    );

    if (!blob) throw new Error("Failed to convert image");

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}

type ProjectFormProps = {
    initialData?: {
        id: string;
        projectType: ProjectTypeOption;
        status: (typeof STATUS_OPTIONS)[number];
        title: string;
        url: string;
        tags: string[];
        totalValueCents: number;
        paidValueCents: number;
        paymentMethod: (typeof PAYMENT_METHOD_OPTIONS)[number];
        paymentTerms?: string;
        startDate?: string;
        deadline?: string;
        repositoryUrl?: string;
        driveUrl?: string;
        notes?: string;
    };
    onSubmitSuccess?: () => void;
};

export function ProjectForm({ initialData, onSubmitSuccess }: ProjectFormProps) {
    const schema = useMemo(() => createProjectSchema(), []);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            projectType: initialData?.projectType ?? "Site",
            status: initialData?.status ?? "Em progresso",
            title: initialData?.title ?? "",
            url: initialData?.url ?? "",
            tags: initialData?.tags ?? [],
            totalValue: initialData ? formatCentsToBRL(initialData.totalValueCents) : "",
            paidValue: initialData ? formatCentsToBRL(initialData.paidValueCents) : "",
            paymentMethod: initialData?.paymentMethod ?? "PIX",
            paymentTerms: initialData?.paymentTerms,
            startDate: initialData?.startDate || format(new Date(), "yyyy-MM-dd"),
            deadline: initialData?.deadline || format(addDays(new Date(), 7), "yyyy-MM-dd"),
            repositoryUrl: initialData?.repositoryUrl,
            driveUrl: initialData?.driveUrl,
            notes: initialData?.notes,
        },
    });

    const projectType = watch("projectType");
    const tags = watch("tags");
    const totalValue = watch("totalValue");
    const paidValue = watch("paidValue");

    const totalValueCents = parseCurrencyToCents(totalValue) ?? 0;
    const paidValueCents = parseCurrencyToCents(paidValue) ?? 0;
    const remainingValueCents = Math.max(0, totalValueCents - paidValueCents);
    const createProjectMutation = useCreateProjectMutation();
    const updateProjectMutation = useUpdateProjectMutation();
    const [selectedTech, setSelectedTech] = useState<TechnologyOption | "">("");
    const [webpFile, setWebpFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const paymentMethod = watch("paymentMethod");
    const [startDate, setStartDate] = useState<Date | undefined>(
        initialData?.startDate ? new Date(initialData.startDate) : new Date()
    );
    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(
        initialData?.deadline ? new Date(initialData.deadline) : addDays(new Date(), 7)
    );

    // Adicione este efeito para sincronizar as datas do formulário com os estados locais
    useEffect(() => {
        if (startDate) {
            setValue("startDate", format(startDate, "yyyy-MM-dd"), { shouldValidate: true });
        }
    }, [startDate, setValue]);
    useEffect(() => {
        if (deadlineDate) {
            setValue("deadline", format(deadlineDate, "yyyy-MM-dd"), { shouldValidate: true });
        }
    }, [deadlineDate, setValue]);

    // Efeito para tratar mudanças no método de pagamento
    useEffect(() => {
        if (paymentMethod === "Cortesia") {
            setValue("totalValue", "0,00", { shouldValidate: true });
            setValue("paidValue", "0,00", { shouldValidate: true });
        } else {
            // Se estava em "Cortesia" e mudou para outro método, limpa os campos
            if (getValues("totalValue") === "0,00") {
                setValue("totalValue", "", { shouldValidate: true });
            }
            if (getValues("paidValue") === "0,00") {
                setValue("paidValue", "", { shouldValidate: true });
            }
        }
    }, [paymentMethod, setValue, getValues]);

    const handleAddTech = (tech: TechnologyOption) => {
        if (tags.includes(tech)) return;
        setValue("tags", [...tags, tech], { shouldValidate: true });
    };

    const handleRemoveTech = (value: string) => {
        setValue(
            "tags",
            tags.filter((t) => t !== value),
            { shouldValidate: true }
        );
    };

    const handleImageChange = async (file: File | null) => {
        if (!file) {
            setWebpFile(null);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
            return;
        }

        try {
            const converted = await convertImageToWebp(file);
            setWebpFile(converted);

            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(converted));

            toast.success("Imagem convertida para WEBP.");
        } catch (error) {
            console.error(error);
            toast.error("Não foi possível converter a imagem.");
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        if (!initialData && !webpFile) {
            toast.error("Selecione uma imagem.");
            return;
        }

        const totalValueCentsParsed = parseCurrencyToCents(data.totalValue);
        const paidValueCentsParsed = parseCurrencyToCents(data.paidValue);

        if (totalValueCentsParsed === null || paidValueCentsParsed === null) {
            toast.error("Preencha os valores corretamente.");
            return;
        }

        try {
            const formData = new FormData();
            if (initialData) formData.set("id", initialData.id);
            formData.set("projectType", data.projectType);
            formData.set("status", data.status);
            formData.set("title", data.title);
            formData.set("url", data.url);
            formData.set("tags", JSON.stringify(data.tags));
            formData.set("totalValueCents", String(totalValueCentsParsed));
            formData.set("paidValueCents", String(paidValueCentsParsed));
            formData.set("paymentMethod", data.paymentMethod);

            // Tratamento para campos opcionais
            const optionalFields = [
                'paymentTerms',
                'startDate',
                'deadline',
                'repositoryUrl',
                'driveUrl',
                'notes'
            ] as const;

            optionalFields.forEach(field => {
                const value = data[field];
                if (value !== undefined && value !== null && value !== '') {
                    formData.set(field, String(value));
                }
            });

            if (webpFile) formData.set("image", webpFile);

            if (initialData) {
                await updateProjectMutation.mutateAsync(formData);
            } else {
                await createProjectMutation.mutateAsync(formData);
            }

            if (!initialData) {
                const defaultValues = {
                    projectType: "Site" as const,
                    status: "Em progresso" as const,
                    title: "",
                    url: "",
                    tags: [],
                    totalValue: "",
                    paidValue: "",
                    paymentMethod: "PIX" as const,
                    // Campos opcionais não são incluídos no reset para evitar undefined
                };
                reset(defaultValues);
            }
            setWebpFile(null);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);

            toast.success("Projeto salvo com sucesso.");
            onSubmitSuccess?.();
        } catch (error) {
            console.error(error);
            const message = error instanceof Error ? error.message : undefined;
            toast.error(message || "Não foi possível salvar o projeto.");
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-6 mb-3">
            <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Tipo <span className="text-destructive">*</span></label>
                    <Select
                        value={projectType}
                        onValueChange={(v) =>
                            setValue("projectType", v as ProjectTypeOption, {
                                shouldValidate: true,
                            })
                        }
                    >
                        <SelectTrigger className={`w-full border-border/50 text-foreground ${errors.projectType ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            {PROJECT_TYPE_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="title">
                        Título <span className="text-destructive">*</span>
                    </label>
                    <Input
                        id="title"
                        placeholder="Ex: Site Institucional"
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.title ? "border-destructive" : ""}`}
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Tecnologias <span className="text-destructive">*</span></label>
                    <div className="flex items-end gap-3">
                        <Select
                            value={selectedTech}
                            onValueChange={(v) => {
                                const tech = v as TechnologyOption;
                                handleAddTech(tech);
                                setSelectedTech("");
                            }}
                        >
                            <SelectTrigger className={`w-full border-border/50 text-foreground ${errors.tags ? "border-destructive" : ""}`}>
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                {TECHNOLOGY_OPTIONS.map((opt) => (
                                    <SelectItem key={opt} value={opt}>
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {errors.tags && (
                        <p className="text-sm text-destructive">{errors.tags.message}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    {projectType}
                </span>
                {tags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => handleRemoveTech(tag)}
                        className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full inline-flex items-center gap-2"
                    >
                        <span>{tag}</span>
                        <X className="h-3 w-3" />
                    </button>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="url">
                        URL
                    </label>
                    <Input
                        id="url"
                        placeholder="https://..."
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.url ? "border-destructive" : ""}`}
                        {...register("url")}
                    />

                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Status <span className="text-destructive">*</span></label>
                    <Select
                        value={watch("status")}
                        onValueChange={(v) =>
                            setValue("status", v as ProjectFormData["status"], {
                                shouldValidate: true,
                            })
                        }
                    >
                        <SelectTrigger className={`w-full border-border/50 text-foreground ${errors.status ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.status && (
                        <p className="text-sm text-destructive">{errors.status.message}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Valor total <span className="text-destructive">*</span></label>
                    <Input
                        placeholder="Ex: 1.560,00"
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.totalValue ? "border-destructive" : ""}`}
                        disabled={watch("paymentMethod") === "Cortesia"}
                        {...register("totalValue", {
                            onBlur: (e) => {
                                if (watch("paymentMethod") !== "Cortesia") {
                                    const cents = parseCurrencyToCents(e.target.value);
                                    if (cents !== null) {
                                        setValue("totalValue", formatCentsToBRL(cents), {
                                            shouldValidate: true,
                                        });
                                    }
                                }
                            },
                        })}
                    />
                    {errors.totalValue && (
                        <p className="text-sm text-destructive"> {errors.totalValue.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Valor pago <span className="text-destructive">*</span></label>
                    <Input
                        placeholder="Ex: 500,00"
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.paidValue ? "border-destructive" : ""}`}
                        disabled={watch("paymentMethod") === "Cortesia"}
                        {...register("paidValue", {
                            onBlur: (e) => {
                                if (watch("paymentMethod") !== "Cortesia") {
                                    const cents = parseCurrencyToCents(e.target.value);
                                    if (cents !== null) {
                                        setValue("paidValue", formatCentsToBRL(cents), {
                                            shouldValidate: true,
                                        });
                                    }
                                }
                            },
                        })}
                    />
                    {errors.paidValue && (
                        <p className="text-sm text-destructive">  {errors.paidValue.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Restante</label>
                    <Input
                        value={formatCentsToBRL(remainingValueCents)}
                        className="border-border/50 text-foreground"
                        disabled
                    />
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Método de pagamento <span className="text-destructive">*</span></label>
                    <Select
                        value={watch("paymentMethod")}
                        onValueChange={(v) =>
                            setValue("paymentMethod", v as ProjectFormData["paymentMethod"], {
                                shouldValidate: true,
                            })
                        }
                    >
                        <SelectTrigger className={`w-full border-border/50 text-foreground ${errors.paymentMethod ? "border-destructive" : ""}`}>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            {PAYMENT_METHOD_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.paymentMethod && (
                        <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-card-foreground" htmlFor="paymentTerms">
                        Condições
                    </label>
                    <Input
                        id="paymentTerms"
                        placeholder="Ex: 50% entrada + 50% na entrega"
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.paymentTerms ? "border-destructive" : ""}`}
                        {...register("paymentTerms")}
                    />
                    {errors.paymentTerms && (
                        <p className="text-sm text-destructive">{errors.paymentTerms.message}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-1">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="image">
                        Imagem (será convertida para WEBP)
                    </label>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="border-border/50 text-foreground placeholder:text-muted-foreground/60"
                        onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                    />
                    <p className="text-xs text-card-foreground/70">O arquivo final será salvo como .webp.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Preview</label>
                    <div className="relative w-full aspect-video overflow-hidden rounded-md bg-background/40 border border-border/50">
                        {previewUrl ? (
                            <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                                Nenhuma imagem selecionada
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="startDate">
                        Início
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative">
                                <Input
                                    readOnly
                                    className={cn(
                                        "w-full cursor-pointer border-border/50 text-foreground placeholder:text-muted-foreground/60",
                                        "flex h-10 items-center px-3 py-2 text-sm",
                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    )}
                                    placeholder="Selecione uma data"
                                    value={startDate ? format(startDate, "PPP", { locale: ptBR }) : ""}
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                locale={ptBR}
                            />
                        </PopoverContent>
                    </Popover>
                    <input
                        type="hidden"
                        {...register("startDate")}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="deadline">
                        Prazo
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative">
                                <Input
                                    readOnly
                                    className={cn(
                                        "w-full cursor-pointer border-border/50 text-foreground placeholder:text-muted-foreground/60",
                                        "flex h-10 items-center px-3 py-2 text-sm",
                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    )}
                                    placeholder="Selecione uma data"
                                    value={deadlineDate ? format(deadlineDate, "PPP", { locale: ptBR }) : ""}
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={deadlineDate}
                                onSelect={setDeadlineDate}
                                initialFocus
                                locale={ptBR}
                                fromDate={startDate || new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                    <input
                        type="hidden"
                        {...register("deadline")}
                    />
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="repositoryUrl">
                        Repositório
                    </label>
                    <Input
                        id="repositoryUrl"
                        placeholder="https://github.com/..."
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.repositoryUrl ? "border-destructive" : ""}`}
                        {...register("repositoryUrl")}
                    />

                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground" htmlFor="driveUrl">
                        Drive
                    </label>
                    <Input
                        id="driveUrl"
                        placeholder="https://drive.google.com/..."
                        className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.driveUrl ? "border-destructive" : ""}`}
                        {...register("driveUrl")}
                    />

                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="notes">
                    Observações
                </label>
                <Textarea
                    id="notes"
                    placeholder="Escopo, pendências, próximos passos..."
                    className={`border-border/50 text-foreground placeholder:text-muted-foreground/60 ${errors.notes ? "border-destructive" : ""}`}
                    {...register("notes")}
                />
                {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={
                        isSubmitting ||
                        createProjectMutation.isPending ||
                        updateProjectMutation.isPending
                    }
                >
                    Salvar projeto
                </Button>
            </div>
        </form>
    );
}
