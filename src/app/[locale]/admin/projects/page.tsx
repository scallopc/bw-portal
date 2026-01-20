import { ProjectsList } from "./components/projects-list";

export default function AdminProjectsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Projetos</h1>

            </div>

            <ProjectsList />
        </div>
    );
}
