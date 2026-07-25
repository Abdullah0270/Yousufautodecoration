import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
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

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-14 text-center">
          <p className="font-semibold uppercase tracking-[4px] text-orange-500">
            Best Collection
          </p>

          <h2 className="mt-3 text-5xl font-extrabold text-gray-900">
            Featured Products
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Explore our most popular auto decoration products.
          </p>
        </div>

        {/* Products */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: Number(product.price),
              }}
            />
          ))}
        </div>

        {/* View All */}

        <div className="mt-14 text-center">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}