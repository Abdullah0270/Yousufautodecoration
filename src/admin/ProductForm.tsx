// "use client";

// import { useState } from "react";
// import { createProduct } from "@/actions/product";

// export default function ProductForm({
//   categories,
// }: {
//   categories: {
//     id: number;
//     name: string;
//   }[];
// }) {
//   const [image, setImage] = useState("");
//   const [additionalImages, setAdditionalImages] = useState<string[]>([]);
//   const [video, setVideo] = useState("");

//   const [uploadingMain, setUploadingMain] = useState(false);
//   const [uploadingImages, setUploadingImages] = useState(false);
//   const [uploadingVideo, setUploadingVideo] = useState(false);

//   // =========================
//   // Upload Main Image
//   // =========================

//   async function uploadMainImage(file: File) {
//     try {
//       setUploadingMain(true);

//       const data = new FormData();
//       data.append("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: data,
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.error || "Upload failed");
//       }

//       setImage(result.url);
//     } catch (error) {
//       console.error(error);

//       alert(
//         error instanceof Error
//           ? error.message
//           : "Image upload failed"
//       );
//     } finally {
//       setUploadingMain(false);
//     }
//   }

//   // =========================
//   // Upload Multiple Images
//   // =========================

//   async function uploadAdditionalImages(files: FileList) {
//     try {
//       setUploadingImages(true);

//       const uploadedUrls: string[] = [];

//       for (const file of Array.from(files)) {
//         const data = new FormData();

//         data.append("file", file);

//         const res = await fetch("/api/upload", {
//           method: "POST",
//           body: data,
//         });

//         const result = await res.json();

//         if (!res.ok) {
//           throw new Error(
//             result.error || "Image upload failed"
//           );
//         }

//         uploadedUrls.push(result.url);
//       }

//       setAdditionalImages((prev) => [
//         ...prev,
//         ...uploadedUrls,
//       ]);
//     } catch (error) {
//       console.error(error);

//       alert(
//         error instanceof Error
//           ? error.message
//           : "Additional images upload failed"
//       );
//     } finally {
//       setUploadingImages(false);
//     }
//   }

//   // =========================
//   // Upload Video
//   // =========================

//   async function uploadVideo(file: File) {
//     try {
//       setUploadingVideo(true);

//       const data = new FormData();

//       data.append("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: data,
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           result.error || "Video upload failed"
//         );
//       }

//       setVideo(result.url);
//     } catch (error) {
//       console.error(error);

//       alert(
//         error instanceof Error
//           ? error.message
//           : "Video upload failed"
//       );
//     } finally {
//       setUploadingVideo(false);
//     }
//   }

//   // =========================
//   // Remove Additional Image
//   // =========================

//   function removeImage(index: number) {
//     setAdditionalImages((prev) =>
//       prev.filter((_, i) => i !== index)
//     );
//   }

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

//       {/* Header */}

//       <div className="mb-8">
//         <h2 className="text-3xl font-extrabold text-slate-900">
//           Add Product
//         </h2>

//         <p className="mt-2 text-slate-500">
//           Create a new product with images and video.
//         </p>
//       </div>

//       <form
//         action={createProduct}
//         className="space-y-8"
//       >

//         {/* =========================
//             BASIC INFORMATION
//         ========================= */}

//         <div className="grid gap-6 md:grid-cols-2">

//           {/* Product Name */}

//           <div>
//             <label className="mb-2 block font-bold text-slate-700">
//               Product Name
//             </label>

//             <input
//               name="name"
//               required
//               placeholder="Enter product name"
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
//             />
//           </div>

//           {/* Price */}

//           <div>
//             <label className="mb-2 block font-bold text-slate-700">
//               Price
//             </label>

//             <input
//               name="price"
//               type="number"
//               step="0.01"
//               required
//               placeholder="0.00"
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
//             />
//           </div>

//           {/* Category */}

//           <div>
//             <label className="mb-2 block font-bold text-slate-700">
//               Category
//             </label>

//             <select
//               name="categoryId"
//               required
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
//             >
//               {categories.map((category) => (
//                 <option
//                   key={category.id}
//                   value={category.id}
//                 >
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//         </div>

//         {/* Description */}

//         <div>
//           <label className="mb-2 block font-bold text-slate-700">
//             Description
//           </label>

//           <textarea
//             name="description"
//             rows={5}
//             required
//             placeholder="Enter product description..."
//             className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
//           />
//         </div>

//         {/* =========================
//             MAIN IMAGE
//         ========================= */}

//         <div>

//           <h3 className="mb-4 text-xl font-bold text-slate-900">
//             Main Product Image
//           </h3>

//           <div className="grid gap-6 lg:grid-cols-2">

//             {/* Preview */}

//             <div className="flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">

//               {image ? (
//                 <img
//                   src={image}
//                   alt="Product Preview"
//                   className="h-72 w-full rounded-xl object-cover"
//                 />
//               ) : (
//                 <span className="text-slate-400">
//                   No main image selected
//                 </span>
//               )}

//             </div>

//             {/* Upload */}

//             <div>

//               <label className="mb-3 block font-bold text-slate-700">
//                 Upload Main Image
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 disabled={uploadingMain}
//                 onChange={(e) => {
//                   const file =
//                     e.target.files?.[0];

//                   if (file) {
//                     uploadMainImage(file);
//                   }
//                 }}
//                 className="block w-full rounded-xl border border-dashed border-slate-300 p-3"
//               />

//               {uploadingMain && (
//                 <p className="mt-3 font-semibold text-indigo-600">
//                   Uploading main image...
//                 </p>
//               )}

//               <input
//                 type="hidden"
//                 name="image"
//                 value={image}
//               />

//             </div>

//           </div>

//         </div>

//         {/* =========================
//             ADDITIONAL IMAGES
//         ========================= */}

//         <div>

//           <h3 className="mb-4 text-xl font-bold text-slate-900">
//             Product Gallery
//           </h3>

//           <p className="mb-4 text-sm text-slate-500">
//             You can select multiple images at once.
//           </p>

//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             disabled={uploadingImages}
//             onChange={(e) => {
//               if (e.target.files) {
//                 uploadAdditionalImages(
//                   e.target.files
//                 );
//               }
//             }}
//             className="block w-full rounded-xl border border-dashed border-slate-300 p-3"
//           />

//           {uploadingImages && (
//             <p className="mt-3 font-semibold text-indigo-600">
//               Uploading gallery images...
//             </p>
//           )}

//           {/* Gallery Preview */}

//           {additionalImages.length > 0 && (

//             <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">

//               {additionalImages.map(
//                 (url, index) => (

//                   <div
//                     key={url}
//                     className="group relative overflow-hidden rounded-xl border"
//                   >

//                     <img
//                       src={url}
//                       alt={`Gallery ${index + 1}`}
//                       className="h-32 w-full object-cover"
//                     />

//                     <button
//                       type="button"
//                       onClick={() =>
//                         removeImage(index)
//                       }
//                       className="absolute right-2 top-2 rounded-lg bg-red-600 px-2 py-1 text-xs font-bold text-white"
//                     >
//                       Remove
//                     </button>

//                     {/* Hidden input */}

//                     <input
//                       type="hidden"
//                       name="additionalImages"
//                       value={url}
//                     />

//                   </div>

//                 )
//               )}

//             </div>

//           )}

//         </div>

//         {/* =========================
//             PRODUCT VIDEO
//         ========================= */}

//         <div>

//           <h3 className="mb-4 text-xl font-bold text-slate-900">
//             Product Video
//           </h3>

//           <p className="mb-4 text-sm text-slate-500">
//             Optional. Maximum video size is 100 MB.
//           </p>

//           <input
//             type="file"
//             accept="video/*"
//             disabled={uploadingVideo}
//             onChange={(e) => {
//               const file =
//                 e.target.files?.[0];

//               if (file) {
//                 uploadVideo(file);
//               }
//             }}
//             className="block w-full rounded-xl border border-dashed border-slate-300 p-3"
//           />

//           {uploadingVideo && (
//             <p className="mt-3 font-semibold text-indigo-600">
//               Uploading video...
//             </p>
//           )}

//           {video && (
//             <div className="mt-6 overflow-hidden rounded-xl border bg-black">

//               <video
//                 src={video}
//                 controls
//                 className="max-h-96 w-full"
//               />

//             </div>
//           )}

//           <input
//             type="hidden"
//             name="video"
//             value={video}
//           />

//         </div>

//         {/* =========================
//             SUBMIT
//         ========================= */}

//         <div className="border-t pt-6">

//           <button
//             type="submit"
//             disabled={
//               uploadingMain ||
//               uploadingImages ||
//               uploadingVideo ||
//               !image
//             }
//             className="rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//           >
//             {uploadingMain ||
//             uploadingImages ||
//             uploadingVideo
//               ? "Uploading Files..."
//               : "Save Product"}
//           </button>

//           {!image && (
//             <p className="mt-3 text-sm text-red-500">
//               Please upload a main product image before saving.
//             </p>
//           )}

//         </div>

//       </form>

//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { createProduct } from "@/actions/product";
import {
  ImagePlus,
  Images,
  Video,
  Upload,
  X,
  CheckCircle2,
  PackagePlus,
  Sparkles,
} from "lucide-react";

export default function ProductForm({
  categories,
}: {
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const [image, setImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [video, setVideo] = useState("");

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // =========================
  // Upload Main Image
  // =========================

  async function uploadMainImage(file: File) {
    try {
      setUploadingMain(true);

      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setImage(result.url);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );
    } finally {
      setUploadingMain(false);
    }
  }

  // =========================
  // Upload Multiple Images
  // =========================

  async function uploadAdditionalImages(files: FileList) {
    try {
      setUploadingImages(true);

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        const data = new FormData();
        data.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(
            result.error || "Image upload failed"
          );
        }

        uploadedUrls.push(result.url);
      }

      setAdditionalImages((prev) => [
        ...prev,
        ...uploadedUrls,
      ]);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Additional images upload failed"
      );
    } finally {
      setUploadingImages(false);
    }
  }

  // =========================
  // Upload Video
  // =========================

  async function uploadVideo(file: File) {
    try {
      setUploadingVideo(true);

      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Video upload failed"
        );
      }

      setVideo(result.url);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Video upload failed"
      );
    } finally {
      setUploadingVideo(false);
    }
  }

  // =========================
  // Remove Gallery Image
  // =========================

  function removeImage(index: number) {
    setAdditionalImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  const isUploading =
    uploadingMain ||
    uploadingImages ||
    uploadingVideo;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

      {/* =================================
          PREMIUM HEADER
      ================================= */}

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-8 py-10 text-white">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <PackagePlus size={30} />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-indigo-300"
              />

              <span className="text-xs font-bold uppercase tracking-[3px] text-indigo-300">
                Product Management
              </span>

            </div>

            <h2 className="text-3xl font-black tracking-tight">
              Add New Product
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Create a premium product showcase with images and video.
            </p>
          </div>

        </div>

      </div>

      {/* =================================
          FORM
      ================================= */}

      <form
        action={createProduct}
        className="space-y-8 p-6 md:p-8 lg:p-10"
      >

        {/* =================================
            BASIC INFORMATION
        ================================= */}

        <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-black text-indigo-600">
              01
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Basic Information
              </h3>

              <p className="text-sm text-slate-500">
                Enter the essential details of your product.
              </p>
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Product Name */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Product Name
              </label>

              <input
                name="name"
                required
                placeholder="e.g. Premium Leather Seat Cover"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Price
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  Rs.
                </span>

                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>
            </div>

            {/* Category */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Product Category
              </label>

              <select
                name="categoryId"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((category) => (
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

          {/* Description */}

          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Product Description
            </label>

            <textarea
              name="description"
              rows={5}
              required
              placeholder="Write a detailed description of your product..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

          </div>

        </section>

        {/* =================================
            MAIN IMAGE
        ================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 font-black text-purple-600">
                02
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Main Product Image
                </h3>

                <p className="text-sm text-slate-500">
                  This image will be displayed as the primary product image.
                </p>
              </div>

            </div>

            {image && (
              <CheckCircle2
                className="text-emerald-500"
                size={24}
              />
            )}

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Preview */}

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">

              {image ? (

                <img
                  src={image}
                  alt="Product Preview"
                  className="h-80 w-full object-cover"
                />

              ) : (

                <div className="flex h-80 flex-col items-center justify-center text-center">

                  <ImagePlus
                    size={48}
                    className="mb-4 text-slate-600"
                  />

                  <p className="font-bold text-slate-400">
                    No Main Image
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Upload an image to see preview
                  </p>

                </div>

              )}

            </div>

            {/* Upload */}

            <div className="flex flex-col justify-center">

              <div className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-8 text-center transition hover:border-indigo-400">

                <Upload
                  size={36}
                  className="mx-auto mb-4 text-indigo-500"
                />

                <h4 className="font-bold text-slate-800">
                  Upload Main Image
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  PNG, JPG, JPEG or WEBP
                </p>

                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingMain}
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0];

                    if (file) {
                      uploadMainImage(file);
                    }

                  }}
                  className="mt-6 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-sm"
                />

                {uploadingMain && (

                  <p className="mt-4 text-sm font-bold text-indigo-600">
                    Uploading image...
                  </p>

                )}

              </div>

            </div>

          </div>

          <input
            type="hidden"
            name="image"
            value={image}
          />

        </section>

        {/* =================================
            GALLERY
        ================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 font-black text-emerald-600">
              03
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Product Gallery
              </h3>

              <p className="text-sm text-slate-500">
                Add multiple images to create a complete product showcase.
              </p>
            </div>

          </div>

          <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-8 text-center">

            <Images
              size={40}
              className="mx-auto mb-4 text-emerald-500"
            />

            <h4 className="font-bold text-slate-800">
              Upload Multiple Images
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Select multiple product images at once.
            </p>

            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploadingImages}
              onChange={(e) => {

                if (e.target.files) {
                  uploadAdditionalImages(
                    e.target.files
                  );
                }

              }}
              className="mx-auto mt-6 block w-full max-w-md cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-sm"
            />

            {uploadingImages && (

              <p className="mt-4 font-bold text-emerald-600">
                Uploading gallery images...
              </p>

            )}

          </div>

          {/* Gallery Preview */}

          {additionalImages.length > 0 && (

            <div className="mt-8">

              <div className="mb-4 flex items-center justify-between">

                <h4 className="font-bold text-slate-800">
                  Selected Images
                </h4>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  {additionalImages.length} Images
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                {additionalImages.map(
                  (url, index) => (

                    <div
                      key={url}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >

                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>

                      <input
                        type="hidden"
                        name="additionalImages"
                        value={url}
                      />

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </section>

        {/* =================================
            VIDEO
        ================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 font-black text-rose-600">
              04
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Product Video
              </h3>

              <p className="text-sm text-slate-500">
                Add a promotional or demonstration video.
              </p>
            </div>

          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Video Preview */}

            <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-xl">

              {video ? (

                <video
                  src={video}
                  controls
                  className="h-80 w-full object-contain"
                />

              ) : (

                <div className="flex h-80 flex-col items-center justify-center">

                  <Video
                    size={50}
                    className="mb-4 text-slate-600"
                  />

                  <p className="font-bold text-slate-400">
                    No Video Uploaded
                  </p>

                </div>

              )}

            </div>

            {/* Upload */}

            <div className="flex flex-col justify-center">

              <div className="rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/40 p-8 text-center">

                <Video
                  size={40}
                  className="mx-auto mb-4 text-rose-500"
                />

                <h4 className="font-bold text-slate-800">
                  Upload Product Video
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  MP4, MOV or other supported video formats.
                </p>

                <input
                  type="file"
                  accept="video/*"
                  disabled={uploadingVideo}
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0];

                    if (file) {
                      uploadVideo(file);
                    }

                  }}
                  className="mt-6 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-sm"
                />

                {uploadingVideo && (

                  <p className="mt-4 font-bold text-rose-600">
                    Uploading video...
                  </p>

                )}

              </div>

            </div>

          </div>

          <input
            type="hidden"
            name="video"
            value={video}
          />

        </section>

        {/* =================================
            SAVE
        ================================= */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">

          <div>

            {!image ? (

              <p className="text-sm font-semibold text-rose-500">
                Please upload a main product image.
              </p>

            ) : (

              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <CheckCircle2 size={18} />
                Product is ready to publish
              </p>

            )}

          </div>

          <button
            type="submit"
            disabled={isUploading || !image}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-4 font-extrabold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >

            <PackagePlus size={20} />

            {isUploading
              ? "Uploading Files..."
              : "Save Product"}

          </button>

        </div>

      </form>

    </div>
  );
}