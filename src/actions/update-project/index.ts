"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";

import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { updateProjectSchema } from "./schema";

type UpdateProjectResult = {
  ok: true;
};

export async function updateProject(
  formData: FormData
): Promise<UpdateProjectResult> {
  const sessionCookie = (await cookies()).get("bw_admin_session")?.value;

  if (!sessionCookie) {
    throw new Error("Not authenticated");
  }

  const adminAuth = getAdminAuth();
  await adminAuth.verifySessionCookie(sessionCookie, true);

  const id = formData.get("id");
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

  const parsed = updateProjectSchema.parse({
    id,
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

  let imageUrl: string | undefined;
  if (image instanceof File) {
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
    const publicId = parsed.id;
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
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Cloudinary upload failed (${response.status}): ${text}`);
    }

    const uploadResult = (await response.json()) as { secure_url?: string };
    imageUrl = uploadResult.secure_url;

    if (!imageUrl) {
      throw new Error("Cloudinary upload did not return secure_url");
    }
  }

  const db = getAdminDb();

  // Criar um objeto com os campos a serem atualizados
  const updateData: Record<string, unknown> = {
    projectType: parsed.projectType,
    status: parsed.status,
    title: parsed.title,
    url: parsed.url,
    tags: parsed.tags,
    totalValueCents: parsed.totalValueCents,
    paidValueCents: parsed.paidValueCents,
    remainingValueCents,
    paymentMethod: parsed.paymentMethod,
    updatedAt: Date.now(),
  };

  // Adicionar campos opcionais apenas se estiverem definidos
  if (parsed.paymentTerms !== undefined)
    updateData.paymentTerms = parsed.paymentTerms;
  if (parsed.startDate !== undefined) updateData.startDate = parsed.startDate;
  if (parsed.deadline !== undefined) updateData.deadline = parsed.deadline;
  if (parsed.repositoryUrl !== undefined)
    updateData.repositoryUrl = parsed.repositoryUrl;
  if (parsed.driveUrl !== undefined) updateData.driveUrl = parsed.driveUrl;
  if (parsed.notes !== undefined) updateData.notes = parsed.notes;
  if (imageUrl) updateData.imageUrl = imageUrl;

  await db.collection("projects").doc(parsed.id).update(updateData);

  return { ok: true };
}
