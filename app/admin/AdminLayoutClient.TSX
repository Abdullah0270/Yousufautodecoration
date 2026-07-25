"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/register";

  // Login/Register pages
  if (isAuthPage) {
    return (
      <main className="min-h-screen bg-slate-100">
        {children}
      </main>
    );
  }

  // Protected admin pages
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-h-screen min-w-0 p-4 pt-20 md:ml-72 md:p-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}