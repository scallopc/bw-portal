"use server";

import { cookies } from "next/headers";

import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export type ProjectListItem = {
  id: string;
  projectType: "Sistema" | "Site" | "Landing Page" | "Site com CMS";
  status: "Finalizado" | "Em progresso" | "Pausado" | "Cancelado";
  title: string;
  url: string;
  tags: string[];
  totalValueCents: number;
  paidValueCents: number;
  remainingValueCents: number;
  paymentMethod:
    | "PIX"
    | "Cartão"
    | "Cortesia"
    | "Boleto"
    | "Transferência"
    | "Outro";
  paymentTerms?: string;
  startDate?: string;
  deadline?: string;
  repositoryUrl?: string;
  driveUrl?: string;
  notes?: string;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
};

type ListProjectsResult = {
  ok: true;
  items: ProjectListItem[];
};

export async function listProjects(): Promise<ListProjectsResult> {
  const sessionCookie = (await cookies()).get("bw_admin_session")?.value;

  if (!sessionCookie) {
    throw new Error("Not authenticated");
  }

  const adminAuth = getAdminAuth();
  await adminAuth.verifySessionCookie(sessionCookie, true);

  const db = getAdminDb();
  const snapshot = await db
    .collection("projects")
    .orderBy("updatedAt", "desc")
    .limit(200)
    .get();

  const items = snapshot.docs.map((doc) => doc.data() as ProjectListItem);

  return { ok: true, items };
}
