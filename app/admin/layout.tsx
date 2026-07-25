// "use client";

// import { usePathname } from "next/navigation";
// import Sidebar from "../admin/sidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   const isAuthPage =
//     pathname === "/admin/login" ||
//     pathname === "/admin/register";

//   if (isAuthPage) {
//     return (
//       <main className="min-h-screen bg-slate-100">
//         {children}
//       </main>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100">
//       <Sidebar />

//       <main className="min-h-screen min-w-0 p-4 pt-20 md:ml-72 md:p-8 md:pt-8">
//         {children}
//       </main>
//     </div>
//   );
// }
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/register";

  if (isAuthPage) {
    return (
      <main className="min-h-screen bg-slate-100">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="min-h-screen min-w-0 p-4 pt-20 md:ml-72 md:p-8 md:pt-8">
        {children}
      </main>
    </div>
  );
}