"use server";

import { cookies } from "next/headers";

import { adminLogoutSchema } from "./schema";

type DestroyAdminSessionResult = {
  ok: true;
};

export async function destroyAdminSession(
  input: Record<string, never> = {}
): Promise<DestroyAdminSessionResult> {
  adminLogoutSchema.parse(input);

  const cookieStore = await cookies();
  cookieStore.delete("bw_admin_session");

  return { ok: true };
}
