"use server";

import { prisma } from "@/lib/prisma";

export async function getHomeData() {
  const settings = await prisma.settings.findFirst();

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
      active: true,
    },
    include: {
      category: true,
    },
    take: 8,
  });

  const latestProducts = await prisma.product.findMany({
    where: {
      active: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return {
    settings,
    categories,
    featuredProducts,
    latestProducts,
  };
}