import { prisma } from "@/lib/prisma";
import AdminAuth from "../admin/AdminAuth";
import AboutSlider from "@/components/website/AboutSlider";
import {
  BadgeCheck,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";

const images = ["/about.png", "/about2.png"];

export default async function AboutPage() {
  const settings = await prisma.settings.findFirst();

  return (
    <>
      <Navbar />
      <AdminAuth>
        <main className="min-h-screen overflow-hidden bg-slate-950">

          {/* ===================================================== */}
          {/* HERO SECTION */}
          {/* ===================================================== */}

          <section className="relative flex min-h-[80vh] items-center overflow-hidden">

            {/* Background */}

            <img
              src="/hero.jfif"
              alt="Premium Auto Decoration"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />

            {/* Orange Glow */}

            <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[140px]" />

            <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[140px]" />


            {/* Content */}

            <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 md:py-32">

              <div className="max-w-4xl">

                {/* Badge */}

                <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-orange-400 backdrop-blur-xl sm:px-5 sm:text-sm sm:tracking-[3px]">

                  <BadgeCheck size={18} />

                  About Our Company

                </span>


                {/* Heading */}

                <h1 className="mt-7 text-4xl font-black leading-tight text-white sm:text-5xl md:text-7xl">

                  {settings?.companyName || "Premium Auto Decoration"}

                </h1>


                <h2 className="mt-5 max-w-3xl text-xl font-bold leading-snug text-orange-400 sm:text-2xl md:text-4xl">

                  Crafting Unique Vehicles With
                  Traditional Pakistani Art

                </h2>


                <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base md:text-lg md:leading-8">

                  We specialize in premium Pakistani truck art,
                  handcrafted vehicle decoration, stainless steel accessories,
                  LED lighting and custom auto styling solutions.

                </p>


                {/* Buttons */}

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                  <Link href="/products">

                    <Button
                      size="lg"
                      className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-base font-bold shadow-xl shadow-orange-500/20 transition hover:scale-105 sm:w-auto"
                    >

                      Explore Products

                      <ArrowRight className="ml-2 h-5 w-5" />

                    </Button>

                  </Link>


                  <Link href="/contact">

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full rounded-xl border-white/30 bg-white/5 px-8 py-6 text-base font-bold text-white backdrop-blur-xl hover:bg-white hover:text-black sm:w-auto"
                    >

                      Contact Us

                    </Button>

                  </Link>

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================== */}
          {/* COMPANY INTRODUCTION */}
          {/* ===================================================== */}

          <section className="relative bg-slate-950 px-5 py-24 sm:px-6 md:py-32">

            <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-orange-500/5 blur-[120px]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">


              {/* Image */}
              <AboutSlider />
              {/* Content */}

              <div>

                <span className="text-sm font-bold uppercase tracking-[3px] text-orange-500">
                  Who We Are
                </span>


                <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">

                  Turning Ordinary Vehicles
                  Into Extraordinary Creations

                </h2>


                <p className="mt-6 text-base leading-8 text-gray-400">

                  {settings?.companyName || "Our Company"} is dedicated to
                  providing high-quality vehicle decoration products that
                  combine traditional Pakistani truck art with modern
                  automotive styling.

                </p>


                <p className="mt-5 text-base leading-8 text-gray-400">

                  From handcrafted accessories and stainless steel work to
                  LED lights, mirrors and custom decoration, we focus on
                  delivering products that look exceptional and are built
                  to last.

                </p>


                {/* Features */}

                <div className="mt-8 grid gap-4 sm:grid-cols-2">

                  {[
                    "High Quality Products",
                    "Professional Workmanship",
                    "Durable Materials",
                    "Customer Satisfaction",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />

                      <span className="font-medium text-gray-300">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================== */}
          {/* WHY CHOOSE US */}
          {/* ===================================================== */}

          <section className="relative bg-black px-5 py-24 sm:px-6 md:py-32">

            <div className="mx-auto max-w-7xl">

              {/* Heading */}

              <div className="mx-auto max-w-3xl text-center">

                <span className="text-sm font-bold uppercase tracking-[3px] text-orange-500">
                  Why Choose Us
                </span>

                <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl md:text-5xl">

                  Built On Quality,
                  Craftsmanship & Trust

                </h2>

                <p className="mt-5 text-gray-400">

                  We combine skilled craftsmanship, premium materials
                  and customer-focused service to deliver decoration
                  solutions you can rely on.

                </p>

              </div>


              {/* Cards */}

              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


                {/* Card 1 */}

                <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-orange-500/5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition group-hover:bg-orange-500">

                    <Wrench className="text-orange-500 group-hover:text-white" />

                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    Expert Craftsmanship
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    Skilled professionals with years of experience
                    in vehicle decoration and customization.
                  </p>

                </div>


                {/* Card 2 */}

                <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-orange-500/5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition group-hover:bg-orange-500">

                    <ShieldCheck className="text-orange-500 group-hover:text-white" />

                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    Premium Quality
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    We use quality materials designed for durability,
                    performance and long-lasting beauty.
                  </p>

                </div>


                {/* Card 3 */}

                <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-orange-500/5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition group-hover:bg-orange-500">

                    <Truck className="text-orange-500 group-hover:text-white" />

                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    Nationwide Delivery
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    Get your favorite decoration products delivered
                    safely across Pakistan.
                  </p>

                </div>


                {/* Card 4 */}

                <div className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-orange-500/5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition group-hover:bg-orange-500">

                    <Sparkles className="text-orange-500 group-hover:text-white" />

                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    Customer First
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    Your satisfaction is our priority from product
                    selection to after-sales support.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================== */}
          {/* STATISTICS */}
          {/* ===================================================== */}

          <section className="relative overflow-hidden border-y border-white/10 bg-slate-950 px-5 py-20 sm:px-6">

            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">

              {[
                { value: "500+", label: "Happy Customers" },
                { value: "100+", label: "Products" },
                { value: "10+", label: "Years Experience" },
                { value: "100%", label: "Quality Focus" },
              ].map((stat) => (

                <div
                  key={stat.label}
                  className="text-center"
                >

                  <h2 className="text-4xl font-black text-orange-500 sm:text-5xl">
                    {stat.value}
                  </h2>

                  <p className="mt-3 text-sm font-medium text-gray-400 sm:text-base">
                    {stat.label}
                  </p>

                </div>

              ))}

            </div>

          </section>


          {/* ===================================================== */}
          {/* CTA */}
          {/* ===================================================== */}

          <section className="relative overflow-hidden px-5 py-24 sm:px-6 md:py-32">

            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700" />

            <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-4xl text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">

                <Sparkles className="text-white" size={30} />

              </div>


              <h2 className="mt-7 text-3xl font-black text-white sm:text-4xl md:text-5xl">

                Ready To Transform
                Your Vehicle?

              </h2>


              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg">

                Explore our premium collection of auto decoration
                products or contact us to discuss your custom requirements.

              </p>


              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

                <Link href="/products">

                  <Button
                    size="lg"
                    className="w-full rounded-xl bg-white px-8 py-6 font-bold text-black hover:bg-gray-100 sm:w-auto"
                  >

                    View Products

                    <ArrowRight className="ml-2" />

                  </Button>

                </Link>


                <a
                  href={`https://wa.me/${settings?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <Button
                    size="lg"
                    className="w-full rounded-xl border border-white/30 bg-black/20 px-8 py-6 font-bold text-white hover:bg-black sm:w-auto"
                  >

                    <MessageCircle className="mr-2" />

                    WhatsApp Us

                  </Button>

                </a>

              </div>

            </div>

          </section>

        </main>
      </AdminAuth>
      <Footer />
    </>
  );


}