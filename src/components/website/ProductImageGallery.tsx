"use client";

import { useState } from "react";

interface GalleryImage {
  id: number;
  imageUrl: string;
}

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
  images: GalleryImage[];
}

export default function ProductImageGallery({
  mainImage,
  productName,
  images,
}: ProductImageGalleryProps) {
  // Main image shown initially
  const [activeImage, setActiveImage] =
    useState(mainImage);

  // Combine main image + additional gallery images
  const allImages = [
    {
      id: "main",
      imageUrl: mainImage,
    },
    ...images.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
    })),
  ];

  // Find current image index
  const activeIndex = allImages.findIndex(
    (item) => item.imageUrl === activeImage
  );

  return (
    <div className="bg-slate-100 p-6 sm:p-10">

      {/* =========================
          MAIN IMAGE
      ========================= */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <img
          src={activeImage}
          alt={productName}
          className="h-[400px] w-full object-cover transition-all duration-500 sm:h-[550px]"
        />

        {/* Image Counter */}

        {allImages.length > 0 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            {activeIndex + 1} / {allImages.length}
          </div>
        )}

      </div>


      {/* =========================
          PRODUCT GALLERY
      ========================= */}

      {images.length > 0 && (

        <div className="mt-6">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Product Gallery
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Hover over an image to preview
              </p>
            </div>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm">
              {images.length} Photos
            </span>

          </div>


          {/* Gallery Grid */}

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">

            {/* Main Image Thumbnail */}

            <button
              type="button"
              onMouseEnter={() =>
                setActiveImage(mainImage)
              }
              onFocus={() =>
                setActiveImage(mainImage)
              }
              className={`
                group relative overflow-hidden rounded-xl
                border-2 bg-white shadow-sm
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                ${
                  activeImage === mainImage
                    ? "border-orange-500 ring-4 ring-orange-100"
                    : "border-slate-200"
                }
              `}
            >

              <img
                src={mainImage}
                alt={`${productName} main image`}
                className="h-28 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Main Label */}

              <div className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                Main
              </div>

            </button>


            {/* Additional Images */}

            {images.map((item, index) => {

              const isActive =
                activeImage === item.imageUrl;

              return (

                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() =>
                    setActiveImage(
                      item.imageUrl
                    )
                  }
                  onFocus={() =>
                    setActiveImage(
                      item.imageUrl
                    )
                  }
                  className={`
                    group relative overflow-hidden rounded-xl
                    border-2 bg-white shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg
                    ${
                      isActive
                        ? "border-orange-500 ring-4 ring-orange-100"
                        : "border-slate-200"
                    }
                  `}
                >

                  <img
                    src={item.imageUrl}
                    alt={`${productName} gallery image ${
                      index + 1
                    }`}
                    className="h-28 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Active Indicator */}

                  {isActive && (

                    <div className="absolute inset-0 flex items-center justify-center bg-orange-500/10">

                      <div className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg">
                        Viewing
                      </div>

                    </div>

                  )}

                </button>

              );
            })}

          </div>

        </div>

      )}

    </div>
  );
}