// "use server";

// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// export async function getCategories() {
//   return await prisma.category.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// }

// export async function createCategory(formData: FormData) {
//   const name = formData.get("name") as string;
//   const slug = formData.get("slug") as string;

//   if (!name || !slug) {
//     throw new Error("Name and slug are required.");
//   }

//   await prisma.category.create({
//     data: {
//       name,
//       slug,
//     },
//   });

//   revalidatePath("/admin/categories");
// }

// export async function deleteCategory(id: number) {
//   await prisma.category.delete({
//     where: { id },
//   });

//   revalidatePath("/admin/categories");
// }
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Get All Categories
export async function getCategories() {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get Single Category
export async function getCategory(id: number) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

// Create Category
export async function createCategory(formData: FormData) {
  const name = String(formData.get("name"));
  const slug = String(formData.get("slug"));
  const description = String(formData.get("description") || "");
  // const image = String(formData.get("image") || "");

  await prisma.category.create({
    data: {
      name,
      slug,
      description,
      // image,
    },
  });

  revalidatePath("/admin/categories");
}

// Update Category
export async function updateCategory(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name: String(formData.get("name")),
      slug: String(formData.get("slug")),
      description: String(formData.get("description")),
      // image: String(formData.get("image")),
    },
  });

  revalidatePath("/admin/categories");

  redirect("/admin/categories");
}

// Delete Category
export async function deleteCategory(id: number) {
  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categories");
}