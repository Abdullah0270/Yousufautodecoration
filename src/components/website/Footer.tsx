import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default async function Footer() {
  const settings = await prisma.settings.findFirst();

  const companyName =
    settings?.companyName || "Decoration Shop";

  return (
    <footer className="relative overflow-hidden bg-black text-white">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[140px]" />


      {/* ================= MAIN FOOTER ================= */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


          {/* ================= COMPANY ================= */}

          <div className="lg:col-span-2">

            <Link
              href="/"
              className="inline-block text-2xl font-black tracking-wide text-white transition hover:text-orange-500 sm:text-3xl"
            >
              {companyName}
            </Link>


            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />


            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">

              Premium Pakistani truck art and auto decoration products
              crafted with quality, creativity and professional
              workmanship. We help transform ordinary vehicles into
              unique and extraordinary creations.

            </p>


            {/* WhatsApp */}

            <a
              href={`https://wa.me/${settings?.whatsapp || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
            >

              <MessageCircle size={20} />

              Chat With Us

              <ArrowUpRight size={18} />

            </a>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-orange-500" />


            <nav className="mt-6 flex flex-col gap-4">

              <Link
                href="/"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-orange-500"
              >
                Home
                <ArrowUpRight
                  size={15}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              <Link
                href="/products"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-orange-500"
              >
                Products
                <ArrowUpRight
                  size={15}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-orange-500"
              >
                About Us
                <ArrowUpRight
                  size={15}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-orange-500"
              >
                Contact Us
                <ArrowUpRight
                  size={15}
                  className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

            </nav>

          </div>


          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="text-lg font-bold text-white">
              Contact Us
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-orange-500" />


            <div className="mt-6 space-y-5">


              {/* Phone */}

              {settings?.phone && (

                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-orange-500"
                >

                  <Phone
                    size={20}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />

                  <span>
                    {settings.phone}
                  </span>

                </a>

              )}


              {/* WhatsApp */}

              {settings?.whatsapp && (

                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-orange-500"
                >

                  <MessageCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />

                  <span>
                    WhatsApp
                  </span>

                </a>

              )}


              {/* Address */}

              {settings?.address && (

                <div className="flex items-start gap-3 text-sm leading-6 text-gray-400">

                  <MapPin
                    size={20}
                    className="mt-0.5 shrink-0 text-orange-500"
                  />

                  <span>
                    {settings.address}
                  </span>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* ================= SOCIAL MEDIA ================= */}

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-gray-500">
            Follow us on social media
          </p>

          <div className="flex items-center gap-3">

            {/* Facebook */}

            {settings?.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>
            )}

            {/* Instagram */}

            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
            )}

          </div>

        </div>
      </div>


      {/* ================= COPYRIGHT ================= */}

      <div className="relative border-t border-white/10 bg-white/[0.02]">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">
              YAD,
            </span>
             AR Software Solutions. All Rights Reserved.
          </p>

          <p>
            Premium Auto Decoration & Truck Art
          </p>

        </div>

      </div>

    </footer>
  );
}