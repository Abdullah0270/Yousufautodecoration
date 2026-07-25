"use client";

import { createCategory } from "@/actions/category";

export default function CategoryForm() {
  return (
    <form
      action={createCategory}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Add Category
        </h2>

        <p className="mt-2 text-slate-500">
          Create a new category for your products.
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
            placeholder="Enter category name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          />
        </div>

        {/* Slug */}

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Slug
          </label>

          <input
            name="slug"
            placeholder="e.g. home-decor"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          />
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            rows={5}
            placeholder="Write a short description..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-5 py-4 text-lg font-bold text-white transition hover:bg-indigo-700"
        >
          Save Category
        </button>

      </div>
    </form>
  );
}