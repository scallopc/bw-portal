"use client";

import { useMutation } from "@tanstack/react-query";

import { destroyAdminSession } from "@/actions/admin-logout";

export const adminLogoutMutationKey = () => ["admin", "logout"] as const;

export function useAdminLogoutMutation() {
  return useMutation({
    mutationKey: adminLogoutMutationKey(),
    mutationFn: () => destroyAdminSession(),
  });
}
