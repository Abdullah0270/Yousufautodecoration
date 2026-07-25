"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { logoutAction } from "./logout/actions";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* =========================
          MOBILE TOP BAR
      ========================= */}

      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:hidden">

        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            YOUSUF AUTO
          </h2>

          <p className="text-xs font-medium text-orange-500">
            Admin Panel
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-slate-900 p-2.5 text-white transition hover:bg-orange-500"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

      </div>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          bg-slate-950 text-white shadow-2xl
          transition-transform duration-300
          md:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =========================
            LOGO
        ========================= */}

        <div className="border-b border-white/10 p-6">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h2 className="text-lg font-extrabold tracking-wide">
                  YOUSUF AUTO
                </h2>

                <p className="text-xs font-medium uppercase tracking-widest text-orange-400">
                  Decoration
                </p>
              </div>

            </div>

            {/* Mobile Close */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Management
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-200">
              Admin Dashboard
            </p>

          </div>

        </div>

        {/* =========================
            MENU
        ========================= */}

        <nav className="flex-1 overflow-y-auto p-4">

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <div className="space-y-2">

            {menu.map((item) => {

              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    group flex items-center gap-3 rounded-xl px-4 py-3.5
                    font-semibold transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >

                  <Icon
                    size={20}
                    className={
                      active
                        ? "text-white"
                        : "text-slate-500 transition group-hover:text-orange-400"
                    }
                  />

                  <span>{item.title}</span>

                </Link>
              );

            })}

          </div>

        </nav>

        {/* =========================
            BOTTOM ACTIONS
        ========================= */}

        <div className="space-y-3 border-t border-white/10 p-4">

          {/* View Website */}

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-300 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white"
          >
            <Globe size={18} />
            View Website
          </Link>

          {/* Logout */}

          <form action={logoutAction}>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>

          </form>

          <p className="pt-2 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} Yousuf Auto Decoration
          </p>

        </div>

      </aside>
    </>
  );
}