import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CategorySection() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24 md:py-28">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[140px]" />


      {/* ================= CONTENT ================= */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">


        {/* ================= HEADING ================= */}

        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-xl sm:text-sm">

            <span className="h-2 w-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />

            Browse Collection

          </div>


          <h2 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">

            Shop by{" "}

            <span className="text-orange-500">
              Category
            </span>

          </h2>


          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">

            Explore our premium collection of vehicle decoration
            accessories and discover high-quality products
            designed to make your vehicle stand out.

          </p>

        </div>


        {/* ================= CATEGORIES ================= */}

        {categories.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">

            <Package
              className="mx-auto text-orange-500"
              size={48}
            />

            <h3 className="mt-5 text-2xl font-bold text-white">
              No Categories Available
            </h3>

            <p className="mt-3 text-gray-400">
              Categories will appear here once products are added.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {categories.map((category) => (

              <Link
                key={category.id}
                href={`/products?category=${category.slug.trim().toLowerCase()}`}
                className="group relative block h-[400px] overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-orange-500/10 sm:h-[430px]"
              >

                {/* ================= IMAGE ================= */}

                <img
                  src={category.image || "/card2.jfif"}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />


                {/* ================= DARK OVERLAY ================= */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 transition duration-500 group-hover:via-black/50" />


                {/* ================= ORANGE GLOW ================= */}

                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-transparent opacity-60 transition duration-500 group-hover:opacity-100" />


                {/* ================= TOP BADGE ================= */}

                <div className="absolute left-5 top-5">

                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold text-white backdrop-blur-xl">

                    <span className="h-2 w-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/70" />

                    {category._count.products} Products

                  </div>

                </div>


                {/* ================= ARROW ================= */}

                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-500 group-hover:rotate-45 group-hover:border-orange-500 group-hover:bg-orange-500">

                  <ArrowUpRight size={20} />

                </div>


                {/* ================= CONTENT ================= */}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">

                  {/* Small line */}

                  <div className="mb-4 h-1 w-10 rounded-full bg-orange-500 transition-all duration-500 group-hover:w-20" />


                  <h3 className="text-3xl font-black capitalize text-white sm:text-4xl">

                    {category.name}

                  </h3>


                  <p className="mt-3 line-clamp-2 max-w-md text-sm leading-6 text-gray-300 sm:text-base">

                    {category.description ||
                      "Premium quality vehicle decoration accessories designed for style, durability and performance."}

                  </p>


                  {/* Explore */}

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-400 transition-all duration-300 group-hover:gap-4">

                    Explore Collection

                    <ArrowUpRight size={17} />

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}


        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-12 text-center sm:mt-16">

          <Link
            href="/products"
            className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/20"
          >

            View All Products

            <ArrowUpRight size={18} />

          </Link>

        </div>

      </div>

    </section>
  );
}