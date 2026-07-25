"use client";

import { updateCategory } from "@/actions/category";

export default function EditCategoryForm({
  category,
}: any) {
  return (
    <form
      action={updateCategory}
      className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <input
        type="hidden"
        name="id"
        value={category.id}
      />

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Edit Category
        </h1>

        <p className="mt-2 text-slate-500">
          Update your category information.
        </p>
      </div>

      <div className="space-y-6">

        {/* Category Name */}

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Category Name
          </label>

          <input
            name="name"
            defaultValue={category.name}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Slug */}

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Slug
          </label>

          <input
            name="slug"
            defaultValue={category.slug}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            defaultValue={category.description ?? ""}
            rows={5}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Update Button */}

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-indigo-700"
        >
          Update Category
        </button>

      </div>
    </form>
  );
}