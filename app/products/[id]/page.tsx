import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import ProductImageGallery from "@/components/website/ProductImageGallery"; 

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  // =========================
  // GET PRODUCT ID
  // =========================

  const { id } = await params;

  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }


  // =========================
  // GET PRODUCT
  // =========================

  const product =
    await prisma.product.findUnique({

      where: {
        id: productId,
      },

      include: {
        category: true,
        images: true,
      },

    });


  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    notFound();
  }


  // =========================
  // WHATSAPP MESSAGE
  // =========================

  const whatsappMessage = `Hello!

I am interested in the following product:

Product: ${product.name}
Price: Rs. ${Number(
    product.price
  ).toLocaleString()}

Product Image:
${product.image}

I would like to know more details about this product and its availability.

Thank you!`;


  // =========================
  // WHATSAPP URL
  // =========================

  const whatsappUrl =
    `https://wa.me/923107419127?text=` +
    encodeURIComponent(
      whatsappMessage
    );


  return (

    <>

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar />


      {/* =========================
          MAIN
      ========================= */}

      <main className="min-h-screen bg-slate-50 py-10">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


          {/* =========================
              BACK BUTTON
          ========================= */}

          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
          >
            <span className="text-lg">
              ←
            </span>

            Back to Products
          </Link>


          {/* =========================
              PRODUCT CARD
          ========================= */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

            <div className="grid lg:grid-cols-2">


              {/* =========================
                  LEFT SIDE
                  IMAGE GALLERY
              ========================= */}

              <ProductImageGallery
                mainImage={
                  product.image
                }
                productName={
                  product.name
                }
                images={
                  product.images
                }
              />


              {/* =========================
                  RIGHT SIDE
                  PRODUCT DETAILS
              ========================= */}

              <div className="flex flex-col p-6 sm:p-10 lg:p-12">


                {/* =========================
                    CATEGORY
                ========================= */}

                <div className="mb-5">

                  <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-orange-600">
                    {product.category.name}
                  </span>

                </div>


                {/* =========================
                    PRODUCT NAME
                ========================= */}

                <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  {product.name}
                </h1>


                {/* =========================
                    PRICE
                ========================= */}

                <div className="mt-6">

                  <p className="text-sm font-semibold text-slate-500">
                    Starting Price
                  </p>

                  <p className="mt-1 text-4xl font-black text-orange-500">
                    Rs.{" "}
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </p>

                </div>


                {/* =========================
                    DIVIDER
                ========================= */}

                <div className="my-8 h-px bg-slate-200" />


                {/* =========================
                    DESCRIPTION
                ========================= */}

                <div>

                  <h2 className="mb-3 text-xl font-extrabold text-slate-900">
                    Product Description
                  </h2>

                  <p className="whitespace-pre-line leading-7 text-slate-600">
                    {
                      product.description
                    }
                  </p>

                </div>


                {/* =========================
                    PRODUCT VIDEO
                ========================= */}

                {product.video && (

                  <div className="mt-8">

                    <h2 className="mb-4 text-xl font-extrabold text-slate-900">
                      Product Video
                    </h2>

                    <div className="overflow-hidden rounded-2xl bg-black shadow-lg">

                      <video
                        src={
                          product.video
                        }
                        controls
                        className="max-h-[500px] w-full"
                      />

                    </div>

                  </div>

                )}


                {/* =========================
                    WHATSAPP CONTACT
                ========================= */}

                <a
                  href={
                    whatsappUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
                >

                  {/* WhatsApp Icon */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >

                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />

                    <path d="M12.004 2C6.48 2 2 6.477 2 12c0 1.766.46 3.425 1.265 4.89L2 22l5.255-1.238A9.96 9.96 0 0 0 12.004 22C17.523 22 22 17.523 22 12S17.523 2 12.004 2zm0 18c-1.578 0-3.113-.416-4.453-1.205l-.319-.188-3.119.735.742-3.043-.208-.33A7.96 7.96 0 0 1 4.004 12c0-4.411 3.589-8 8-8 4.412 0 8 3.589 8 8s-3.588 8-8 8z" />

                  </svg>


                  Contact Us About This Product

                </a>


                {/* =========================
                    WHATSAPP NOTE
                ========================= */}

                <p className="mt-3 text-center text-xs text-slate-400">
                  Click to discuss this product directly on WhatsApp.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </>

  );
}