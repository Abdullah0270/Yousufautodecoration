"use client";

import { useState } from "react";
import { updateProduct } from "@/actions/product";

export default function EditProductForm({
  product,
  categories,
}: any) {
  // =========================
  // MAIN IMAGE
  // =========================

  const [image, setImage] = useState(product.image || "");

  // =========================
  // VIDEO
  // =========================

  const [video, setVideo] = useState(product.video || "");

  // =========================
  // EXISTING GALLERY IMAGES
  // =========================

  const [additionalImages, setAdditionalImages] =
    useState<
      {
        id: number;
        imageUrl: string;
      }[]
    >(
      product.images?.map((item: any) => ({
        id: item.id,
        imageUrl: item.imageUrl,
      })) || []
    );

  // =========================
  // NEW GALLERY IMAGES
  // =========================

  const [newImages, setNewImages] = useState<string[]>([]);

  // =========================
  // UPLOAD STATES
  // =========================

  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingAdditional, setUploadingAdditional] =
    useState(false);

  // =========================
  // UPLOAD FILE
  // =========================

  async function uploadFile(
    file: File,
    type: "image" | "video" | "additional"
  ) {
    try {
      if (type === "image") setUploading(true);
      if (type === "video") setUploadingVideo(true);
      if (type === "additional") setUploadingAdditional(true);

      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const result = await res.json();

      if (type === "image") {
        setImage(result.url);
      }

      if (type === "video") {
        setVideo(result.url);
      }

      if (type === "additional") {
        setNewImages((prev) => [
          ...prev,
          result.url,
        ]);
      }
    } catch (error) {
      console.error(error);
      alert("File upload failed");
    } finally {
      setUploading(false);
      setUploadingVideo(false);
      setUploadingAdditional(false);
    }
  }

  // =========================
  // REMOVE EXISTING IMAGE
  // =========================

  function removeExistingImage(id: number) {
    setAdditionalImages((prev) =>
      prev.filter((image) => image.id !== id)
    );
  }

  // =========================
  // REMOVE NEW IMAGE
  // =========================

  function removeNewImage(index: number) {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  const isUploading =
    uploading ||
    uploadingVideo ||
    uploadingAdditional;

  return (
    <div className="min-h-screen bg-slate-50/80 pb-20">

      {/* =====================================
          PREMIUM HEADER
      ====================================== */}

      <div className="mb-10">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Product Management
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Edit Product
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Manage your product information, images,
              gallery and promotional video from one place.
            </p>
          </div>

          {/* Product ID Badge */}

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-600">
              #
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Product ID
              </p>

              <p className="font-bold text-slate-800">
                {product.id}
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          FORM
      ====================================== */}

      <form
        action={updateProduct}
        className="space-y-7"
      >

        <input
          type="hidden"
          name="id"
          value={product.id}
        />


        {/* =====================================
            BASIC INFORMATION
        ====================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                ✦
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the essential details of your product.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6 sm:p-8">

            <div className="grid gap-6 md:grid-cols-2">

              {/* NAME */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Product Name
                </label>

                <input
                  name="name"
                  defaultValue={product.name}
                  required
                  placeholder="Enter product name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>


              {/* PRICE */}

              <div>

                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price
                </label>

                <div className="relative">

                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    Rs.
                  </span>

                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={Number(product.price)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-4 pl-14 pr-5 text-sm font-bold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

              </div>


              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </label>

                <select
                  name="categoryId"
                  defaultValue={product.categoryId}
                  className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                >

                  {categories.map((category: any) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="mt-6">

              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Description
              </label>

              <textarea
                name="description"
                defaultValue={product.description}
                rows={6}
                required
                placeholder="Write a detailed product description..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />

            </div>

          </div>

        </section>


        {/* =====================================
            MAIN IMAGE
        ====================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl">
                🖼️
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Main Product Image
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  This image is used as the primary product thumbnail.
                </p>
              </div>

            </div>

          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">

            {/* PREVIEW */}

            <div>

              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Preview
              </p>

              <div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">

                {image ? (

                  <>
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                      Current Main Image
                    </div>
                  </>

                ) : (

                  <div className="text-center">
                    <div className="text-4xl">🖼️</div>

                    <p className="mt-2 text-sm font-semibold text-slate-400">
                      No image selected
                    </p>
                  </div>

                )}

              </div>

            </div>


            {/* UPLOAD */}

            <div className="flex flex-col justify-center">

              <label className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Replace Main Image
              </label>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-12 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm transition group-hover:scale-110">
                  ⬆️
                </div>

                <p className="text-sm font-bold text-slate-700">
                  Choose a new image
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or WEBP
                </p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0];

                    if (file) {
                      uploadFile(
                        file,
                        "image"
                      );
                    }

                  }}
                />

              </label>

              {uploading && (

                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-indigo-50 px-5 py-4 text-sm font-bold text-indigo-600">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />

                  Uploading main image...

                </div>

              )}

              <input
                type="hidden"
                name="image"
                value={image}
              />

            </div>

          </div>

        </section>


        {/* =====================================
            PRODUCT GALLERY
        ====================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-xl">
                  ✨
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Product Gallery
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage additional product images.
                  </p>
                </div>

              </div>

              <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 sm:block">
                {additionalImages.length + newImages.length} Images
              </div>

            </div>

          </div>

          <div className="p-6 sm:p-8">

            {/* EXISTING */}

            {additionalImages.length > 0 && (

              <div className="mb-8">

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="text-sm font-black text-slate-800">
                    Existing Images
                  </h3>

                  <span className="text-xs font-semibold text-slate-400">
                    {additionalImages.length} saved
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

                  {additionalImages.map((item) => (

                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >

                      <img
                        src={item.imageUrl}
                        alt="Product gallery"
                        className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">

                        <button
                          type="button"
                          onClick={() =>
                            removeExistingImage(
                              item.id
                            )
                          }
                          className="w-full rounded-xl bg-white/95 px-3 py-2 text-xs font-black text-red-600 shadow-lg transition hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>

                      </div>

                      <input
                        type="hidden"
                        name="existingImageIds"
                        value={item.id}
                      />

                    </div>

                  ))}

                </div>

              </div>

            )}


            {/* NEW IMAGES */}

            {newImages.length > 0 && (

              <div className="mb-8">

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="text-sm font-black text-indigo-700">
                    New Images
                  </h3>

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                    Not saved yet
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

                  {newImages.map((url, index) => (

                    <div
                      key={`${url}-${index}`}
                      className="group relative overflow-hidden rounded-2xl border-2 border-indigo-200 bg-indigo-50"
                    >

                      <img
                        src={url}
                        alt="New product image"
                        className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">

                        <button
                          type="button"
                          onClick={() =>
                            removeNewImage(index)
                          }
                          className="w-full rounded-xl bg-white/95 px-3 py-2 text-xs font-black text-red-600 shadow-lg transition hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>

                      </div>

                      <input
                        type="hidden"
                        name="additionalImages"
                        value={url}
                      />

                    </div>

                  ))}

                </div>

              </div>

            )}


            {/* UPLOAD */}

            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/30">

              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm transition group-hover:scale-110">
                📸
              </div>

              <p className="text-sm font-bold text-slate-700">
                Add more gallery images
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Select multiple images at once
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {

                  const files =
                    Array.from(
                      e.target.files || []
                    );

                  files.forEach((file) =>
                    uploadFile(
                      file,
                      "additional"
                    )
                  );

                  e.currentTarget.value = "";

                }}
              />

            </label>

            {uploadingAdditional && (

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-indigo-50 px-5 py-4 text-sm font-bold text-indigo-600">

                <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />

                Uploading gallery images...

              </div>

            )}

          </div>

        </section>


        {/* =====================================
            PRODUCT VIDEO
        ====================================== */}

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl">
                🎬
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Product Video
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Keep your current video or upload a replacement.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6 sm:p-8">

            {video ? (

              <div className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-inner">

                <video
                  src={video}
                  controls
                  className="mx-auto max-h-[500px] w-full"
                />

              </div>

            ) : (

              <div className="mb-7 flex h-52 items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50">

                <div className="text-center">

                  <div className="text-4xl">
                    🎥
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-500">
                    No product video uploaded
                  </p>

                </div>

              </div>

            )}

            <input
              type="hidden"
              name="video"
              value={video}
            />

            <label className="group flex cursor-pointer items-center gap-5 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-5 transition hover:border-indigo-400 hover:bg-indigo-50/30">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🎞️
              </div>

              <div className="flex-1">

                <p className="text-sm font-bold text-slate-700">
                  Replace Product Video
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Select a new video file to replace the current one.
                </p>

              </div>

              <span className="hidden rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white sm:block">
                Choose Video
              </span>

              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (file) {
                    uploadFile(
                      file,
                      "video"
                    );
                  }

                }}
              />

            </label>

            {uploadingVideo && (

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-indigo-50 px-5 py-4 text-sm font-bold text-indigo-600">

                <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-600" />

                Uploading product video...

              </div>

            )}

          </div>

        </section>


        {/* =====================================
            PRODUCT SETTINGS
        ====================================== */}

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-8">

          <div className="mb-6">

            <h2 className="text-lg font-black text-slate-900">
              Product Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Control how this product appears in your store.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {/* FEATURED */}

            <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-amber-300 hover:bg-amber-50/40">

              <input
                type="checkbox"
                name="featured"
                defaultChecked={product.featured}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <div>

                <p className="font-bold text-slate-800">
                  Featured Product
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Highlight this product on your store.
                </p>

              </div>

            </label>


            {/* ACTIVE */}

            <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/40">

              <input
                type="checkbox"
                name="active"
                defaultChecked={product.active}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />

              <div>

                <p className="font-bold text-slate-800">
                  Active Product
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Make this product visible to customers.
                </p>

              </div>

            </label>

          </div>

        </section>


        {/* =====================================
            ACTION BAR
        ====================================== */}

        <div className="sticky bottom-5 z-20">

          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:flex-row sm:items-center sm:p-5">

            <div className="hidden sm:block">

              <p className="text-sm font-black text-slate-800">
                Ready to save changes?
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your product information will be updated.
              </p>

            </div>

            <div className="flex gap-3">

              <a
                href="/admin/products"
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-600 transition hover:bg-slate-50 sm:flex-none"
              >
                Cancel
              </a>

              <button
                type="submit"
                disabled={isUploading}
                className="flex-1 rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-600/20 disabled:cursor-not-allowed disabled:bg-slate-400 sm:flex-none"
              >
                {isUploading
                  ? "Uploading..."
                  : "Save Changes →"}
              </button>

            </div>

          </div>

        </div>

      </form>

    </div>
  );
}