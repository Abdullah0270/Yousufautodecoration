import Footer from "@/components/website/Footer";
import Navbar from "@/components/website/Navbar";
import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
} from "lucide-react";

export default async function ContactPage() {
  const settings = await prisma.settings.findFirst();

  return (
  <>
  <Navbar />
    <main className="min-h-screen bg-slate-950">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden px-6 py-24 pt-32 md:py-32 md:pt-40">

        {/* Background Glow */}

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl text-center">

          <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-xl">
            Get In Touch
          </span>

          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl md:text-7xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Have a question about our products or need a custom
            vehicle decoration solution? Get in touch with our team.
          </p>

        </div>

      </section>


      {/* ================= CONTACT SECTION ================= */}

      <section className="relative px-6 pb-24">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">

          {/* ================= CONTACT INFO ================= */}

          <div className="space-y-6">

            <div>
              <h2 className="text-3xl font-bold text-white">
                Let's Talk
              </h2>

              <p className="mt-3 leading-7 text-gray-400">
                We are here to help you with premium truck art,
                auto decoration and custom vehicle accessories.
              </p>
            </div>


            {/* Phone */}

            <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/40">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10">
                <Phone className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Call Us
                </p>

                <p className="mt-1 font-semibold text-white">
                  {settings?.phone || "Not Available"}
                </p>
              </div>

            </div>


            {/* WhatsApp */}

            <a
              href={`https://wa.me/${settings?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/40"
            >

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10">
                <MessageCircle className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  WhatsApp
                </p>

                <p className="mt-1 font-semibold text-white">
                  Chat With Us
                </p>
              </div>

            </a>


            {/* Address */}

            <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/40">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10">
                <MapPin className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Our Location
                </p>

                <p className="mt-1 font-semibold text-white">
                  {settings?.address || "Pakistan"}
                </p>
              </div>

            </div>


            {/* Working Hours */}

            <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-orange-500/40">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10">
                <Clock className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Working Hours
                </p>

                <p className="mt-1 font-semibold text-white">
                  Mon - Sat: 9:00 AM - 8:00 PM
                </p>
              </div>

            </div>

          </div>


          {/* ================= CONTACT FORM ================= */}

          <div className="lg:col-span-2">

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10">

              <div className="mb-8">

                <h2 className="text-3xl font-bold text-white">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-gray-400">
                  Fill out the form below and we'll get back to you.
                </p>

              </div>


              <form className="space-y-6">

                {/* Name + Phone */}

                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>


                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="03XX XXXXXXX"
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                </div>


                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />

                </div>


                {/* Subject */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help you?"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />

                </div>


                {/* Message */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Write your message here..."
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none placeholder:text-gray-500 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition hover:scale-[1.02] hover:shadow-orange-500/40"
                >

                  <Send size={20} />

                  Send Message

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}

      <section className="px-6 pb-24">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-orange-500/20 bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-center shadow-2xl shadow-orange-500/20 md:p-14">

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Need Help With Your Vehicle Decoration?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-orange-50">
            Contact our team today and let's create something
            unique for your vehicle.
          </p>

          <a
            href={`https://wa.me/${settings?.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-black px-8 py-4 font-bold text-white transition hover:scale-105"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>

        </div>

      </section>

    </main>
    
      <Footer />
    </>
  );
}