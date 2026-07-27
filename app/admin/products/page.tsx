import { getProducts } from "@/actions/product";
import { getCategories } from "@/actions/category";
import ProductForm from "@/admin/ProductForm";
import DeleteProductButton from "@/admin/DeleteProductButton";
import Link from "next/link";
import AdminAuth from "../AdminAuth";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
  }>;
}) {
  const { success } = await searchParams;

  const products = await getProducts();
  const categories = await getCategories();

  return (
    <AdminAuth>
      <div className="space-y-8">

        {/* =========================
            SUCCESS MESSAGES
        ========================= */}

        {success === "created" && (
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white shadow">
              ✓
            </div>

            <div>
              <h3 className="font-bold text-emerald-800">
                Product Added Successfully
              </h3>

              <p className="mt-1 text-sm text-emerald-600">
                Your new product has been added to the store.
              </p>
            </div>
          </div>
        )}

        {success === "updated" && (
          <div className="flex items-center gap-4 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white shadow">
              ✓
            </div>

            <div>
              <h3 className="font-bold text-blue-800">
                Product Updated Successfully
              </h3>

              <p className="mt-1 text-sm text-blue-600">
                Your product information has been updated successfully.
              </p>
            </div>
          </div>
        )}

        {success === "deleted" && (
          <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-xl font-bold text-white shadow">
              ✓
            </div>

            <div>
              <h3 className="font-bold text-red-800">
                Product Deleted Successfully
              </h3>

              <p className="mt-1 text-sm text-red-600">
                The product has been permanently removed from your store.
              </p>
            </div>
          </div>
        )}

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">
              Products
            </h1>

            <p className="mt-2 text-slate-500">
              Manage all your store products.
            </p>
          </div>

          <div className="rounded-xl bg-indigo-600 px-6 py-3 text-center text-white shadow-lg">
            <p className="text-sm font-semibold">
              Total Products
            </p>

            <p className="text-3xl font-extrabold">
              {products.length}
            </p>
          </div>

        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="grid gap-8 xl:grid-cols-1">

          {/* Product Form */}

          <div>
            <ProductForm categories={categories} />
          </div>

          {/* Product Table */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

            <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-5">

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Product List
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your products, pricing and status.
                </p>
              </div>

              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
                {products.length} Products
              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="px-5 py-4 text-left font-bold text-slate-700">
                      Image
                    </th>

                    <th className="px-5 py-4 text-left font-bold text-slate-700">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left font-bold text-slate-700">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left font-bold text-slate-700">
                      Price
                    </th>

                    <th className="px-5 py-4 text-center font-bold text-slate-700">
                      Featured
                    </th>

                    <th className="px-5 py-4 text-center font-bold text-slate-700">
                      Status
                    </th>

                    <th className="px-5 py-4 text-center font-bold text-slate-700">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {products.length === 0 ? (

                    <tr>

                      <td
                        colSpan={7}
                        className="py-14 text-center"
                      >

                        <div className="flex flex-col items-center">

                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                            📦
                          </div>

                          <h3 className="text-lg font-bold text-slate-700">
                            No Products Available
                          </h3>

                          <p className="mt-1 text-slate-500">
                            Add your first product using the form.
                          </p>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    products.map((product) => (

                      <tr
                        key={product.id}
                        className="border-t transition hover:bg-slate-50"
                      >

                        {/* Image */}

                        <td className="px-5 py-4">

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 rounded-xl border border-slate-200 object-cover shadow-sm"
                          />

                        </td>

                        {/* Name */}

                        <td className="px-5 py-4">

                          <div className="font-bold text-slate-800">
                            {product.name}
                          </div>

                          <div className="mt-1 text-xs text-slate-400">
                            Product #{product.id}
                          </div>

                        </td>

                        {/* Category */}

                        <td className="px-5 py-4 font-medium text-slate-600">
                          {product.category.name}
                        </td>

                        {/* Price */}

                        <td className="px-5 py-4 font-bold text-indigo-700">
                          Rs.{" "}
                          {Number(product.price).toLocaleString()}
                        </td>

                        {/* Featured */}

                        <td className="px-5 py-4 text-center">

                          {product.featured ? (

                            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                              ⭐ Featured
                            </span>

                          ) : (

                            <span className="text-slate-400">
                              —
                            </span>

                          )}

                        </td>

                        {/* Status */}

                        <td className="px-5 py-4 text-center">

                          {product.active ? (

                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              Active
                            </span>

                          ) : (

                            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                              Inactive
                            </span>

                          )}

                        </td>

                        {/* Actions */}

                        <td className="px-5 py-4">

                          <div className="flex justify-center gap-2">

                            <Link
                              href={`/admin/products/${product.id}`}
                              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                              Edit
                            </Link>

                            <DeleteProductButton
                              id={product.id}
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
