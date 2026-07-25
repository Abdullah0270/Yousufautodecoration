import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/website/ProductCard";
import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{
        category?: string;
        search?: string;
    }>;
}) {
    const { category, search } = await searchParams;

    const categoryFilter = category?.trim().toLowerCase();

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const products = await prisma.product.findMany({
        where: {
            active: true,

            ...(categoryFilter
                ? {
                    category: {
                        slug: {
                            equals: categoryFilter,
                            mode: "insensitive",
                        },
                    },
                }
                : {}),

            ...(search
                ? {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }
                : {}),
        },

        include: {
            category: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <>
        <Navbar/>
        <main className="min-h-screen bg-gradient-to-b from-[#0b0b0b] via-[#111111] to-[#f8f8f8]">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="rounded-3xl bg-gradient-to-r from-black via-zinc-900 to-black px-10 py-16 text-center text-white shadow-2xl">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[5px] text-orange-500">
                        Premium Collection
                    </p>

                    <h1 className="text-5xl font-extrabold lg:text-6xl">
                        Our Products
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                        Discover premium Pakistani truck art, LED lights,
                        mirrors, stainless steel accessories and decorative
                        products crafted with perfection.
                    </p>

                </div>
                {/* Search */}

                <div className="mx-auto mt-14 max-w-xl">

                    <form method="GET">

                        {category && (
                            <input
                                type="hidden"
                                name="category"
                                value={category}
                            />
                        )}

                        <input
                            type="text"
                            name="search"
                            defaultValue={search}
                            placeholder="Search Products..."
                            className="w-full rounded-full border border-orange-200 bg-black px-6 py-4 text-lg shadow-xl outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                        />

                    </form>

                </div>
                {/* Categories */}

                <div className="mt-12 flex flex-wrap justify-center gap-4">

                    <Link
                        href="/products"
                        className={`rounded-full px-7 py-3 font-semibold transition-all duration-300 ${!category
                                ? "bg-orange-800 text-white shadow-xl"
                                : "bg-black shadow hover:bg-orange-300"
                            }`}
                    >
                        All Products
                    </Link>

                    {categories.map((item) => (

                        <Link
                            key={item.id}
                            href={`/products?category=${item.slug}`}
                            className={`rounded-full px-7 py-3 font-semibold transition-all duration-300 ${category === item.slug
                                    ? "bg-orange-500 text-black shadow-xl"
                                    : "bg-black shadow hover:bg-orange-300"
                                }`}
                        >

                            {item.name}

                        </Link>

                    ))}

                </div>

                <div className="mt-16 mb-8 flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-white-900">
                        Products
                    </h2>

                    <div className="rounded-full bg-orange-500 px-6 py-2 text-white font-bold shadow-lg">
                        {products.length} Products
                    </div>

                </div>
                {/* Products */}

                {products.length === 0 ? (
                    <div className="rounded-3xl bg-white p-24 text-center shadow-2xl">

                        <h2 className="text-4xl font-bold">
                            No Products Found
                        </h2>

                        <p className="mt-5 text-lg text-gray-500">
                            Try another category or search keyword.
                        </p>

                    </div>
                ) : (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                )}

            </div>
        </main>
        <Footer/>
        </>
    );
              

}