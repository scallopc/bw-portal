"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { createProject } from "@/actions/create-project";
import { projectsQueryKey } from "./use-projects-query";

export const createProjectMutationKey = () => ["projects", "create"] as const;

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createProjectMutationKey(),
    mutationFn: (formData: FormData) => createProject(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueryKey() });
    },
  });
}
