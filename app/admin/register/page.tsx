"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAdmin } from "@/actions/auth";
import AdminAuth from "../AdminAuth";

const initialState = {
  error: "",
};

export default function AdminRegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAdmin,
    initialState
  );

  return (
    <AdminAuth>
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-2xl font-black text-white shadow-lg shadow-orange-500/30">
              D
            </div>

            <h1 className="text-3xl font-extrabold text-white">
              Create Admin Account
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Set up your admin account
            </p>

          </div>

          {/* Error */}

          {state?.error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">

            {/* Name */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50"
              />

            </div>

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50"
              />

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                minLength={6}
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50"
              />

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Creating Account..."
                : "Create Admin Account"}
            </button>

          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">

            <p className="text-sm text-slate-400">
              Already have an admin account?
            </p>

            <Link
              href="/admin/login"
              className="mt-2 inline-block font-semibold text-orange-400 hover:text-orange-300"
            >
              Login to Dashboard
            </Link>

          </div>

          <div className="mt-6 text-center">

            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-white"
            >
              ← Back to Website
            </Link>

          </div>

        </div>

      </div>

    </main>
    </AdminAuth>
  );
}