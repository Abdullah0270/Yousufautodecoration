// import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import EditProductForm from "@/admin/EditProductForm";

// export default async function EditProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const product = await prisma.product.findUnique({
//     where: {
//       id: Number(id),
//     },

//     // IMPORTANT:
//     // Main product ke saath gallery images bhi fetch hongi
//     include: {
//       images: true,
//     },
//   });

//   if (!product) {
//     notFound();
//   }

//   const categories = await prisma.category.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   const safeProduct = {
//     ...product,
//     price: Number(product.price),

//     // Prisma Decimal / database values ko safe simple object mein convert
//     images: product.images.map((item) => ({
//       id: item.id,
//       imageUrl: item.imageUrl,
//     })),
//   };

//   return (
//     <EditProductForm
//       product={safeProduct}
//       categories={categories}
//     />
//   );
// }

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/admin/EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  // Invalid ID
  if (isNaN(productId)) {
    notFound();
  }

  // Product + Gallery Images
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      category: true,
    },
  });

  // Product not found
  if (!product) {
    notFound();
  }

  // Categories for dropdown
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Convert Prisma Decimal to number
  // and send only required image data
  const safeProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    image: product.image,
    video: product.video,
    categoryId: product.categoryId,
    featured: product.featured,
    active: product.active,

    // Existing gallery images
    images: product.images.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
    })),
  };

  return (
    <EditProductForm
      product={safeProduct}
      categories={categories}
    />
  );
}