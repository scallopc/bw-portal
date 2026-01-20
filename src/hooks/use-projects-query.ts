"use client";

import { useQuery } from "@tanstack/react-query";

import { listProjects } from "@/actions/list-projects";

export const projectsQueryKey = () => ["projects", "list"] as const;

export function useProjectsQuery() {
  return useQuery({
    queryKey: projectsQueryKey(),
    queryFn: () => listProjects(),
  });
}
