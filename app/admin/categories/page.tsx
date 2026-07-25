import Link from "next/link";

import { getCategories } from "@/actions/category";

import CategoryForm from "@/admin/CategoryForm";
import DeleteCategoryButton from "@/admin/DeleteCategoryButton";
import AdminAuth from "../AdminAuth";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <AdminAuth>
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Categories
          </h1>

          <p className="mt-2 text-slate-500">
            Organize your products using categories.
          </p>
        </div>

        <div className="rounded-xl bg-indigo-600 px-6 py-3 text-center text-white shadow">
          <p className="text-sm font-semibold">
            Total Categories
          </p>

          <p className="text-3xl font-extrabold">
            {categories.length}
          </p>
        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        {/* Category Form */}

        <div>
          <CategoryForm />
        </div>

        {/* Category Table */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

          <div className="border-b bg-slate-50 px-6 py-5">
            <h2 className="text-2xl font-bold text-slate-800">
              Category List
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="px-5 py-4 text-left font-bold text-slate-700">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left font-bold text-slate-700">
                    Slug
                  </th>

                  <th className="px-5 py-4 text-center font-bold text-slate-700">
                    Products
                  </th>

                  <th className="px-5 py-4 text-center font-bold text-slate-700">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {categories.length === 0 ? (

                  <tr>

                    <td
                      colSpan={4}
                      className="py-14 text-center text-lg text-slate-500"
                    >
                      No Categories Found.
                    </td>

                  </tr>

                ) : (

                  categories.map((category) => (

                    <tr
                      key={category.id}
                      className="border-t transition hover:bg-slate-50"
                    >

                      {/* Category */}

                      <td className="px-5 py-4">

                        <div className="font-bold text-slate-800">
                          {category.name}
                        </div>

                        <div className="text-xs text-slate-400">
                          #{category.id}
                        </div>

                      </td>

                      {/* Slug */}

                      <td className="px-5 py-4 font-medium text-slate-600">
                        {category.slug}
                      </td>

                      {/* Product Count */}

                      <td className="px-5 py-4 text-center">

                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
                          {category._count.products}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <Link
                            href={`/admin/categories/${category.id}`}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                          >
                            Edit
                          </Link>

                          <DeleteCategoryButton
                            id={category.id}
                          />

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
    </AdminAuth>
  );
}