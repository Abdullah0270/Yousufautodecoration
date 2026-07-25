// import Link from "next/link";
// import { prisma } from "@/lib/prisma";
// import { Button } from "@/components/ui/button";

// export default async function Hero() {
//   const settings = await prisma.settings.findFirst();

//   return (
//     <section className="relative flex min-h-screen w-full overflow-x-hidden overflow-y-hidden bg-black pt-20 md:pt-0">
//           {/* Background Image */}
//       <img
//         src="/hero.jfif"
//         alt={settings?.companyName || "Hero"}
//         className="absolute inset-0 h-full w-full object-cover opacity-40"
//       />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />

//       {/* Content */}
//       <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
//         <div className="max-w-3xl">
//           <span className="rounded-full bg-orange-500/20 px-3 py-2 text-xs font-semibold uppercase tracking-[2px] text-orange-400 md:px-4 md:text-sm md:tracking-[3px]">
//             Premium Auto Decoration
//           </span>

//           <h1 className="mt-5 text-4xl font-extrabold leading-tight break-words text-white sm:text-5xl md:mt-6 md:text-7xl">
//             {settings?.companyName}
//           </h1>

//           <h2 className="mt-4 text-xl font-bold leading-snug text-orange-400 sm:text-2xl md:text-3xl">
//             Traditional Pakistani Truck Art & Auto Decoration
//           </h2>

//           <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 sm:text-lg md:mt-6 md:leading-8">
//             Premium handcrafted truck art, stainless steel accessories,
//             LED lights, mirrors, stickers and custom vehicle decoration.
//             We deliver high-quality products with professional workmanship.
//           </p>

//           <div className="mt-8 flex flex-col gap-4 sm:flex-row">
//             <Link href="/products">
//               <Button
//                 size="lg"
//                 className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto"
//               >
//                 View Products
//               </Button>
//             </Link>

//             <a
//               href={`https://wa.me/${settings?.whatsapp}`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="w-full border-white bg-transparent text-white hover:bg-white hover:text-black sm:w-auto"
//               >
//                 Contact Us
//               </Button>
//             </a>
//           </div>

//           {/* Stats */}
//           <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-6 sm:grid-cols-4 md:mt-14 md:gap-8 md:pt-8">
//             <div>
//               <h3 className="text-2xl md:text-3xl font-bold text-orange-400">500+</h3>
//               <p className="text-sm text-gray-300">Happy Customers</p>
//             </div>

//             <div>
//               <h3 className="text-2xl md:text-3xl font-bold text-orange-400">100+</h3>
//               <p className="text-sm text-gray-300">Products</p>
//             </div>

//             <div>
//               <h3 className="text-2xl md:text-3xl font-bold text-orange-400">10+</h3>
//               <p className="text-sm text-gray-300">Years Experience</p>
//             </div>

//             <div>
//               <h3 className="text-2xl md:text-3xl font-bold text-orange-400">100%</h3>
//               <p className="text-sm text-gray-300">Quality Products</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Star, Truck } from "lucide-react";

export default async function Hero() {
  const settings = await prisma.settings.findFirst();

  return (
    <section className="relative overflow-hidden bg-black md:min-h-screen">

      {/* Background */}

      <img
        src="/yousuf1.png"
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-orange-950/40" />

      {/* Decorative Blur */}

      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-600/20 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-20">
        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[2px] text-orange-400 backdrop-blur-xl sm:px-5 sm:text-sm">

            <BadgeCheck size={18} />

            Premium Auto Decoration

          </span>

          {/* <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl"> */}
          <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {settings?.companyName}

          </h1>

          {/* <h2 className="mt-6 text-2xl font-bold leading-snug text-orange-400 md:text-4xl"> */}
          <h2 className="mt-5 text-xl font-bold leading-snug text-orange-400 sm:text-2xl md:text-3xl lg:text-4xl">
            Traditional Pakistani Truck Art &
            Premium Vehicle Decoration

          </h2>

          {/* <p className="mt-8 max-w-xl text-base leading-7 text-gray-300 sm:text-lg md:mt-6 md:leading-8"> */}
          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:text-base md:text-lg md:leading-8">

            We specialize in handcrafted truck art,
            stainless steel accessories,
            LED lighting,
            mirrors,
            stickers
            and premium vehicle decoration solutions
            across Pakistan.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link href="/products">

              <Button
                size="lg"
                className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-7 text-lg shadow-xl shadow-orange-500/30 transition hover:scale-105"
              >
                Explore Collection
              </Button>

            </Link>

            <a
              href={`https://wa.me/${settings?.whatsapp}`}
              target="_blank"
            >

              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white bg-white/5 px-10 py-7 text-lg text-white backdrop-blur-xl hover:bg-white hover:text-black"
              >
                WhatsApp Us
              </Button>

            </a>

          </div>

          {/* Rating */}

          <div className="mt-10 flex items-center gap-4">

            <div className="flex">

              {Array.from({ length: 5 }).map((_, i) => (

                <Star
                  key={i}
                  className="h-5 w-5 fill-orange-500 text-orange-500"
                />

              ))}

            </div>

            <p className="font-semibold text-gray-300">

              Trusted by 500+ Customers

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <img
            src="/yousuf.jpg"
            className="rounded-[35px] border border-white/10 shadow-2xl"
            alt="Truck Decoration"
          />

          {/* Floating Card 1 */}

          <div className="
    absolute
    left-20
    top-18
    z-20
    w-[calc(100%-24px)]
    max-w-[260px]
    rounded-2xl
    border
    border-white/10
    bg-black/50
    p-4
    shadow-xl
    backdrop-blur-xl

    sm:left 5
    sm:top-16
    sm:w-auto
    sm:p-5

    lg:-left-22
    lg:top 20
    lg:max-w-none
    lg:rounded-3xl
  "
          >

            <BadgeCheck className="mb-3 text-orange-500" />

            <h3 className="font-bold text-white">

              Premium Quality

            </h3>

            <p className="text-sm text-gray-300">

              High-grade decoration products.

            </p>

          </div>

          {/* Floating Card 2 */}

          <div className="absolute -right-8 bottom-3 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

            <Truck className="mb-3 text-orange-500" />

            <h3 className="font-bold text-white">

              Pakistan Delivery

            </h3>

            <p className="text-sm text-gray-300">

              Fast nationwide shipping.

            </p>

          </div>

        </div>

      </div>
      {/* Bottom Statistics */}

      <div className="mx-auto mt-10 max-w-7xl px-6 pb-16">

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:bg-orange-500/10">

            <h2 className="text-4xl font-black text-orange-500">
              500+
            </h2>

            <p className="mt-2 text-sm uppercase tracking-widest text-gray-300">
              Happy Customers
            </p>

          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:bg-orange-500/10">

            <h2 className="text-4xl font-black text-orange-500">
              100+
            </h2>

            <p className="mt-2 text-sm uppercase tracking-widest text-gray-300">
              Premium Products
            </p>

          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:bg-orange-500/10">

            <h2 className="text-4xl font-black text-orange-500">
              10+
            </h2>

            <p className="mt-2 text-sm uppercase tracking-widest text-gray-300">
              Years Experience
            </p>

          </div>

          <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-orange-500 hover:bg-orange-500/10">

            <h2 className="text-4xl font-black text-orange-500">
              100%
            </h2>

            <p className="mt-2 text-sm uppercase tracking-widest text-gray-300">
              Quality Guarantee
            </p>

          </div>

        </div>

      </div>

      {/* Scroll Down */}

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce lg:flex">

        <div className="flex h-14 w-8 justify-center rounded-full border border-white/30">

          <div className="mt-2 h-3 w-1 rounded-full bg-orange-500"></div>

        </div>

      </div>

      {/* Bottom Gradient */}

      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />

    </section>
  );
}