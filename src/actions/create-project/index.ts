"use server";

import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { createHash } from "crypto";

import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { createProjectSchema } from "./schema";

type CreateProjectResult = {
  ok: true;
  id: string;
};

export async function createProject(
  formData: FormData,
): Promise<CreateProjectResult> {
  const sessionCookie = (await cookies()).get("bw_admin_session")?.value;

  if (!sessionCookie) {
    throw new Error("Not authenticated");
  }

  const adminAuth = getAdminAuth();
  await adminAuth.verifySessionCookie(sessionCookie, true);

  const projectType = formData.get("projectType");
  const status = formData.get("status");
  const title = formData.get("title");
  const url = formData.get("url");
  const tagsRaw = formData.get("tags");
  const totalValueCentsRaw = formData.get("totalValueCents");
  const paidValueCentsRaw = formData.get("paidValueCents");
  const paymentMethod = formData.get("paymentMethod");
  const paymentTerms = formData.get("paymentTerms");
  const startDate = formData.get("startDate");
  const deadline = formData.get("deadline");
  const repositoryUrl = formData.get("repositoryUrl");
  const driveUrl = formData.get("driveUrl");
  const notes = formData.get("notes");
  const image = formData.get("image");

  if (!(image instanceof File)) {
    throw new Error("Missing image");
  }

  const parsed = createProjectSchema.parse({
    projectType,
    status,
    title,
    url,
    tags: typeof tagsRaw === "string" ? JSON.parse(tagsRaw) : [],
    totalValueCents:
      typeof totalValueCentsRaw === "string"
        ? Number(totalValueCentsRaw)
        : totalValueCentsRaw,
    paidValueCents:
      typeof paidValueCentsRaw === "string"
        ? Number(paidValueCentsRaw)
        : paidValueCentsRaw,
    paymentMethod,
    paymentTerms:
      typeof paymentTerms === "string" && paymentTerms.trim()
        ? paymentTerms
        : undefined,
    startDate:
      typeof startDate === "string" && startDate.trim() ? startDate : undefined,
    deadline:
      typeof deadline === "string" && deadline.trim() ? deadline : undefined,
    repositoryUrl:
      typeof repositoryUrl === "string" && repositoryUrl.trim()
        ? repositoryUrl
        : undefined,
    driveUrl:
      typeof driveUrl === "string" && driveUrl.trim() ? driveUrl : undefined,
    notes: typeof notes === "string" && notes.trim() ? notes : undefined,
  });

  const remainingValueCents = parsed.totalValueCents - parsed.paidValueCents;

  const id = randomUUID();

  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new Error("Missing CLOUDINARY_URL");
  }

  const cloudinary = new URL(cloudinaryUrl);
  const cloudName = cloudinary.hostname;
  const apiKey = cloudinary.username;
  const apiSecret = cloudinary.password;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Invalid CLOUDINARY_URL");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "projects";
  const publicId = id;
  const signatureBase = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(signatureBase).digest("hex");

  const uploadForm = new FormData();
  uploadForm.set("file", image);
  uploadForm.set("api_key", apiKey);
  uploadForm.set("timestamp", String(timestamp));
  uploadForm.set("signature", signature);
  uploadForm.set("folder", folder);
  uploadForm.set("public_id", publicId);
  uploadForm.set("resource_type", "image");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: uploadForm,
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Cloudinary upload failed (${response.status}): ${text}`);
  }

  const uploadResult = (await response.json()) as {
    secure_url?: string;
  };

  const imageUrl = uploadResult.secure_url;
  if (!imageUrl) {
    throw new Error("Cloudinary upload did not return secure_url");
  }

  const db = getAdminDb();
  try {
    // Criar um objeto limpo sem campos undefined
    const projectData = {
      id,
      projectType: parsed.projectType,
      status: parsed.status,
      title: parsed.title,
      url: parsed.url,
      tags: parsed.tags,
      totalValueCents: parsed.totalValueCents,
      paidValueCents: parsed.paidValueCents,
      remainingValueCents,
      paymentMethod: parsed.paymentMethod,
      imageUrl,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      // Incluir campos opcionais apenas se tiverem valor definido
      ...(parsed.paymentTerms !== undefined && {
        paymentTerms: parsed.paymentTerms,
      }),
      ...(parsed.startDate !== undefined && { startDate: parsed.startDate }),
      ...(parsed.deadline !== undefined && { deadline: parsed.deadline }),
      ...(parsed.repositoryUrl !== undefined && {
        repositoryUrl: parsed.repositoryUrl,
      }),
      ...(parsed.driveUrl !== undefined && { driveUrl: parsed.driveUrl }),
      ...(parsed.notes !== undefined && { notes: parsed.notes }),
    };

    await db.collection("projects").doc(id).set(projectData);
  } catch (error) {
    const anyError = error as { code?: number | string; message?: string };
    const code = anyError?.code;
    const message =
      anyError?.message ||
      (error instanceof Error ? error.message : String(error));

    if (code === 5 || String(message).toLowerCase().includes("not_found")) {
      throw new Error(
        "Firestore retornou NOT_FOUND (code 5). Normalmente isso acontece quando o Firestore ainda não foi criado/ativado no projeto Firebase (Console -> Firestore Database -> Criar banco) ou quando as credenciais do Admin SDK apontam para outro projeto.",
      );
    }

    throw error;
  }

  return { ok: true, id };
}
