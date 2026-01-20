"use server";

import { cookies } from "next/headers";

import { getAdminAuth } from "@/lib/firebase-admin";
import { adminLoginSchema } from "./schema";

type CreateAdminSessionResult = {
  ok: true;
};

export async function createAdminSession(input: {
  idToken: string;
}): Promise<CreateAdminSessionResult> {
  const { idToken } = adminLoginSchema.parse(input);

  const adminAuth = getAdminAuth();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  const cookieStore = await cookies();
  cookieStore.set("bw_admin_session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(expiresIn / 1000),
  });

  return { ok: true };
}
