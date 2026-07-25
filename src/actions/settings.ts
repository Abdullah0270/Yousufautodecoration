"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  return await prisma.settings.findFirst();
}

export async function saveSettings(formData: FormData) {
  const data = {
    companyName: String(formData.get("companyName")),
    phone: String(formData.get("phone")),
    whatsapp: String(formData.get("whatsapp")),
    address: String(formData.get("address")),
    facebook: String(formData.get("facebook") || ""),
    instagram: String(formData.get("instagram") || ""),
    youtube: String(formData.get("youtube") || ""),
    logo: String(formData.get("logo") || ""),
    heroImage: String(formData.get("heroImage") || ""),
  };

  await prisma.settings.upsert({
    where: {
      id: 1,
    },
    update: data,
    create: {
      id: 1,
      ...data,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}