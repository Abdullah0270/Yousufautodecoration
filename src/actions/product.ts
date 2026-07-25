// "use server";

// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export async function getProducts() {
//   return await prisma.product.findMany({
//     include: {
//       category: true,
//       images: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// }

// /* =========================
//    CREATE PRODUCT
// ========================= */

// export async function createProduct(formData: FormData) {
//   const name = String(formData.get("name") || "").trim();

//   const baseSlug = name
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");

//   let slug = baseSlug;
//   let count = 1;

//   while (await prisma.product.findUnique({ where: { slug } })) {
//     slug = `${baseSlug}-${count}`;
//     count++;
//   }

//   const description = String(
//     formData.get("description") || ""
//   );

//   const price = Number(formData.get("price"));

//   const image = String(
//     formData.get("image") || ""
//   );

//   const video = String(
//     formData.get("video") || ""
//   );

//   const categoryId = Number(
//     formData.get("categoryId")
//   );

//   // Multiple Images
//   const additionalImages = formData
//     .getAll("additionalImages")
//     .map((value) => String(value))
//     .filter(Boolean);

//   await prisma.product.create({
//     data: {
//       name,
//       slug,
//       description,
//       price,
//       image,
//       video: video || null,
//       categoryId,

//       images: {
//         create: additionalImages.map((imageUrl) => ({
//           imageUrl,
//         })),
//       },
//     },
//   });

//   revalidatePath("/admin/products");
//   revalidatePath("/products");

//   // Success message
//   redirect("/admin/products?success=created");
// }

// /* =========================
//    DELETE PRODUCT
// ========================= */

// export async function deleteProduct(id: number) {
//   await prisma.product.delete({
//     where: {
//       id,
//     },
//   });

//   revalidatePath("/admin/products");
//   revalidatePath("/products");

//   // Success message
//   redirect("/admin/products?success=deleted");
// }

// /* =========================
//    UPDATE PRODUCT
// ========================= */

// export async function updateProduct(formData: FormData) {
//   const id = Number(
//     formData.get("id")
//   );

//   const name = String(
//     formData.get("name") || ""
//   ).trim();

//   const baseSlug = name
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");

//   let slug = baseSlug;
//   let count = 1;

//   while (true) {
//     const existing =
//       await prisma.product.findUnique({
//         where: { slug },
//       });

//     if (!existing || existing.id === id) {
//       break;
//     }

//     slug = `${baseSlug}-${count}`;
//     count++;
//   }

//   const video = String(
//     formData.get("video") || ""
//   );

//   await prisma.product.update({
//     where: {
//       id,
//     },

//     data: {
//       name,
//       slug,

//       description: String(
//         formData.get("description") || ""
//       ),

//       price: Number(
//         formData.get("price")
//       ),

//       image: String(
//         formData.get("image") || ""
//       ),

//       video: video || null,

//       categoryId: Number(
//         formData.get("categoryId")
//       ),

//       featured:
//         formData.get("featured") === "on",

//       active:
//         formData.get("active") === "on",
//     },
//   });

//   revalidatePath("/admin/products");
//   revalidatePath("/products");

//   // Success message
//   redirect("/admin/products?success=updated");
// }

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* =========================
   GET PRODUCTS
========================= */

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/* =========================
   CREATE PRODUCT
========================= */

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    throw new Error("Product name is required.");
  }

  const baseSlug =
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || "product";

  let slug = baseSlug;
  let count = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const description = String(
    formData.get("description") || ""
  );

  const price = Number(
    formData.get("price")
  );

  const image = String(
    formData.get("image") || ""
  );

  const video = String(
    formData.get("video") || ""
  );

  const categoryId = Number(
    formData.get("categoryId")
  );

  /* =========================
     MULTIPLE IMAGES
  ========================= */

  const additionalImages = formData
    .getAll("additionalImages")
    .map((value) => String(value))
    .filter(Boolean);

  /* =========================
     CREATE PRODUCT
  ========================= */

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      image,
      video: video || null,
      categoryId,

      images: {
        create: additionalImages.map(
          (imageUrl) => ({
            imageUrl,
          })
        ),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");

  redirect(
    "/admin/products?success=created"
  );
}

/* =========================
   DELETE PRODUCT
========================= */

export async function deleteProduct(
  id: number
) {
  await prisma.product.delete({
    where: {
      id,
    },
  });

  /*
    ProductImage records will automatically
    be deleted because your Prisma relation has:

    onDelete: Cascade
  */

  revalidatePath("/admin/products");
  revalidatePath("/products");

  redirect(
    "/admin/products?success=deleted"
  );
}

/* =========================
   UPDATE PRODUCT
========================= */

export async function updateProduct(
  formData: FormData
) {
  const id = Number(
    formData.get("id")
  );

  if (!id) {
    throw new Error(
      "Product ID is required."
    );
  }

  const name = String(
    formData.get("name") || ""
  ).trim();

  if (!name) {
    throw new Error(
      "Product name is required."
    );
  }

  /* =========================
     GENERATE UNIQUE SLUG
  ========================= */

  const baseSlug =
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || "product";

  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing =
      await prisma.product.findUnique({
        where: {
          slug,
        },
      });

    if (
      !existing ||
      existing.id === id
    ) {
      break;
    }

    slug = `${baseSlug}-${count}`;
    count++;
  }

  /* =========================
     BASIC DATA
  ========================= */

  const description = String(
    formData.get("description") || ""
  );

  const price = Number(
    formData.get("price")
  );

  const image = String(
    formData.get("image") || ""
  );

  const video = String(
    formData.get("video") || ""
  );

  const categoryId = Number(
    formData.get("categoryId")
  );

  const featured =
    formData.get("featured") === "on";

  const active =
    formData.get("active") === "on";

  /* =========================
     EXISTING IMAGES TO KEEP
  ========================= */

  /*
    Edit form se ye IDs aayengi:

    name="existingImageIds"
    value={image.id}

    Jo image IDs form mein hongi,
    woh keep hongi.

    Jo existing image ID nahi hogi,
    woh delete ho jayegi.
  */

  const existingImageIds =
    formData
      .getAll("existingImageIds")
      .map((value) =>
        Number(value)
      )
      .filter(
        (id) => !isNaN(id)
      );

  /* =========================
     NEW IMAGES
  ========================= */

  /*
    New uploaded images ke URLs
    additionalImages ke naam se aayenge.
  */

  const newImages =
    formData
      .getAll("additionalImages")
      .map((value) =>
        String(value)
      )
      .filter(Boolean);

  /* =========================
     UPDATE PRODUCT
  ========================= */

  await prisma.product.update({
    where: {
      id,
    },

    data: {
      name,
      slug,
      description,
      price,
      image,
      video: video || null,
      categoryId,
      featured,
      active,
    },
  });

  /* =========================
     DELETE REMOVED IMAGES
  ========================= */

  await prisma.productImage.deleteMany({
    where: {
      productId: id,

      /*
        Delete all images of this product
        whose IDs are NOT present in
        existingImageIds.
      */

      id: {
        notIn:
          existingImageIds.length > 0
            ? existingImageIds
            : [-1],
      },
    },
  });

  /* =========================
     ADD NEW IMAGES
  ========================= */

  if (newImages.length > 0) {
    await prisma.productImage.createMany({
      data: newImages.map(
        (imageUrl) => ({
          imageUrl,
          productId: id,
        })
      ),
    });
  }

  /* =========================
     REVALIDATE
  ========================= */

  revalidatePath(
    "/admin/products"
  );

  revalidatePath(
    `/admin/products/${id}`
  );

  revalidatePath(
    "/products"
  );

  /* =========================
     SUCCESS
  ========================= */

  redirect(
    "/admin/products?success=updated"
  );
}