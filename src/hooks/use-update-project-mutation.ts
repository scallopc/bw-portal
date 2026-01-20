"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "@/actions/update-project";
import { projectsQueryKey } from "./use-projects-query";

export const updateProjectMutationKey = () => ["projects", "update"] as const;

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: updateProjectMutationKey(),
    mutationFn: (formData: FormData) => updateProject(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectsQueryKey() });
    },
  });
}
