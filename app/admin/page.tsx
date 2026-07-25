import Link from "next/link";
import AdminAuth from "./AdminAuth";
import { prisma } from "@/lib/prisma";
import {
  Package,
  FolderTree,
  Star,
  EyeOff,
  ArrowRight,
  Plus,
} from "lucide-react";

export default async function DashboardPage() {
  const totalCategories = await prisma.category.count();

  const totalProducts = await prisma.product.count();

  const featuredProducts = await prisma.product.count({
    where: { featured: true },
  });

  const inactiveProducts = await prisma.product.count({
    where: { active: false },
  });

  const recentProducts = await prisma.product.findMany({
    take: 5,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const stats = [
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderTree,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      title: "Featured",
      value: featuredProducts,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
    {
      title: "Inactive",
      value: inactiveProducts,
      icon: EyeOff,
      color: "text-rose-600",
      bg: "bg-rose-100",
    },
  ];

  return (
    <AdminAuth>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-extrabold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-base font-medium text-slate-600">
              Welcome back! Manage your decoration shop from here.
            </p>

          </div>

          <Link
            href="/admin/products"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            New Product
          </Link>

        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      {item.title}
                    </p>

                    <h2 className={`mt-3 text-5xl font-extrabold ${item.color}`}>
                      {item.value}
                    </h2>

                  </div>

                  <div className={`rounded-xl p-4 ${item.bg}`}>
                    <Icon
                      size={30}
                      className={item.color}
                    />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom */}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Recent Products */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between border-b bg-slate-50 p-6">

              <h2 className="text-2xl font-bold text-slate-900">
                Recent Products
              </h2>

              <Link
                href="/admin/products"
                className="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View All
                <ArrowRight size={18} />
              </Link>

            </div>

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-4 text-left text-sm font-bold uppercase text-slate-700">
                    Image
                  </th>

                  <th className="p-4 text-left text-sm font-bold uppercase text-slate-700">
                    Product
                  </th>

                  <th className="p-4 text-left text-sm font-bold uppercase text-slate-700">
                    Category
                  </th>

                  <th className="p-4 text-left text-sm font-bold uppercase text-slate-700">
                    Price
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-lg border object-cover"
                      />

                    </td>

                    <td className="p-4 font-bold text-slate-900">
                      {product.name}
                    </td>

                    <td className="p-4 font-medium text-slate-600">
                      {product.category.name}
                    </td>

                    <td className="p-4 font-bold text-emerald-600">
                      Rs. {Number(product.price).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Quick Actions */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <Link
                href="/admin/products"
                className="block rounded-xl bg-indigo-600 px-5 py-4 text-center font-bold text-white transition hover:bg-indigo-700"
              >
                + Add Product
              </Link>

              <Link
                href="/admin/categories"
                className="block rounded-xl bg-emerald-600 px-5 py-4 text-center font-bold text-white transition hover:bg-emerald-700"
              >
                + Add Category
              </Link>

              <Link
                href="/admin/settings"
                className="block rounded-xl bg-slate-900 px-5 py-4 text-center font-bold text-white transition hover:bg-black"
              >
                Website Settings
              </Link>

              <Link
                href="/"
                className="block rounded-xl border-2 border-slate-300 px-5 py-4 text-center font-bold text-slate-700 transition hover:bg-slate-100"
              >
                View Website
              </Link>

            </div>

          </div>

        </div>

      </div>
    </AdminAuth>

  );
}