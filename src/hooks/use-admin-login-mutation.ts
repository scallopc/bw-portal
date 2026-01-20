"use client";

import { useMutation } from "@tanstack/react-query";

import { createAdminSession } from "@/actions/admin-login";

export const adminLoginMutationKey = () => ["admin", "login"] as const;

export function useAdminLoginMutation() {
  return useMutation({
    mutationKey: adminLoginMutationKey(),
    mutationFn: ({ idToken }: { idToken: string }) =>
      createAdminSession({ idToken }),
  });
}
